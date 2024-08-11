import mongoose from "mongoose";
import courseSchema from "./schema.js";

const model = mongoose.model("Course", courseSchema);

export default model;