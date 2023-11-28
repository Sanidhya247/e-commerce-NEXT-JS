import User from "../../models/User";
import connectDB from "../../middleware/connectDB";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.AES_SECRET
        );
        if (user.email === req.body.email &&req.body.password === bytes.toString(CryptoJS.enc.Utf8)) {
          const token = jwt.sign(
            { email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          res.status(200).send({ token, success: true });
        } else {res.status(400).send({ success: false, error: "Invalid Credentials" });}
      } else {
        res.status(404).send({ success: false, error: "Invalid Credentials" });
      }
    } catch (error) {
      res.send({ error, success: false });
    }
  } else {
    return res.status(400).send({ error: "Inappropriate request" });
  }
};

export default connectDB(handler);
