import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";

dotenv.config();
const app = express()
const port = process.env.port || 4000;


//middleware.

app.use(express.json());

connectToDB();

//api Todo
//read 
app.get("/get", async(req,res)=>{
    try {
        const result = await Todo.find();
        res.send({
            success: true,
            message: "Todo lists retrived Sucessfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        
        res.send({
            success: false,
            message: "failed to retrived todo list",
            data: result
        })
    }
})


//create
app.post("/post", async(req,res) =>{
    const todoDetails = req.body;

    try {
        const result = await Todo.create(todoDetails)
        res.send({
            success: true,
            message:"Todo is created successfully",
            data: result,
        })

    } catch (error) {
        console.log(error);
        
        res.send({
            success: false,
            message:"Todo is not created successfully",
            data: result,
        })
    }
})



//update
app.patch("/update/:todoId", async(req,res) =>{
    const todoId = req.params.todoId
    const updateTodo = req.body

    try {
        const result = await Todo.findByIdAndUpdate(todoId, updateTodo ,{
            new: true,
        });
        res.send({
            success: true,
            message:"Todo is updated successfully",
            data: result,
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message:"Todo is not updated",
            data: result,
        })
    }
})


//delete

app.delete("/delete/:todoId", async(req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.todoId);
        res.send({
            success: true,
            message:"Todo is deleted",
            data: null,
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message:"Todo is not deleted",
            data: null,
        })
        
    }

})


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
    
})




// {
//   "name": "pms",
//   "version": "1.0.0",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "dev": "nodemon index.js"
//   },
//   "author": "",
//   "license": "ISC",
//   "description": "",
//   "dependencies": {
//     "cors": "^2.8.5",
//     "express": "^4.21.2",
//     "mongoose": "^8.10.1",
//     "nodemon": "^3.1.9"
//   }
// }