"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getall = void 0;
// import views from '../domain/Views';
const Views_1 = require("../domain/Views");
const getall = async (recipeid) => {
    const viewers = await Views_1.views.query().where('recipeid', '=', `${recipeid}`);
    return viewers;
};
exports.getall = getall;
//# sourceMappingURL=get_all.js.map