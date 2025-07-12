import { environment } from '../../environments/environment';

export default () => ({
  database: {
    mongoUri: process.env.MONGO_URI || environment.mongoUri,
  },
  jwtSecret: process.env.JWT_SECRET || environment.jwtSecret,
});
