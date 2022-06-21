import { addNewProduct, GetRetailAvailability, listAllProducts } from "../service/product/product.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/product", addNewProduct);
    app.get("/api/product", listAllProducts);
    app.post("/api/product/availability", GetRetailAvailability);
};