const express = require('express');
const router = express.Router();
const Connection = require('../../models/Connection');

router.get('/connect', (req, res) => {
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const redirectUri = `${process.env.API_URL}/auth/facebook/callback`;
  const scope = 'email,pages_show_list,pages_read_engagement,pages_manage_posts';
  
  const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
    const redirectUri = `${process.env.API_URL}/auth/facebook/callback`;

    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`
    );
    const tokenData = await tokenResponse.json();

    // Get user profile
    const profileResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${tokenData.access_token}`
    );
    const profile = await profileResponse.json();

    // Store connection
    const connection = new Connection({
      userId: req.user.uid,
      provider: 'facebook',
      accessToken: tokenData.access_token,
      tokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
      providerUserId: profile.id,
      providerUsername: profile.name,
      metadata: {
        email: profile.email
      }
    });

    await connection.save();

    res.redirect(`${process.env.FRONTEND_URL}/connections?success=true`);
  } catch (error) {
    console.error('Facebook OAuth Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/connections?error=auth_failed`);
  }
});

module.exports = router;