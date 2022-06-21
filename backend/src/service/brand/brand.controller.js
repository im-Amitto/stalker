import db from "../../models/index.js";
const Brand = db.brand;

export const addNewBrand = (req, res) => {
    const brand = new Brand({
        name: req.body.name,
    });
    brand.save((err,brand) => {
        if (err) {
            res.status(500).send({ message: err });
            req.log.err({ message: err }, "Error adding brand");
            return;
        }else{
            req.log.child(brand).info('Brand added');
            res.status(200).send({ message: "Brand has been added successfully!", id: brand._id });
        }
    });
};