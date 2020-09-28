import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Platform } from 'react-native';
import {ADD_CONTACT} from '../store/actions/actionTypes';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const placeholder = require('../../assets/placeholder.png');

class FirstScreen extends React.Component {
    state = {
        firstName: null,
        lastName: null,
        image: null,
        email: null,
        age: null,
    };

    firstNameHandler = (firstName) => {
        this.setState({
            firstName: firstName
        })
    }

    lastNameHandler = (lastName) => {
        this.setState({
            lastName: lastName
        })
    }

    emailHandler = (email) => {
        this.setState({
            email: email
        })
    }

    ageHandler = (age) => {
        this.setState({
            age: age
        })
    }

    addContactHandler = () => {
        if (this.state.firstName === null || this.state.lastName === null || this.state.image === null || this.state.email === null || this.state.age === null) {
            Alert.alert('Please fill all in the form!','Kao Jai Mai Kub ???',)
            return;
        }
        this.props.addContact({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            image: this.state.image,
            email: this.state.email,
            age: this.state.age
        })
        this.firstNameInput.clear();
        this.lastNameInput.clear();
        this.emailInput.clear();
        this.ageInput.clear();
        this.setState({
            image: null
        });
    }

    render() {
        let imageSource;
        if (this.state.image !== null) {
            imageSource = {uri: this.state.image};
        } else {
            imageSource = placeholder;
            }
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Add Contact</Text>
                <Image source={imageSource} style={styles.image}/>
                <Text style={styles.text}>Please fill your contact information</Text>
                <TextInput style={styles.input} placeholder="First Name" onChangeText={this.firstNameHandler} ref={input => { this.firstNameInput = input }}/>
                <TextInput style={styles.input} placeholder="Last Name" onChangeText={this.lastNameHandler} ref={input => { this.lastNameInput = input }} />
                <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={this.emailHandler} ref={input => { this.emailInput = input }} />
                <TextInput style={styles.input} placeholder="Age" keyboardType="number-pad" onChangeText={this.ageHandler} ref={input => { this.ageInput = input }} />
                <View style={styles.btnContainer}>
                    <Button 
                        title="Select Image"
                        style={styles.btn}
                        onPress={this._pickImage}
                    />
                    <Button 
                        title="Add Contact" 
                        style={styles.btn} 
                        onPress={this.addContactHandler}
                    />
                </View>
            </View>
        );
    }
    componentWillUnmount() {
        this.setState({
            firstName: null,
            lastName: null,
            image: null
        });
    };
    componentDidMount() {
        this.getPermissionAsync();
      }
    
    getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });
            if (!result.cancelled) {
            this.setState({ image: result.uri });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

}

const mapDispatchToProps = dispatch => {
    return {
        addContact: (contactData) => dispatch(ADD_CONTACT(contactData))
    }
}

export default connect(null, mapDispatchToProps)(FirstScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6A391',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 20,
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
    btn: {
        width: '80%',
        margin: 40,
        marginBottom: 60
    },
    input: {
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
        width: 150,
        height: 150,
    }
});
