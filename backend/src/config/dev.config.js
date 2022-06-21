import 'dotenv/config'

export default {
    db:{
        HOST: process.env.NODE_ENV,
        PORT: process.env.DB_PORT,
        DB: "stalker_dev_db",
    },
    auth:{
        secret: process.env.JWT_SECRET
    }
};