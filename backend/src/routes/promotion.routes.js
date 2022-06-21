import { addNewPromotion } from "../service/promotion/promotion.controller.js";
import { verifyToken } from "../middlewares/index.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/promotion", [verifyToken], addNewPromotion);
};