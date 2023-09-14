"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getone = void 0;
// import views from '../domain/Views';
const Views_1 = require("../domain/Views");
const getone = async (data) => {
    const viewer = await Views_1.views.query().findOne(Object.assign({}, data));
    return viewer;
};
exports.getone = getone;
//# sourceMappingURL=get_one.js.map