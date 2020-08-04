import React, { Component } from 'react';
import { View, ImageBackground, Image, 
    TextInput, Text, Button, StyleSheet, 
    Dimensions, TouchableOpacity } from 'react-native';

/*

    Stocks:
    ID    company    code     cost       exchange     qty      profileID
    1     Google     GOOG     999.99     NYSE         2300     1

*/

export default class StockItem extends Component {
    constructor(props) {
        super();
        this.state = {
            company: 'Microsoft',
            stockCode: props.stockCode,
            cost: props.cost,
            exchange: props.exchange,
            qty: props.qty
        }
    }
    render() {
        return (
            <View style={styles.lineItem}>
                <Text style={styles.item}>{this.state.company}</Text>
                <Text style={styles.item}>{this.state.stockCode}</Text>
                <Text style={styles.item}>{this.state.cost}</Text>
                <Text style={styles.item}>{this.state.exchange}</Text>
                <Text style={styles.item}>{this.state.qty}</Text>
            </View>
        )
    } // render()
} // class

const styles = StyleSheet.create({
    lineItem: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#333',
      padding: 7
    },
    item: {
        flexDirection: 'row'
    }
  });