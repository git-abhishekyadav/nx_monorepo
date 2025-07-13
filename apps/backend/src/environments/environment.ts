// Data for Dev environment

export const environment = {
  production: false,
  stack: 'dev',
  mongoUri:
    'mongodb+srv://abhishekyadav28:5j8yw5FIpaQpdb2D@mean.32tozhj.mongodb.net/?retryWrites=true&w=majority&appName=mean',
  whiteList: ['http://localhost:4200', 'https://phcentral-v2-dev.innate.ly', 'https://api-v2-dev.innate.ly'],
  HORSE_OWNER_URL: 'http://localhost:4000/1/showday/horseHistory',
  jwtSecret: '5j8yw5FIpaQpdb2D28vadaykehsihbayotisHesroh',

  frontEndUrl: 'http://localhost:4200',
  checkout: {
    successPath: 'checkout/ORDER_ID/3',
    cancelPath: 'checkout/ORDER_ID/1'
  },
  noReplyAphaMail: 'noreply@apha.phcentral.com'
};
