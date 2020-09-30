import {ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT} from '../actions/actionTypes';

// CENTRAL STORE LOOK LIKE THIS

// contacts = [...each contact...]
// contact = {
//     id: '1234',
//     firstName: 'firstName',
//     lastName: 'lastName',
//     email: 'email',
//     age: '22'
//     image: '{uri: ...}'
// }

const initialState = {
    contacts: []
}

const contactReducer = (state = initialState, action) => {
    let result;
    switch (action.type) {
        case 'ADD_CONTACT':
            result = {
                ...state,
                contacts: state.contacts.concat({
                    id: (Math.random()*1000).toString(),
                    firstName: action.firstName,
                    lastName: action.lastName,
                    email: action.email,
                    age: action.age,
                    image: action.image
                })
            };
            return result;
        case 'EDIT_CONTACT':
            result = {
                ...state,
                contacts: state.contacts.map((contact) => {
                    if (contact.id === action.id) {
                        return {
                            id: action.id,
                            firstName: action.firstName,
                            lastName: action.lastName,
                            email: action.email,
                            age: action.age,
                            image: action.image
                        }
                    } else {
                        return contact;
                    }
                })
            };
            return result;
        case 'DELETE_CONTACT':
            result = {
                ...state,
                contacts: state.contacts.filter((contact) => {
                    return (contact.id !== action.id)
                })
            };
            return result;
        case 'CLEAR_CONTACT':
            result = {
                contacts: []
            }
            return result;
        default:
            return state;
    }
}

export default contactReducer;