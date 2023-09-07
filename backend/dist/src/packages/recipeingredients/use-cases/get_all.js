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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
// import {Recipe} from '../domain/recipe';
const recipeingredients_1 = require("../domain/recipeingredients");
const fromingredientmodel = __importStar(require("../../ingredients"));
const get_all = async (recipeid) => {
    const allrecipeingredients = await recipeingredients_1.recipeingredients.query().where('recipeid', '=', recipeid);
    // console.log(all);
    const modifiedrecipeingredients = [];
    console.log("allrecipeing", allrecipeingredients);
    for (var i = 0; i < allrecipeingredients.length; i++) {
        const ingred = await fromingredientmodel.get_one(allrecipeingredients[i].ingredientid);
        modifiedrecipeingredients.push(Object.assign(Object.assign({}, allrecipeingredients[i]), { ingredientname: ingred.ingredientname }));
        console.log("ingred", ingred);
    }
    return modifiedrecipeingredients;
};
exports.get_all = get_all;
//# sourceMappingURL=get_all.js.map