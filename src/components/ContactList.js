import * as React from 'react'
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList, Alert} from 'react-native'
import { connect } from 'react-redux';
import Contact from './Contact';
import {DELETE_CONTACT} from '../store/actions/actionTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ShowContact from './ShowContact';

const Stack = createStackNavigator();

class ContactList extends React.Component {
    state = {
        modalVisibility: false,
        image: null,
        firstName: null,
        lastName: null,
        email: null,
        age: null
    };

    toggleModalHandler = () => {
        this.setState({
            modalVisibility: !this.state.modalVisibility,
            image: null,
            firstName: null,
            lastName: null,
            email: null,
            age: null
        });
    }

    deleteContactHandler = (contactId,contactFirstName) => {
        Alert.alert(`Deleting ${contactFirstName}`,'Are you sure?',
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    } , { 
                    text: "OK", 
                    onPress: () => this.props.deleteContact(contactId)
                    }
                ],
              { cancelable: false })
    }

    showContactHandler = (contact) => {
        this.toggleModalHandler();
        this.setState({
            image: contact.image,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            age: contact.age
        });
    }

    renderItem = ({item}) => (
        <Contact 
            firstName={item.firstName}
            lastName={item.lastName}
            image={item.image}
            deleteFunction={() => this.deleteContactHandler(item.id,item.firstName)}
            showContactFunction={() => this.showContactHandler(item)}
        />
    )

    render() {
        let output;
        if (this.props.contacts === null || this.props.contacts.length <= 0) {
            output = <Text style={styles.title}>No Contact Added</Text>
        } else {
            output = <FlatList data={this.props.contacts} renderItem={this.renderItem} />
        }
        
        // output = <FlatList data={this.props.contacts} renderItem={this.renderItem} />
        return(
            <View style={styles.container}>
                <Modal visible={this.state.modalVisibility} animationType="slide">
                    <ShowContact
                        image={this.state.image}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        age={this.state.age}
                        toggleModalFunction={() => this.toggleModalHandler()}
                    />
                </Modal>
                {output}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contactStore.contacts
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteContact: (contactId) => dispatch(DELETE_CONTACT(contactId))
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactList);
// export default ContactList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        margin: 10,
        borderColor: 'black',
        backgroundColor: '#F0E1B8',
        borderWidth: 2
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem: {
        margin: 30,
        fontSize: 16
    },
    inputContainer: {
        flexDirection: 'row',
        margin: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        margin: 30
    },
    submit: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btn: {
        margin: 10,
        marginBottom: 20
    },
    input: {
        borderColor: 'black',
        width: '50%',
        padding: 10,
        margin: 10,
        borderRadius: 20
    }
});
