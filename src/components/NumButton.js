import React from 'react'
import { View, Text, StyleSheet,TouchableHighlight } from 'react-native'

export default function NumButton(props) {
    if (props.label !== '') {
        return (
            <TouchableHighlight onPress={props.touchFunction}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>{props.label}</Text>
                </View>
            </TouchableHighlight>
        )
    } else {
        return(
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 70,
        height: 70,
        backgroundColor: 'gold',
        borderRadius: 20,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 22,
        fontWeight: 'bold',
    }
})
