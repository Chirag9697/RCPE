// import dotenv from 'dotenv';
const { Knex } = require("knex")
// dotenv.config();
const dotenv=require('dotenv');
dotenv.config();
module.exports = {
    development: {
        client: 'pg',
        connection:process.env.DATABASE_URL ,
        seeds:{
            directory:'./seeds'
        },
        useNullAsDefault: true,
        debug: true,
        // keepAlive:true
    },
}
    