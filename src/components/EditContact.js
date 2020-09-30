import React from 'react'
import { View, TextInput, Image, Button, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import {EDIT_CONTACT} from '../store/actions/actionTypes'

class EditContact extends React.Component {
    state = {
        image: this.props.image,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        age: this.props.age,
        id: this.props.id
    }

    onFirstNameChangeHandler = (text) => {
        this.setState({
            firstName: text
        })
    }

    onLastNameChangeHandler = (text) => {
        this.setState({
            lastName: text
        })
    }

    onEmailChangeHandler = (text) => {
        this.setState({
            email: text
        })
    }

    onAgeChangeHandler = (text) => {
        this.setState({
            age: text
        })
    }
//ใน onPress ต้องเป็นฟังก์ชัน
    editContactHandler = (contact) => {
        console.log(contact);
        this.props.editContact(contact);
        this.props.toggleModalFunction();
        console.log('final line edit contact')
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.title}>Editing {this.state.firstName}</Text>
                    <Image source={{uri: this.state.image}} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>First Name: </Text>
                    <TextInput value={this.state.firstName} style={styles.inputStyle} onChangeText={this.onFirstNameChangeHandler}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Last Name: </Text>
                    <TextInput value={this.state.lastName} style={styles.inputStyle} onChangeText={this.onLastNameChangeHandler}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Email: </Text>
                    <TextInput value={this.state.email} style={styles.inputStyle} onChangeText={this.onEmailChangeHandler}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Age: </Text>
                    <TextInput value={this.state.age} style={styles.inputStyle} onChangeText={this.onAgeChangeHandler}/>
                </View>
                <View style={styles.btnContainer}>
                    <Button title="Edit" onPress={() => this.editContactHandler(this.state)}/>
                    <Button title="Close" onPress={this.props.toggleModalFunction}/>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    editContact: (contactData) => dispatch(EDIT_CONTACT(contactData))
})

export default connect(null,mapDispatchToProps)(EditContact)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6A391',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        width: '100%'
    },
    text: {
        fontSize: 16,
        margin: 20,
        marginRight:5,
        width: 90
    },
    inputContainer: {
        flexDirection: 'row',
        margin: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        margin: 30
    },
    btn: {
        width: '80%',
        margin: 40,
        marginBottom: 60
    },
    inputStyle: {
        borderColor: 'black',
        backgroundColor: 'white',
        width: '60%',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    image: {
        width: 175,
        height: 175,
        borderRadius: 100,
        margin: 10
    }
});