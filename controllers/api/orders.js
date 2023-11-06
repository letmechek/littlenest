const Order = require('../../models/order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id)
  res.json(cart)
}

// async function addToCart(req, res) {
//   const cart = await Order.getCart(req.user._id)
//   await cart.addItemToCart(req.params.id)
//   res.json(cart)
// }

async function addToCart(req, res) {
  const { id } = req.params;
  const { selectedSize } = req.body;
  console.log(selectedSize +' controller orders')
  const cart = await Order.getCart(req.user._id);
  await cart.addItemToCart(id, selectedSize);
  res.json(cart)
}

async function setItemQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id)
  await cart.setItemQty(req.body.babyProductId, req.body.newQty)
  res.json(cart)
}

async function checkout(req, res) {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({orderId});
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const orderTotalCents = order.orderTotal * 100;

    const lineItems = order.lineItems.map((item) => {
      let imagess = item.babyProduct.image[0]
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.babyProduct.name, 
            // images: [imagess],
          },
          unit_amount: item.babyProduct.price * 100 
        },
        quantity: item.qty,
      };
    });
    console.log(order.lineItems[0].babyProduct)

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems, 
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: 'https://tsooncars-e2376d515cb8.herokuapp.com/success',
      cancel_url: 'https://tsooncars-e2376d515cb8.herokuapp.com/cancel',
    });

    res.json({ sessionUrl: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create session');
  }
}
