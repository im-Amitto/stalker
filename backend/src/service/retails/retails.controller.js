import db from "../../models/index.js";
import { productPriceAlert } from "../product/alerts.js";
const Retail = db.retail;

export const addNewRetail = (req, res) => {
    const retail = new Retail({
        name: req.body.name
    });
    retail.save((err, retail) => {
        if (err) {
            res.status(500).send({ message: err });
            req.log.err({ message: err }, "Error adding retail");
            return;
        } else {
            req.log.child(retail).info('Retail added');
            res.status(200).send({ message: "Retail has been added successfully!", id: retail._id });
        }
    });
};

export const updateInventory = (req, res) => {
    let retailId = req.body.retailId;
    let productId = req.body.productId;
    let qty = req.body.qty;
    let price = req.body.price;
    let promotionId = req.body.promotionId;

    // Good for now, but for large scale. Use a cursor or pagination
    Retail.findOne({ _id: retailId }, function (err, retail) {
        if (err) {
            res.status(500).send({ message: err });
            req.log.err({ message: err }, "Error fetching products");
            return;
        }

        if (!retail) {
            res.status(400).send({ message: "Invalid retail shop id" });
            return;
        }
        // Wa want to check if product id is valid or not as well but skipping for now
        let updated = false;
        retail.inventory.every((item, i) => {
            if (item.product.toString() == productId) {
                updated = true;
                // In prod cases i would have sent it to a seperate node server as it's a non-critical task
                // Creating a new task using settimeout for price notification
                if(price && price < item.price){
                    setTimeout(productPriceAlert, 0, productId, price);
                }
                retail.inventory[i] = { "product": productId, "qty": qty ? qty : item.qty, "price": price ? price : item.price, "promotion": promotionId ? promotionId : item.promotion }
                return false;
            }
            return true;
        })

        // We should actually split the api in two, one is purely responsible for update and other is for insertion
        if (!updated) {
            setTimeout(productPriceAlert, 0, productId, price);
            retail.inventory.push({ "product": productId, "qty": qty, "price": price , "promotion": promotionId  })
        }

        Retail.findByIdAndUpdate(retailId, retail).exec(err => {
            if (err) {
                res.status(500).send({ message: err });
                req.log.err({ message: err }, "Error updating inventory");
                return;
            }

            return res.status(200).send({ message: "Inventory has been updated" });
        })
    });
};