import db from "../../models/index.js";
const Promotion = db.promotion;

export const addNewPromotion = (req, res) => {
    const promotion = new Promotion({
        title:req.body.title,
        subtext:req.body.subtext
    });
    promotion.save((err, promotion) => {
        if (err) {
            res.status(500).send({ message: err });
            req.log.err({ message: err }, "Error adding promotion");
            return;
        } else {
            req.log.child(promotion).info('Promotion added');
            res.status(200).send({
                id: promotion._id,
            });;
        }
    });
};