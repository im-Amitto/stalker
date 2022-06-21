import express from 'express'
import db from './models/index.js'
export default function (config) {
    const app = express();
    // parse requests of content-type - application/json
    app.use(express.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    db.mongoose
        .connect(`mongodb://${config.db.HOST}:${config.db.PORT}/${config.db.DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connect to MongoDB.");
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });

    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to stalker application." });
    });

    return app
}