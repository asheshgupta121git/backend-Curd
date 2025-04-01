import mongoose, { model, Schema } from "mongoose";

const todoSchema = new Schema({
    text: {type: String, require: true},
    priority: {type: String, require: true},
    deadline: {type: String, require: true}
})

export const Todo = mongoose.models.Todo || new model("Todo", todoSchema);