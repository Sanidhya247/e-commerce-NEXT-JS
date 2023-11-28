import connectDB from "../../middleware/connectDB";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

let products = [];
let prices = [];
let customer;
let invoice;

const handler = async (req, res) => {
  if (req.method == "POST") {
    let { cart, subTotal } = req.body;
    //// checkout session /////
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   line_items: Object.keys(cart).map(item => {
    //     return {
    //       price_data: {
    //         currency: "inr",
    //         product_data: {
    //           name:cart[item].title,
    //         },
    //         unit_amount:cart[item].price*100,
    //       },
    //       quantity: cart[item].qty,
    //     }
    //   }),
    //   success_url:'http://localhost:3000/order' ,
    //   cancel_url:'http://localhost:3000/checkout' ,
    // })
    // res.json({ url:session.url })

    const createProducts = async () => {
      Object.keys(cart).map(async (item) => {
        let prd = stripe.products
          .create({
            name: cart[item].title,
          })
          .then((product) => {
            stripe.prices
              .create({
                product: product.id,
                unit_amount: cart[item].price * 100,
                currency: "inr",
              })
              .then((price) => {
                prices.push(price);
                console.log("price---->", price);
              });
          });
      });
      createCustomer();
    };

    const createCustomer = () => {
      stripe.customers
        .create({
          name: "sanidhya kanani",
          email: "sanidhyakanani222@gmail.com",
          description: "My first customer",
        })
        .then((customer) => {
          stripe.invoices
            .create({
              customer: customer.id,
              collection_method: "send_invoice",
              days_until_due: 30,
            })
            .then((invoice) => {
              stripe.invoiceItems
                .create({ 
                  customer: invoice.customer,
                  price: prices[0].id,
                  invoice: invoice.id,
                })
                .then((invoice) => {
                  stripe.invoices
                    .finalizeInvoice(invoice.id)
                    .then((invoice) => {
                      stripe.invoices.sendInvoice(invoice.id).then((final) => {
                        res.json({ data: final });
                      });
                    });
                });
            })
            .then((invoice) => {
              console.log("invoice----->", invoice);
            });
        });
    };
    createProducts();

    
  }
};

export default connectDB(handler);
