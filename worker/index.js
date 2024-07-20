const Redis = require('redis');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '../.env' });

const publisher = Redis.createClient();
const Worker = Redis.createClient();

console.log(process.env.API_KEY);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function publishtoPubSub(ans) {
    try {
        const { userid, prompt } = ans;
        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            await publisher.publish(`Userid:${userid}`, chunkText);
        }
    } catch (err) {
        console.log("Failed to publish due to -->", err);
    }
}

async function startRedis() {
    try {
        await Worker.connect();
        await publisher.connect();

        console.log("Successfully initiated Worker");
        console.log("Successfully initiated publisher");

        while (true) {
            try {
                const response = await Worker.brPop('messages', 0);
                const ans = JSON.parse(response.element);
                await publishtoPubSub(ans);
            } catch (err) {
                console.log("Operation failed due to -->", err);
            }
        }
    } catch (err) {
        console.log("Failed to connect worker to Redis", err);
    }
}

startRedis();
