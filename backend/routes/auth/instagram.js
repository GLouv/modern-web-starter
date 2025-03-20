const express = require('express');
const router = express.Router();
const Connection = require('../../models/Connection');

router.get('/connect', (req, res) => {
  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const redirectUri = `${process.env.API_URL}/auth/instagram/callback`;
  const scope = 'user_profile,user_media';
  
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const clientId = process.env.INSTAGRAM_CLIENT_ID;
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
    const redirectUri = `${process.env.API_URL}/auth/instagram/callback`;

    // Exchange code for access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code
      })
    });
    const tokenData = await tokenResponse.json();

    // Get user profile
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${tokenData.access_token}`
    );
    const profile = await profileResponse.json();

    // Store connection
    const connection = new Connection({
      userId: req.user.uid,
      provider: 'instagram',
      accessToken: tokenData.access_token,
      providerUserId: profile.id,
      providerUsername: profile.username
    });

    await connection.save();

    res.redirect(`${process.env.FRONTEND_URL}/connections?success=true`);
  } catch (error) {
    console.error('Instagram OAuth Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/connections?error=auth_failed`);
  }
});

module.exports = router;