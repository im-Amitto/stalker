import db from "../../models/index.js";
const User = db.user;
const Role = db.role;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }else{
            res.status(200).send({ message: "User was registered successfully!" });
        }
    });
};

export const signin = (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    });
};