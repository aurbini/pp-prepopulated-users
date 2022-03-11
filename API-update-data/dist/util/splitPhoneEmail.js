"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitPhoneEmail = void 0;
const splitPhoneEmail = (recordField) => {
    const updatedContact = {
        phone: '',
        email: '',
    };
    if (typeof recordField == 'number') {
        updatedContact.phone = recordField.toString();
        return updatedContact;
    }
    updatedContact.phone = recordField.trim().slice(0, 14);
    updatedContact.email = recordField.trim().slice(15);
    return updatedContact;
};
exports.splitPhoneEmail = splitPhoneEmail;
