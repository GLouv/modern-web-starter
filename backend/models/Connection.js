const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['facebook', 'instagram', 'twitter', 'linkedin', 'gmail', 'shopify']
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  tokenExpiry: {
    type: Date
  },
  providerUserId: {
    type: String
  },
  providerUsername: {
    type: String
  },
  scope: [{
    type: String
  }],
  metadata: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Encrypt sensitive data before saving
connectionSchema.pre('save', async function(next) {
  if (this.isModified('accessToken')) {
    this.accessToken = await encrypt(this.accessToken);
  }
  if (this.isModified('refreshToken') && this.refreshToken) {
    this.refreshToken = await encrypt(this.refreshToken);
  }
  next();
});

// Decrypt data when retrieving
connectionSchema.methods.getDecryptedAccessToken = async function() {
  return decrypt(this.accessToken);
};

connectionSchema.methods.getDecryptedRefreshToken = async function() {
  return this.refreshToken ? decrypt(this.refreshToken) : null;
};

module.exports = mongoose.model('Connection', connectionSchema);