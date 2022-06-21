import express from 'express'
import db from './models/index.js'
import authApi from './routes/auth.routes.js'
import brandApi from './routes/brand.routes.js'
import productApi from './routes/product.routes.js'
import promotionApi from './routes/promotion.routes.js'
import retailApi from './routes/retail.routes.js'
import pino from 'pino-http'

export default async function (config) {
    const app = express();

    app.use(pino())
    // parse requests of content-type - application/json
    app.use(express.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    try {
        await db.mongoose
            .connect(`mongodb://${config.db.HOST}:${config.db.PORT}/${config.db.DB}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        console.log("Successfully connect to MongoDB.");
    } catch (err) {
        console.error("Connection error", err);
        process.exit();
    }

    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to stalker application." });
    });
    authApi(app)
    brandApi(app)
    productApi(app)
    promotionApi(app)
    retailApi(app)
    return app
}