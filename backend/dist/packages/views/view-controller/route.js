"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
// import {checktoken} from '../../../utils/check-token'
const dotenv_1 = __importDefault(require("dotenv"));
const check_token_1 = require("../../../utils/check-token");
const parser_1 = __importDefault(require("datauri/parser"));
const fromviewmodel = __importStar(require("../../views"));
exports.router = express_1.default.Router();
const parser = new parser_1.default();
dotenv_1.default.config();
exports.router.post('/', (0, check_token_1.checktoken)(['admin', 'user']), async (req, res) => {
    const { ipaddress, recipeid } = req.body;
    try {
        const view = await fromviewmodel.create({ ipaddress, recipeid });
        return res.status(200).send(view);
    }
    catch (error) {
        return res.status(200).send({ error: `${error}` });
    }
});
exports.router.get('/:id', async (req, res) => {
    try {
        // const {email}=req.user;
        // const{findall}=req.body;
        // const user=fromusermodel.get_one2(email);
        // const ownerid=findall==true?null:user['id'];
        const { id } = req.params;
        const result = await fromviewmodel.getall(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return res.status(200).send({ error: `${error}` });
    }
});
//# sourceMappingURL=route.js.map