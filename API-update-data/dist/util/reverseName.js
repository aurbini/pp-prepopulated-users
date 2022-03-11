"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseName = void 0;
const reverseName = (name) => {
    let reverseName = '';
    const nameSplit = name.split(',');
    for (let i = nameSplit.length; i > 0; i--) {
        reverseName += nameSplit[i];
    }
    return reverseName;
};
exports.reverseName = reverseName;
