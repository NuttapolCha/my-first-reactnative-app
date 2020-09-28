import * as React from 'react';
import { View, Text, Button, StyleSheet, Alert} from 'react-native';
import { connect } from 'react-redux';
import {CLEAR_CONTACT} from '../store/actions/actionTypes';
import ContactList from '../components/ContactList';

class SecondScreen extends React.Component {
    clearContactHandler = () => {
        Alert.alert('Clear All Contacts','Are you sure?',
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    } , { 
                    text: "OK", 
                    onPress: this.props.clearContact
                    }
                ],
              { cancelable: false })
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Contact List</Text>
                <ContactList />
                <Button style={styles.btn} title="Clear Contacts" onPress={this.clearContactHandler}/>
            </View>
        );
    }
}

const mapDispatchtoProps = (dispatch) => ({
    clearContact: () => dispatch(CLEAR_CONTACT())
});

export default connect(null,mapDispatchtoProps)(SecondScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6A391',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    listItem: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start'
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
        margin: 10,
        marginBottom: 10
    },
    input: {
        borderColor: 'black',
        width: '50%',
        padding: 10,
        margin: 10,
        borderRadius: 20
    }
});
