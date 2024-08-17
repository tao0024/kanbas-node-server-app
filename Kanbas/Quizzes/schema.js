import mongoose from "mongoose";

const studentAttemptSchema = new mongoose.Schema({
    student: { type: String, ref: "User", required: true },
    attempts: [{
        attemptNumber: Number,
        answers: [{
            questionId: String,
            answer: String,
        }],
        score: Number,
        timestamp: { type: Date, default: Date.now }
    }],
}, {
    _id: false
});

const questionSchema = new mongoose.Schema({
    _id: String,
    type: { type: String, required: true },
    title: { type: String, required: false },
    points: { type: Number, required: false },
    isPublished: { type: Boolean, default: false },
    question: { type: String, required: false },
    answers: [String],
    correct_answer: { type: String, required: false }, // 确保correct_answer被正确定义
    true_or_false: Boolean,
    blanks: [String],
    previewAnswer: String,
    students: [String],
    studentAnswer: [String]
}, {
    _id: false
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    course: { type: String, ref: "Course", required: true },
    points: Number,
    total_questions: Number,
    type: String,
    questionList: [questionSchema],
    assignment_group: String,
    shuffle_answer: Boolean,
    is_time_limit: Boolean,
    time_limit: Number,
    multiple_attempts: Boolean,
    how_many_attempts: Number,
    show_correct_answers: String,
    access_code: String,
    one_question_at_a_time: Boolean,
    webcam_required: Boolean,
    lock_after_answering: Boolean,
    lockdown_browser: Boolean,
    required_to_view_result: Boolean,
    view_responses: String,
    dueDate: String,
    availableFrom: String,
    untilDate: String,
    isPublished: { type: Boolean, default: false },
    studentAttempts: [studentAttemptSchema],
}, {
    collection: "quizzes"
});

export default quizSchema;
