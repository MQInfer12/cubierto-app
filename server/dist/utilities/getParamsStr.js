"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParamsStr = void 0;
const getParamsStr = (params) => {
    const arr = [];
    for (const key in params) {
        if (params[key]) {
            arr.push(`${key}=${params[key]}`);
        }
    }
    return "?" + arr.join("&");
};
exports.getParamsStr = getParamsStr;
//# sourceMappingURL=getParamsStr.js.map