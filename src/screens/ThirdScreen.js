import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export default class ThirdScreen extends Component {
    state = {
        display: '0',
        prevNumber: null,
        currNumber: null,
        operator: null,
        memory: null,
        status: 'prevNumber'
    }
    row = (first,second,third,fourth) => (
        <View style={styles.rowConainer}>
            <Button title={first} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(first)}/>
            <Button title={second} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(second)}/>
            <Button title={third} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(third)}/>
            <Button title={fourth} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(fourth)}/>
        </View>
    )

    onButtonPressHandler = (event) => {
        let operatorCount = 0;
        if ('0123456789'.indexOf(event) != -1 && this.state.status === 'prevNumber') {
            //event is a number and assigning to prevNumber
            if (this.state.prevNumber === null) {
                this.setState({
                    prevNumber: event,
                    display: event
                });
            } else {
                this.setState({
                    prevNumber: this.state.prevNumber + event,
                    display: this.state.display + event,
                })
            }
        } else if (event === 'C') {
            //event is a clear
            this.setState({
                display: '0',
                prevNumber: null,
                currNumber: null,
                operator: null,
                memory: null,
                status: 'prevNumber'
            })
        } else if (event === '<<') {
            if (this.state.status === 'prevNumber') {
                if (this.state.display.length === 1) {
                    this.setState({
                        display: '0',
                        prevNumber: null,
                    })
                    return;
                }
                this.setState({
                    display: this.state.display.slice(0,-1),
                    prevNumber: this.state.prevNumber.slice(0,-1),
                })
            } else if (this.state.status === 'currNumber') {
                if (this.state.display.length === 1) {
                    this.setState({
                        display: '0',
                        currNumber: null,
                    })
                    return;
                }
                this.setState({
                    display: this.state.display.slice(0,-1),
                    currNumber: this.state.currNumber.slice(0,-1)
                })
            }
        } else if ('+-X/'.indexOf(event) != -1) {
            //event is a operator
            this.setState({
                operator: event,
                status: 'currNumber'
            })
            operatorCount += 1;
            if (operatorCount > 1) {
                this.setState({
                    display: this.calculateHandler(this.state.prevNumber,this.state.currNumber,this.state.operator),
                    prevNumber: this.calculateHandler(this.state.prevNumber,this.state.currNumber,this.state.operator)
                })
            }
        } else if ('0123456789'.indexOf(event) != -1 && this.state.status === 'currNumber') {
            //event is a number and assigning to currNumber
            if (this.state.currNumber === null) {
                this.setState({
                    currNumber: event,
                    display: event
                });
            } else {
                this.setState({
                    currNumber: this.state.currNumber + event,
                    display: this.state.display + event,
                })
            }
        } else if (event === '=') {
            this.setState({
                display: this.calculateHandler(this.state.prevNumber,this.state.currNumber,this.state.operator),
                prevNumber: null,
                currNumber: null,
                operator: null,
                status: 'prevNumber'
            });
                
        }
        console.log(this.state)
    }

    calculateHandler = (prevNumber,currNumber,operator) => {
        let result;
        switch (operator) {
            case '+':
                return Number(prevNumber) + Number(currNumber);
            case '-':
                return Number(prevNumber) - Number(currNumber);
            case 'X':
                return Number(prevNumber) * Number(currNumber);
            case '/':
                result = Number(prevNumber) / Number(currNumber);
                if (result == 'Infinity') {
                    result = 'E'
                }
                return result
            default:
                return;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.titleStyle}>Calculator</Text>
                </View>
                <View style={styles.displayContainer}>
                    <Text style={styles.titleStyle}>{this.state.display}</Text>
                </View>
                {this.row('X','/','C','<<')}
                {this.row('7','8','9','+')}
                {this.row('4','5','6','-')}
                {this.row('1','2','3','=')}
                {this.row('','0','','')}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
    },
    displayContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        margin: 20
    },
    rowConainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 2,
        borderColor: 'black',
        padding: 15,
        backgroundColor: 'yellow'
    },
    zeroContainer: {
        alignItems: 'center',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginTop: 40,
        marginBottom: 0,
        backgroundColor: 'pink',
    },
    btnStyle: {
        width: 40,
        height: 40,
        fontSize: 36,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        borderColor: 'black',
    },
    titleStyle: {
        fontSize: 36,
        fontWeight: 'bold',
    }
});