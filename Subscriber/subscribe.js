const Redis = require('redis');

const subscriber = Redis.createClient();

async function connectSubscriber() {
    



    try {
        await subscriber.connect();


        console.log("Successfully connected Subscriber to Redis");

        subscriber.subscribe(`userid:@john123`, (answer) => {
            console.log(answer);
        });

    } catch (err) {


        console.log("Unable to connect Subscriber to Redis due to -->", err);
    }
}

connectSubscriber();
