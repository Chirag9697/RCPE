"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const { Knex } = require("knex");
dotenv_1.default.config();
module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        seeds: {
            directory: './seeds'
        },
        useNullAsDefault: true,
        debug: true,
    },
};
//# sourceMappingURL=knexfile.js.map