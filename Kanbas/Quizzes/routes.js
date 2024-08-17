import * as dao from "./dao.js";

export default function QuizzesRoutes(app) {
    app.post('/api/courses/:cid/quizzes', async (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
            _id: undefined, 
        };
        try {
            const quiz = await dao.createQuiz(newQuiz);
            //console.log("Quiz created successfully:", quiz);
            res.json(quiz);
        } catch (error) {
            console.error("Error creating quiz:", error); 
            res.status(500).json({ error: "Failed to create quiz" });
        }
    });

    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const role = req.query.role;
    
        try {
            let quizzes;
            if (role === "FACULTY" || role === "ADMIN") {
               
                quizzes = await dao.findQuizzesByCourseId(cid);
            } else {
                
                quizzes = await dao.findQuizzesByCourseIdAndPublished(cid, true);
            }
            res.json(quizzes);
        } catch (error) {
            console.error("Error retrieving quizzes:", error); 
            res.status(500).json({ error: "Failed to retrieve quizzes" });
        }
    });
    
    

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        try {
            const status = await dao.deleteQuiz(qid);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: "Failed to delete quiz" });
        }
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        try {
            const status = await dao.updateQuiz(qid, req.body);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: "Failed to update quiz" });
        }
    });

    app.put('/api/quizzes/:qid/publish', async (req, res) => {
        const { qid } = req.params;
        const publishStatus = req.body.isPublished;  

        try {
            const updatedQuiz = await dao.updateQuiz(qid, { isPublished: publishStatus });
            res.json(updatedQuiz);
        } catch (error) {
            res.status(500).json({ error: "Failed to update quiz publish status" });
        }
    });

app.post('/api/quizzes/:qid/submit', async (req, res) => {
    const { qid } = req.params;
    const { studentId, answers } = req.body;

    try {
        const quiz = await dao.findQuizById(qid);

        const studentRecord = quiz.studentAttempts.find(attempt => attempt.student === studentId);

        if (studentRecord && studentRecord.attempts.length >= quiz.how_many_attempts) {
            return res.status(403).json({ error: "Maximum attempts reached" });
        }

        let score = 0;
        answers.forEach((answer) => {
            const question = quiz.questionList.find(q => q._id === answer.questionId);
            if (question.type === 'True/False') {
                if (String(question.true_or_false) === String(answer.answer)) {
                    score += question.points;
                }
            } else if (question.type === 'Fill In the Blank') {
                if (question.blanks.includes(answer.answer)) {
                    score += question.points;
                }
            } else {
                if (String(question.correct_answer) === String(answer.answer)) {
                    score += question.points;
                }
            }
        });

        const newAttempt = {
            attemptNumber: studentRecord ? studentRecord.attempts.length + 1 : 1,
            answers,
            score,
        };

        if (studentRecord) {
            studentRecord.attempts.push(newAttempt);
        } else {
            quiz.studentAttempts.push({
                student: studentId,
                attempts: [newAttempt],
            });
        }

        await dao.updateQuiz(qid, quiz);
        res.status(200).json({ score });

    } catch (error) {
        res.status(500).json({ error: "Failed to submit quiz" });
    }
});

    
    
    
}
