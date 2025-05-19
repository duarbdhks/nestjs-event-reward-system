export default () => ({
  port: parseInt(process.env.EVENT_PORT, 10) || 3002,
  mongodb: {
    uri: process.env.EVENT_MONGODB_URI || 'mongodb://localhost:27017/event',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  },
});
