import Order from "../../models/Order";

export default async function handler(req, res) {
    if(req.method==='POST'){
        try {
        let order = new Order({...req.body , amount:req.body.subTotal , products:req.body.cart});
        await order.save();
        res.status(200).send({order});
    } catch (error) {
        res.send({error})       
    }
    }else{
        res.status(400).send({error : 'Inappropriate request'})
    }
  }
  