import connectDB from "../../middleware/connectDB"
import Product from "../../models/Product"

const handler = async(req,res)=>{
    if (req.method === "POST") {
        try {
          for (let i = 0; i < req.body.length; i++) {
            let products = await Product.findByIdAndUpdate(req.body[i]._id , req.body[i]);
          }
          res.status(200).send({ success: "success" });
        } catch (error) {
          res.send({ error });
        }
      } else {
        return res.status(400).send({ error: "Inappropriate request" });
      }
}

export default connectDB(handler)