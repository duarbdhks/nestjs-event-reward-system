export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  services: {
    auth: {
      url: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    },
    event: {
      url: process.env.EVENT_SERVICE_URL || 'http://localhost:3002',
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-key-here',
    expiresIn: process.env.JWT_EXPIRATION || '1d',
  },
});
