const Redis = require('redis');

const { GoogleGenerativeAI } = require("@google/generative-ai");


require('dotenv').config({ path: '../.env' });



const client = Redis.createClient();


const publisher = Redis.createClient();


console.log(process.env.API_KEY);



const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const userId = '@john123';

async function publishtoPubSub(response) {
    
    try {
        const result = await model.generateContentStream(response.element);

        for await (const chunk of result.stream) {


            const chunkText = chunk.text();

           

            await publisher.publish(`userid:${userId}`, chunkText);
        }

    }catch (err) {


        console.log("Failed to publish due to -->", err);
    }
}

async function startRedis() {

    try {

        await client.connect();

        await publisher.connect();

        console.log("Successfully connected Worker to Redis");

        while (true) {

            try {


                const response = await client.brPop(`userid:${userId}`, 0);

                 publishtoPubSub(response);

            } catch (err) {


                console.log("Failed to pop prompt from queue", err);


            }
        }

    } catch (err) {


        console.log("Failed to connect worker to Redis", err);

    }
}

startRedis();
