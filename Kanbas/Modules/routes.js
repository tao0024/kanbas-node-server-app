import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
    app.post("/api/courses/:courseNumber/modules", async (req, res) => {
        const {
            courseNumber
        } = req.params;
        const newModule = {
            ...req.body,
            course: courseNumber,
        };
        try {
            const module = await dao.createModule(newModule);
            res.json(module);
        } catch (error) {
            res.status(500).json({
                error: "Failed to create module"
            });
        }
    });

    app.get("/api/courses/:courseNumber/modules", async (req, res) => {
        const {
            courseNumber
        } = req.params;
        try {
            const modules = await dao.findModulesByCourseNumber(courseNumber);
            res.json(modules);
        } catch (error) {
            res.status(500).json({
                error: "Failed to retrieve modules"
            });
        }
    });

    app.delete("/api/modules/:mid", async (req, res) => {
        const {
            mid
        } = req.params;
        try {
            const status = await dao.deleteModule(mid);
            res.json(status);
        } catch (error) {
            res.status(500).json({
                error: "Failed to delete module"
            });
        }
    });

    app.put("/api/modules/:mid", async (req, res) => {
        const {
            mid
        } = req.params;
        try {
            const status = await dao.updateModule(mid, req.body);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({
                error: "Failed to update module"
            });
        }
    });
}