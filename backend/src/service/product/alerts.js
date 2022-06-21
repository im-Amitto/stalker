import db from "../../models/index.js";
const Product = db.product;

export const productPriceAlert = (productId, newPrice) => {
    console.log("hello");
    Product.findById(productId).exec((err, product) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!product) {
            console.log(err);
            return;
        }
        if (!product.minPrice || product.minPrice > newPrice) {
            Product.findByIdAndUpdate(product, { minPrice: newPrice }).exec((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                // This can be sent to google pub/sub for a text message or e-mail
                console.log("Price has been dropped");
            })
        }
    })
}