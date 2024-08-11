import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
    },
    description: String,
    module: {
        type: String,
        ref: "Module",
    }
}, {
    _id: false
});

const moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    course: {
        type: String,
        ref: "Course",
        required: true,
    },
    lessons: [lessonSchema]
}, {
    collection: "modules"
});

export default moduleSchema;