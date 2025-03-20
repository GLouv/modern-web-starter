const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');
const { encrypt, decrypt } = require('../utils/encryption');

// Get all connections for a user
router.get('/', async (req, res) => {
  try {
    const connections = await Connection.find({ userId: req.user.uid });
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new connection
router.post('/', async (req, res) => {
  try {
    const connection = new Connection({
      userId: req.user.uid,
      provider: req.body.provider,
      accessToken: req.body.accessToken,
      refreshToken: req.body.refreshToken,
      tokenExpiry: req.body.tokenExpiry,
      providerUserId: req.body.providerUserId,
      providerUsername: req.body.providerUsername,
      scope: req.body.scope,
      metadata: req.body.metadata
    });

    await connection.save();
    res.status(201).json(connection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a connection
router.put('/:id', async (req, res) => {
  try {
    const connection = await Connection.findOne({
      _id: req.params.id,
      userId: req.user.uid
    });

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    Object.assign(connection, req.body);
    await connection.save();
    res.json(connection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a connection
router.delete('/:id', async (req, res) => {
  try {
    const connection = await Connection.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid
    });

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    res.json({ message: 'Connection deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;