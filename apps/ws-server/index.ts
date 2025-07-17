import { client } from "db/client";
Bun.serve({
    port : 8081,
    fetch(req,server){
        // upgrade the request to a websocket
        if(server.upgrade(req)){
            return; // do not return a response
        }
        return new Response("Upgrade Failed",{ status : 500 })
    },
    websocket: {
        async message(ws,message){
            await client.user.create({
                data : {
                    username : Math.random().toString(),
                    password : Math.random().toString()
                }
            })
        }
    }
})