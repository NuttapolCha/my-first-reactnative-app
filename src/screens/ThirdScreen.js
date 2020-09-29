import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import NumButton from '../components/NumButton'

export default class ThirdScreen extends Component {
    state = {
        display: '0',
        prevNumber: '0',
        currNumber: '0',
        operator: null,
        status: 'prevNumber'
    }
    row = (first,second,third,fourth) => (
        <View style={styles.rowConainer}>
            <NumButton label={first} touchFunction={() => this.onButtonPressHandler(first)} />
            <NumButton label={second} touchFunction={() => this.onButtonPressHandler(second)} />
            <NumButton label={third} touchFunction={() => this.onButtonPressHandler(third)} />
            <NumButton label={fourth} touchFunction={() => this.onButtonPressHandler(fourth)} />
            {/* <Button title={first} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(first)}/>
            <Button title={second} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(second)}/>
            <Button title={third} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(third)}/>
            <Button title={fourth} style={styles.btnStyle} onPress={() => this.onButtonPressHandler(fourth)}/> */}
        </View>
    )

    resetState = () => {
        this.setState({
            display: '0',
            prevNumber: '0',
            currNumber: '0',
            operator: null,
            status: 'prevNumber'
        })
    }

    onButtonPressHandler = (event) => {
        let numbers = '0123456789';
        let operators = '+-X/';
        if (numbers.indexOf(event) != -1) { //Number is press
            if (this.state.status === 'equalPress') {
                this.setState({
                    display: event,
                    prevNumber: event,
                    currNumber: '0',
                    operator: null,
                    status: 'prevNumber'
                })
            }
            if (this.state.status === 'prevNumber') {
                let temp = this.state.prevNumber
                if (temp == 0) {
                    this.setState({
                        display: event,
                        prevNumber: event,
                    })
                } else {
                    this.setState({
                        display: temp + event,
                        prevNumber: temp + event,
                    }) 
                }
            } else if (this.state.status === 'toCalculate') {
                let temp = this.state.currNumber
                if (temp == 0) {
                    this.setState({
                        display: event,
                        currNumber: event,
                    })
                } else {
                    this.setState({
                        display: temp + event,
                        currNumber: temp + event,
                    }) 
                }
            }
        } else if (operators.indexOf(event) != -1) { //Operator is press
            
            if (this.state.status === 'prevNumber') {
                this.setState({
                    operator: event,
                    status: 'toCalculate'
                })
            } else if (this.state.status === 'equalPress') {
                this.setState({
                    currNumber: '0',
                    operator: event,
                    status: 'toCalculate'
                })
            } else if (this.state.status === 'toCalculate') {
                this.setState({
                    display: this.calculateHandler(this.state.prevNumber,this.state.currNumber,this.state.operator),
                    prevNumber: this.calculateHandler(this.state.prevNumber,this.state.currNumber,this.state.operator),
                    currNumber: '0',
                    operator: event,
                })
            }
        } else if (event === '=') { //equal sign is press
            this.setState({
                display: this.calculateHandler(this.state.prevNumber,this.state.currNumber,this.state.operator),
                prevNumber: this.calculateHandler(this.state.prevNumber,this.state.currNumber,this.state.operator),
                // currNumber: '0',
                status: 'equalPress'
            })
            
        } else if (event === '<<') { //undo is press
            if (this.state.status === 'prevNumber') {
                if (this.state.prevNumber == 0) {
                    return;
                } 
                if (this.state.display.length === 1) {
                    this.setState({
                        display: '0',
                        prevNumber: '0'
                    })
                } else {
                    this.setState({
                        display: this.state.display.slice(0,-1),
                        prevNumber: this.state.prevNumber.slice(0,-1),
                    })
                }
            } else if (this.state.status === 'toCalculate') {
                if (this.state.currNumber == 0) {
                    return;
                } 
                if (this.state.display.length === 1) {
                    this.setState({
                        display: '0',
                        currNumber: '0'
                    })
                } else {
                    this.setState({
                        display: this.state.display.slice(0,-1),
                        currNumber: this.state.currNumber.slice(0,-1),
                    })
                }
            } else if (this.state.status === 'equalPress') return;

        } else if (event === 'C') { //clear is press
            this.resetState();
        } else {
            return;
        }
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
                {/* <Text>prevNumber: {this.state.prevNumber}</Text>
                <Text>Operator: {this.state.operator}</Text>
                <Text>currNumber: {this.state.currNumber}</Text>
                <Text>display: {this.state.display}</Text>
                <Text>Operator Count: {this.state.opCount}</Text>
                <Text>Status: {this.state.status}</Text> */}

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
        padding: 5,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginTop: 40,
        marginBottom: 0,
        backgroundColor: 'pink',
    },
    titleStyle: {
        fontSize: 36,
        fontWeight: 'bold',
    }
});