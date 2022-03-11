interface contact {
    phone: string;
    email: string;
}

export const splitPhoneEmail = (recordField: any): contact => {
    const updatedContact: contact = {
        phone: '',
        email: '',
    };

    if (typeof recordField == 'number') {
        updatedContact.phone = recordField.toString();
        return updatedContact;
    }

    updatedContact.phone = recordField.trim().slice(0, 14);
    updatedContact.email = recordField.trim().slice(15);
    return updatedContact
};
