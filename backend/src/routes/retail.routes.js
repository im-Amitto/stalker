import { addNewRetail, updateInventory } from "../service/retails/retails.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/retail", addNewRetail);
    app.post("/api/inventory", updateInventory);
};