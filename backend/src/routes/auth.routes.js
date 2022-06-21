import { verifySignUp, validateEmail, validatePassword, validateUsername } from "../middlewares/index.js";
import { signin, signup } from "../service/auth/auth.controller.js";
export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/auth/signup", [
        verifySignUp.checkDuplicateUsernameOrEmail,
        validateEmail,
        validatePassword,
        validateUsername
    ],
        signup
    );
    app.post("/api/auth/signin", [
        validateUsername,
        validatePassword
    ], signin);
};