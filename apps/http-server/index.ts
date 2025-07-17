import { client } from "db/client";
import express from "express";

const app = express();
app.use(express.json());

app.get("/",async(req,res) => {
    try{
        const users = await client.user.findMany();
        res.json({
            message : "Successfully fetched all users",
            users
        })
    }
    catch(err : any){
        res.json({
            message : "Error fetching users",
            error   : err.message
        })
    }
})

app.post("/",async(req, res) => {
    const { username, password } = req.body;

    try{
        const newUser = await client.user.create({
            data : {
                username,
                password
            }
        })
        res.json({
            message : "Successfully created new user",
            newUser
        })
    }
    catch(err : any){
        res.json({
            message : "Error creating new user",
            error   : err.message
        })
    }
})



app.listen(8080,() =>{
    console.log("Http server is listening on port 8080");
    
})