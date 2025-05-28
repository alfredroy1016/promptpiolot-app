// payment.js

const express = require('express');
const router = express.Router();
const { client } = require('../../config/paypal');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const Prompt = require('../../models/Prompt');

router.get('/buy/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    // 🔍 Fetch prompt from DB
    const prompt = await Prompt.findById(productId);
    if (!prompt) {
      return res.status(404).send('Prompt not found');
    }

    // 💵 Check for free prompts (optional)
    if (!prompt.price || prompt.price <= 0) {
      return res.redirect(`/user/download-page?file=${encodeURIComponent(prompt.file)}`);
    }

    // 🛒 Create PayPal order with dynamic price
    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: prompt.price.toFixed(2) // ✅ Use prompt.price
        },
        custom_id: productId
      }],
      application_context: {
        return_url: `http://localhost:3000/payment-success?productId=${productId}`,
       cancel_url: `http://localhost:3000/payment-cancel`

      }
    });

    const order = await client().execute(request);
    const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;
    res.redirect(approvalUrl);
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).send('Error creating order');
  }
});


router.get('/payment-success', async (req, res) => {
  const { token, PayerID, productId } = req.query;

  if (!token || !PayerID || !productId) {
    return res.status(400).send('Missing token, PayerID, or productId');
  }

  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(token);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    console.log('✅ Payment captured:', JSON.stringify(capture.result, null, 2));


    const prompt = await Prompt.findById(productId);
    if (!prompt) {
      return res.status(404).send('Prompt not found');
    }

 const filename = prompt.file; // e.g., 1748090711772.pdf
    res.redirect(`/user/download-page?file=${encodeURIComponent(filename)}`);


  } catch (err) {
    console.error('❌ Error capturing order:', err);
    res.status(500).send('Error capturing order');
  }
});

module.exports = router;  // <--- Add this line!
