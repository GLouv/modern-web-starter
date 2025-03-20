const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Connection = require('../../models/Connection');

router.get('/connect', (req, res) => {
  const shop = req.query.shop;
  if (!shop) {
    return res.status(400).json({ error: 'Shop parameter is required' });
  }

  const nonce = crypto.randomBytes(16).toString('hex');
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const scopes = 'read_products,write_products,read_orders,write_orders';
  const redirectUri = `${process.env.API_URL}/auth/shopify/callback`;
  
  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`;
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  try {
    const { code, shop, state } = req.query;
    const clientId = process.env.SHOPIFY_CLIENT_ID;
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });
    const tokenData = await tokenResponse.json();

    // Store connection
    const connection = new Connection({
      userId: req.user.uid,
      provider: 'shopify',
      accessToken: tokenData.access_token,
      providerUserId: shop,
      providerUsername: shop,
      scope: tokenData.scope.split(','),
      metadata: {
        shop_url: shop
      }
    });

    await connection.save();

    res.redirect(`${process.env.FRONTEND_URL}/connections?success=true`);
  } catch (error) {
    console.error('Shopify OAuth Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/connections?error=auth_failed`);
  }
});

module.exports = router;