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

export const updateCourse = (courseNumber, courseData) => {
    return model.findOneAndUpdate({ number: courseNumber }, courseData, {
        new: true,
        runValidators: true
    });
};


export const deleteCourse = (courseId) => {
    return model.deleteOne({
        number: courseId
    });
};