
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite'; 

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
 
  componentDidMount() {
    const self = this;
    // read data from datebase
    db.transaction(tx => 
      {
        //tx.executeSql("select company, code, cost, exchange, qty from stocks where profileID = ?;", ['1'], (_, { rows }) => console.log(JSON.stringify(rows)));
        tx.executeSql("select company, code, cost, exchange, qty from stocks where profileID = ?;", ['1'], 
          function(tx,results){
            let dataset = results.rows.length;
            let temp = [];
            if(dataset>0){
              for(let i=0;i<dataset;i++){
                const rowData = [];
                rowData.push(results.rows.item(i).company);
                rowData.push(results.rows.item(i).code);
                rowData.push(results.rows.item(i).cost);
                rowData.push(results.rows.item(i).exchange);
                rowData.push(results.rows.item(i).qty);
                temp.push(rowData);   
                self.setState({data:temp});       
              }             
            }
          }
        );  
      },
      error => {console.log(error)}
    )
  }


  render() {
   //console.log(this.state.data);   
    return (
      <View style={styles.container}>
        
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={this.state.tableHead} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  this.state.data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      //widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        
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
