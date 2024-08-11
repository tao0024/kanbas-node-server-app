import * as dao from "./dao.js"

export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {

        const course = await dao.createCourse(req.body);
        res.json(course);

    };

    const findAllCourses = async (req, res) => {
        try {
            const courses = await dao.findAllCourses();
            res.json(courses);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    };

    const findCourseById = async (req, res) => {
        try {
            const course = await dao.findCourseById(req.params.courseId);
            if (!course) {
                res.status(404).json({
                    message: "Course not found"
                });
                return;
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    };

    const updateCourse = async (req, res) => {
        try {
            const {
                courseId
            } = req.params;
            const status = await dao.updateCourse(courseId, req.body);
            if (!status) {
                res.status(404).json({
                    message: "Course not found"
                });
                return;
            }
            res.json(status);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    };

    const deleteCourse = async (req, res) => {
        try {
            const status = await dao.deleteCourse(req.params.courseId);
            if (!status) {
                res.status(404).json({
                    message: "Course not found"
                });
                return;
            }
            res.json(status);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    };

    app.post("/api/courses", createCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:courseId", findCourseById);
    app.put("/api/courses/:courseId", updateCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
}