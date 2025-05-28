const axios = require('axios');
require('dotenv').config();

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Use 'https://api-m.paypal.com' for live

// Get access token
async function getAccessToken() {
  const response = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
    data: 'grant_type=client_credentials',
  });
  return response.data.access_token;
}

// Create order
async function createOrder() {
  const accessToken = await getAccessToken();
  const response = await axios({
    url: `${PAYPAL_API}/v2/checkout/orders`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '5.00',
          },
        },
      ],
    },
  });
  return response.data;
}

// Capture payment
async function capturePayment(orderId) {
  const accessToken = await getAccessToken();
  const response = await axios({
    url: `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

module.exports = {
  createOrder,
  capturePayment,
};
