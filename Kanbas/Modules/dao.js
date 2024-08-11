import model from "./model.js";

export const createModule = (module) => model.create(module);

export const findAllModules = () => model.find().populate("course");

export const findModulesByCourseNumber = (courseNumber) => model.find({
    course: courseNumber
});

export const findModuleById = (moduleId) => model.findById(moduleId).populate("lessons");

export const updateModule = (moduleId, module) => model.updateOne({
    _id: moduleId
}, {
    $set: module
});

export const deleteModule = (moduleId) => model.deleteOne({
    _id: moduleId
});

export const findModulesByTitle = (title) => {
    const regex = new RegExp(title, "i");
    return model.find({
        title: {
            $regex: regex
        }
    });
};