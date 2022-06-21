import 'dotenv/config'
export default {
    db:{
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        DB: "stalker_db",
    },
    auth:{
        secret: process.env.JWT_SECRET
    }
};