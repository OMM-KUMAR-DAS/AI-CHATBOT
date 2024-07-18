const { WebSocketServer } = require('ws');

const express = require('express');

const Redis = require('redis');

const app = express();

const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

const client = Redis.createClient();

wss.on('connection', async function connection(ws) {

    const subscriber = Redis.createClient();

    let currentUserid = null;

   

    ws.on('error', console.error);

    ws.on('message', async function message(data) {

        const messageObject = JSON.parse(data);

        const { userid, prompt } = messageObject;

        console.log(userid);

        console.log(prompt);

        currentUserid = userid;

        await client.lPush('messages', JSON.stringify({ userid, prompt }));

        if (currentUserid && !subscriber.isOpen) {

            await subscriber.connect();

            subscriber.subscribe(`Userid:${currentUserid}`, (message) => {

                    ws.send(message);

                
            });
        }


    });
   
    ws.send("Hello guys ")

   
});

async function startRedis() {
    try {
        await client.connect();

        console.log("Successfully connected to Redis");

    } catch (err) {

        console.log("Failed to connect to Redis due to -->", err);
    }
}

startRedis();
