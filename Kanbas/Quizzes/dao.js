import model from "./model.js";

export const createQuiz = (quiz) => model.create(quiz);

export const findAllQuizzes = () => model.find().populate("course");

export const findQuizzesByCourseId = (courseId) => model.find({ course: courseId });

export const findQuizById = (quizId) => model.findById(quizId).populate("questionList");

export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });

export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });

export const findQuizzesByTitle = (title) => {
    const regex = new RegExp(title, "i");
    return model.find({ title: { $regex: regex } });
};

export const findQuizzesByCourseIdAndPublished = (courseId, isPublished) =>
    model.find({ course: courseId, isPublished: isPublished });


