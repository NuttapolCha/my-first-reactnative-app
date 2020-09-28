import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Contact(props) {
    let iconSize = 36;
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.image}}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{props.firstName} {props.lastName}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={props.showContactFunction}>
                    <Ionicons name="ios-document" size={iconSize} color="green" style={styles.iconStyle}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.deleteFunction}>
                    <Ionicons name="ios-trash" size={iconSize} color="crimson"style={styles.iconStyle}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'skyblue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        width: 350,
        margin: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        marginRight: 5,
        justifyContent: 'flex-end'
    },
    imageContainer: {
        flexDirection: 'row',
        marginLeft: 5,
        justifyContent: 'flex-start'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 5,
        width: 150,
    },
    iconStyle: {
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
        margin: 10,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',        
    },
});
