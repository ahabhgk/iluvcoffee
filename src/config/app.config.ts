export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT || 5432,
  },
})
