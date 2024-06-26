const express= require('express')

const app= new express();

const bodyParser = require('body-parser')

app.use(bodyParser.json())


const Redis= require('redis')

const client= Redis.createClient()



app.post('/getresponse',async(req,res)=>{


    try{

        const{userId,prompt}= req.body;



        await client.lPush(`userid:${userId}`,prompt)



        res.json({
            success:true,
            message:'Prompt pushed to queue'
        })

       

        

    }catch(err)
    { 

        res.json({

            success:false,
            error:err,
            message:'Failed to Pushed to Redis-Queue'

        })

    }
})



async function startServer()
{
    try{
        
        await client.connect()

        console.log("Successfully connected to Redis")

        app.listen(3000,()=>{

            console.log("Successfully connected to port no-->",3000)

        })

    }catch(err)
    {
          console.log("Failed to connect to express server due to-->",err)
    } 
}


startServer()