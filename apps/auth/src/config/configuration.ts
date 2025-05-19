export default () => ({
  port: parseInt(process.env.AUTH_PORT, 10) || 3001,
  mongodb: {
    uri: process.env.AUTH_MONGODB_URI || 'mongodb://localhost:27017/auth',
  },
  jwt: {
    secret:
      process.env.JWT_SECRET || 'vavpltCunGA7mF8Qm0jnAeKFI1F/dgfU5bf4xmUnfpdsROuBEFmWRIRkCzssGqM3',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});
