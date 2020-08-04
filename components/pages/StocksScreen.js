
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite'; 
//import { useState } from "react";

const db = SQLite.openDatabase("SMRT_DB.db");

//export default function StockScreen() {
export default class StockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['company', 'code', 'cost', 'exchange', 'qty'],
      widthArr: [100, 80, 80, 80, 80],
      data: []
    }
  }
 
  render() {
    const state = this.state;
    const tempTemp = this;
    const tableData = [];
    //const [tableData, setTableData] = useState([]);
    //let tableHead = ['company', 'code', 'cost', 'exchange', 'qty'];
    //let widthArr = [100, 100, 100, 100, 100];
    //function callback(row) {
      //console.log(row);
     // tableData = row;
      //console.log(tableData);
     // return tableData;      
   // }
   
  // read data from datebase
  db.transaction(tx => 
    {
      //tx.executeSql("select company, code, cost, exchange, qty from stocks where profileID = ?;", ['1'], (_, { rows }) => console.log(JSON.stringify(rows)));
      tx.executeSql("select company, code, cost, exchange, qty from stocks where profileID = ?;", ['1'], 
        function(tx,results){
          let dataset = results.rows.length;
          let temp = [];
          //dataset = 2;
          if(dataset>0){
            for(let i=0;i<dataset;i++){
              const rowData = [];
              rowData.push(results.rows.item(i).company);
              rowData.push(results.rows.item(i).code);
              rowData.push(results.rows.item(i).cost);
              rowData.push(results.rows.item(i).exchange);
              rowData.push(results.rows.item(i).qty);
              temp.push(rowData);   
              tempTemp.setState({data:temp});
              //console.log(state.data);
              //console.log("----------------");
              //setTableData(temp);            
            }             
          }
          //console.log(tableData);
          //return callback(temp);
        }
      );  
    },
    error => {console.log(error)}
  )

   
  /*
    for (let i = 0; i < 10; i += 1) {
      const rowData = [];
      for (let j = 0; j < 5; j += 1) {
        rowData.push(`UBER`);
      }
      //console.log(rowData);
      //console.log("----------------");
      tableData.push(rowData);
      //console.log(tableData);
      //console.log("----------------");
    }
  */
   //console.log(state.data);
   //console.log(tableData);
   /*
   return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
        <Rows data={state.data} textStyle={styles.text}/>
      </Table>
    </View>
  )
    */

   
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  state.data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
    
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, margin: 0, padding: 0, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});













/*
import React, { Component } from "react";

import { StyleSheet, SafeAreaView } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";

import { useEffect, useState } from "react";
import axios from "axios";
const StocksScreen = () => {
  const [sectorData, setSectorData] = useState([]);
  const fetchSector = async () => {
    try {
      const sectorRes = await axios.get(
        `https://www.alphavantage.co/query?function=SECTOR&apikey=demo`
      );
      setSectorData(sectorRes.data[`Rank B: 1 Day Performance`]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSector();
  }, []);
  const name = "Market Change by (%)";
  const sectors = Object.keys(sectorData);
  //console.log(sectors);
  const performance = Object.values(sectorData).map((e) =>
    parseFloat(e).toFixed(2)
  );

  const option = {

    title: {
      text: "Market Change by (%)",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    
    xAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: { color: "white" },
        },
        axisTick: { show: false },
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: { show: false },
        axisLine: {
          lineStyle: { color: "white" },
        },
        splitLine: { show: false, color: "black" },
        data: sectors,
      },
    ],
    series: [
      {
        name: name,
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "inside",
          },
        },
        data: performance,
      },
    ],
  };
  return (
    <SafeAreaView style={styles.container}>
      <ECharts option={option} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginTop: 30,
  },  
});

export default StocksScreen;
*/




















/*
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StockItem from '../StockItem'

//reach in to the DB and grab all the stock data
// retrieve the records for that profile 
let stocks = [
    [ 'Microsoft', 'MSFT', '999.34', 'NYSE', '42' ],
    [ 'Google', 'GOOG', '99.99', 'NYSE', '4' ]
];

export default class StocksScreen extends Component {
    render() {
        return (
            <View>
                <StockItem props={ 'Microsoft', 'MSFT', '999.34', 'NYSE', '42' }></StockItem>
            </View>
        )
    } // render()
} // class
*/