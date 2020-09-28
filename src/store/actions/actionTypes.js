//actions

export const ADD_CONTACT = (contactData) => {
    return({
        type: 'ADD_CONTACT',
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        image: contactData.image,
        email: contactData.email,
        age: contactData.age
    });
}
export const EDIT_CONTACT = (contactData) => {
    return({
        type: 'EDIT_CONTACT',
        id: contactData.id,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        image: contactData.image
    });
}
export const DELETE_CONTACT = (contactId) => {
    return({
        type: 'DELETE_CONTACT',
        id: contactId
    });
}
export const CLEAR_CONTACT = () => {
    return({
        type: 'CLEAR_CONTACT',
    });
}