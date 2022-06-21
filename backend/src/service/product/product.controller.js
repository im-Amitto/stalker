import db from "../../models/index.js";
const Product = db.product;
const Retail = db.retail;
const Promotion = db.promotion;

export const addNewProduct = (req, res) => {
    console.log(req.body.brandId);
    const product = new Product({
        name: req.body.name,
        brand: [req.body.brandId]
    });
    product.save((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            req.log.err({ message: err }, "Error adding product");
            return;
        } else {
            req.log.child(product).info('Product added');
            res.status(200).send({ message: "Product has been added successfully!", id: product._id });
        }
    });
};

export const listAllProducts = (req, res) => {
    // Good for now, but for large scale. Use a cursor or pagination
    Product.find({}).exec((err, products) => {
        if (err) {
            res.status(500).send({ message: err });
            req.log.err({ message: err }, "Error fetching products");
            return;
        }
        if (!products && products.length == 0) {
            return res.status(200).send({ message: "No products available" });
        }
        let productList = []
        products.forEach(product => {
            productList.push({ "name": product.name, id: product._id })
            console.log(product);
        })
        res.status(200).send({
            count: productList.length,
            list: productList
        });
    });
};

export const GetRetailAvailability = (req, res) => {
    let productId = req.body.productId;
    // Good for now, but for large scale. Use a cursor or pagination
    Retail.find({}).populate({
        path: 'inventory',
        populate: {
            path: 'product',
            model: Product
        }
    }).populate({
        path: 'inventory',
        populate: {
            path: 'promotion',
            model: Promotion
        }
    }).exec((err, retail) => {
        if (err) {
            res.status(500).send({ message: err });
            req.log.err({ message: err }, "Error fetching product");
            return;
        }
        if (retail.length == 0) {
            return res.status(200).send({ message: "Product not sold by anyone" });
        }
        let notAvailable=[]
        let available = []

        retail.forEach(shop=>{
            let found = false
            shop.inventory.every((item,i)=>{
                console.log(item["product"]["id"]);
                console.log(productId);
                if (item["product"]["id"] == productId){
                    available.push({name: shop.name, promotion: item.promotion, price: item.price});
                    found = true;
                    return false;
                }
                return true;
            })
            if(!found){
                notAvailable.push({name: shop.name, id: shop.id})
            }
        })
        res.status(200).send({ 
            shops: available,
            notSelling: notAvailable,
         });
    });
};