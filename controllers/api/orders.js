const { response } = require('express');
const Order = require('../../models/order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Mpesa = require('mpesa-node')
const mpesaApi = new Mpesa({ consumerKey: 'fxHfG9fZAXFkLgaAA02mCrBadoZbuudU', consumerSecret: 'rzcRYjwQTGdSoFgR' })
// CONSUMER_KEY=JrgsGulM3nd0UlQtxqjOfQ3xBk3nz9a5
// CONSUMER_SECRET=xcukhxceYXl34WL6

async function cart(req, res) {
  const cart = await Order.getCart(req.user._id)
  res.json(cart)
}

async function addToCart(req, res) {
  const { id } = req.params;
  const { selectedSize, selectedColor } = req.body;
  const cart = await Order.getCart(req.user._id);
  await cart.addItemToCart(id, selectedSize, selectedColor);
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
    const order = await Order.findOne({ _id: orderId });
    console.log(orderId)
    console.log(order)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const orderTotalCents = order.orderTotal * 100;

    const lineItems = order.lineItems.map((item) => {
      // let imagess = item.babyProduct.image[0]
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
    console.log(order + ' controller')

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
// async function createToken(req, res){
//   mpesaApi
//   .c2bSimulate(
//       254793022425,
//       500,
//       'h6dk0Ue2',
//       shortCode = null,
//   )
//   .then((result) => {
//       //do something
//       console.log(response)
//       res.json(response)
//   })
//   .catch((err) => {
//       console.log(err)
//   })
// }
//  async function createToken(confirmationUrl, validationUrl, shortCode = null, responseType = 'Completed') {
//   const req = await this.request()
//   return req.post('/mpesa/c2b/v1/registerurl', {
//     'ShortCode': shortCode || this.configs.shortCode,
//     'ResponseType': responseType,
//     'ConfirmationURL': confirmationUrl,
//     'ValidationURL': validationUrl
//   })
// }


module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  // createToken,
  
};

// const request = require('request'); // Node.js HTTP client
// const { M_PESA_CONSUMER_KEY, M_PESA_CONSUMER_SECRET, M_PESA_PASSKEY, M_PESA_SHORTCODE } = process.env; // Fetch credentials from environment variables

// const checkout = async (req, res) => {
//   try {
//     const { amount, phoneNumber } = req.body; // Extract payment details from the request

    // Prepare the request to the M-Pesa API
    // const options = {
    //   method: 'POST',
    //   url: 'https://sandbox.safaricom.co.ke/oauth/v1/generate',
    //   headers: {
    //     'Authorization': `Basic ${Buffer.from(`${M_PESA_CONSUMER_KEY}:${M_PESA_CONSUMER_SECRET}`).toString('base64')}`
    //   }
    // };

    // request(options, (error, response, body) => {
    //   if (error) {
    //     res.status(500).json({ error: 'Failed to authenticate' });
    //   } else {
    //     const accessToken = JSON.parse(body).access_token;
    //     const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    //     const password = Buffer.from(`${M_PESA_SHORTCODE}${M_PESA_PASSKEY}${timestamp}`).toString('base64');

    //     const paymentRequest = {
    //       BusinessShortCode: M_PESA_SHORTCODE,
    //       Password: password,
    //       Timestamp: timestamp,
    //       TransactionType: 'CustomerPayBillOnline',
    //       Amount: amount,
    //       PartyA: phoneNumber,
    //       PartyB: M_PESA_SHORTCODE,
    //       PhoneNumber: phoneNumber,
    //       CallBackURL: 'https://your-callback-url.com', // Your endpoint to handle the response
    //       AccountReference: 'Your account reference',
    //       TransactionDesc: 'Transaction description'
    //     };

    //     const paymentOptions = {
    //       method: 'POST',
    //       url: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    //       headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(paymentRequest)
    //     };

    //     request(paymentOptions, (error, response, body) => {
    //       if (error) {
    //         res.status(500).json({ error: 'Failed to initiate payment' });
    //       } else {
            // Handle the response from the payment request
            // This typically involves updating your database with the transaction details

            // Return success response to the client
//             res.status(200).json({ message: 'Payment request initiated successfully' });
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };

// module.exports = { checkout };
