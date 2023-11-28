import Product from "../../models/Product";
import connectDB from "../../middleware/connectDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      for (let i = 0; i < req.body.length; i++) {
        let products = new Product({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          size: req.body[i].size,
          color: req.body[i].color,
          price: req.body[i].price,
          availableQty: req.body[i].availableQty,
        });
        await products.save();
      }
      res.status(200).send({ success: "success" });
    } catch (error) {
      res.send({ error });
    }
  } else {
    return res.status(400).send({ error: "Inappropriate request" });
  }
};

export default connectDB(handler);
