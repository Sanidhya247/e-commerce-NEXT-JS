import User from "../../models/User";
import connectDB from "../../middleware/connectDB";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = new User({...req.body,password: CryptoJS.AES.encrypt(req.body.password,
          process.env.AES_SECRET
        ).toString(),
      });
      await user.save();
      res.send({ success: true });
    } catch (error) {
      res.send({ error, success: false });
    }
  } else {
    return res.status(400).send({ error: "Inappropriate request" });
  }
};

export default connectDB(handler);
