import model from "./model.js";

export const createCourse = (courseData) => {
    return model.create(courseData);
};

export const findAllCourses = () => {
    return model.find();
};

export const findCourseById = (courseId) => {
    return model.findById({
        number: courseId
    });
};

export const updateCourse = (courseId, courseData) => {
    return model.findByIdAndUpdate(courseId, courseData, {
        new: true,
        runValidators: true
    });
};

export const deleteCourse = (courseId) => {
    return model.deleteOne({
        number: courseId
    });
};