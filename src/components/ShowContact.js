import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

export default function ShowContact(props) {
    return (
        <View style={styles.container}>
                <Text style={styles.title}>Contact Infomation</Text>
                <Image source={{uri: props.image}} style={styles.image}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}>First Name: {props.firstName}</Text>
                <Text style={styles.text}>Last Name: {props.lastName}</Text>
                <Text style={styles.text}>Email: {props.email}</Text>
                <Text style={styles.text}>Age: {props.age}</Text>
            </View>
                <Button title="Close" onPress={props.toggleModalFunction}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6A391',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 16,
        margin: 20,
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
        width: 175,
        height: 175,
        borderRadius: 100,
    }
});