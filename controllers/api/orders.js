const { response } = require('express');
const Order = require('../../models/order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const consumerKey = process.env.CONSUMER_KEY
// const consumerSecret = process.env.CONSUMER_SECRET
const consumerKey =' qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW'
const consumerSecret = 'osGQ364R49cXKeOYSpaOnT++rHs='
const axios = require('axios');
const authenticationUrl = 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken';
const paymentInitiationUrl = 'https://cybqa.pesapal.com/pesapalv3/api/PostPesapalDirectOrderV4';


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
const authenticatePesapal = async (req, res) => {
  try {
    // Replace these values with your actual consumer key and secret
    const consumerKey = 'qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW';
    const consumerSecret = 'osGQ364R49cXKeOYSpaOnT++rHs=';

    // Pesapal API authentication endpoint URL
    const apiUrl = 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken';

    // Request payload
    const requestData = {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    };

    // HTTP headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Make a POST request to Pesapal API for authentication
    const response = await axios.post(apiUrl, requestData, { headers });

    // Extract relevant data from the response
    const { token, expiryDate, error, status, message } = response.data;

    // Check for errors in the response
    if (error) {
      return res.status(status).json({ error, message });
    }

    // Successful authentication, send the token and expiry date in the response
    res.status(200).json({ token, expiryDate, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function getPesapalAccessToken(consumerKey, consumerSecret) {
  try {
    const response = await axios.post(authenticationUrl, {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    });

    return response.data.token;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve Pesapal access token');
  }
}

// Function to initiate M-Pesa payment
async function initiateMpesaPayment(req, res) {
  try {
    // Get necessary details from the request
    const { orderId, amount, description, phoneNumber, userEmail } = req.body;

    // Get Pesapal access token
    const accessToken = await getPesapalAccessToken(consumerSecret, consumerKey);

    // Construct the API request payload
    const apiRequestPayload = {
      ConsumerKey: consumerKey,
      ConsumerSecret: consumerSecret,
      Amount: amount,
      Description: description,
      Type: 'MERCHANT',
      Reference: orderId,
      PhoneNumber: phoneNumber,
      Email: userEmail,
    };

    // Make a POST request to Pesapal API with the access token
    const response = await axios.post(paymentInitiationUrl, apiRequestPayload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response.config.url)

    res.redirect(response.config.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to initiate M-Pesa payment' });
  }
}


module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  authenticatePesapal,
  initiateMpesaPayment
};
