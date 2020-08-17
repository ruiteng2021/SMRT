
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite'; 

const db = SQLite.openDatabase("SMRT_DB.db");

//export default function StockScreen() {
export default class StockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['company', 'code', 'cost', 'exchange', 'qty', ''],
      widthArr: [100, 80, 80, 80, 80],
      data: []
    }
  }
 
  componentDidMount() {
    console.log("componentDidMount");
    if (this.props.route.params){
      const { userName } = this.props.route.params;
      console.log("YYYYY"+ this.props.route.params + "YYYYY");
    }
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
                rowData.push(' ');
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

  _alertIndex(code,index) {
    let chart = this.props.navigation;
    //console.log(index + 1);
    //console.log(code);
    // send code to Charts screen
    chart.navigate('Charts', {data:code});    
  }

  componentWillUnmount(){console.log("componentWillUnmount");}

  render() {
    //console.log("render");   
    const element = (code, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(code, index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Graph</Text>
        </View>
      </TouchableOpacity>
    );

    let code = [];     
    if (this.props.route.params){
      return (
        <View style={styles.container}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row data={this.state.tableHead} style={styles.header} textStyle={styles.text}/>
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {
                this.state.data.map((rowData, index) => (
                  
                  <TableWrapper key={index} style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}>
                  {           
                    rowData.map(function(cellData, cellIndex) {                    
                      if (cellIndex === 1){
                        //console.log(cellData);
                        code.push(cellData);
                      }
                      return <Cell key={cellIndex} data={cellIndex === 5 ? element(code[index], index) : cellData} textStyle={styles.text}/>
                    })
                  }
                  </TableWrapper>
                ))
              }
            </Table>
          </ScrollView>
        </View>
      )

    }
    else{
      
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30}}>        
          <Text>
              Under Construction, please enter Username: test, and Password: test to see default page.
          </Text>
        </View>
      );
    }    
  }
}
 
//element(temp[index], index)
const styles = StyleSheet.create({
  container: { flex: 1, margin: 0, padding: 0, paddingTop: 20, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { flexDirection: 'row',height: 40, backgroundColor: '#E7E6E1' },
  btn: { justifyContent: 'center', alignItems: 'center',  width: '100%', height: '100%', backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { alignSelf: 'center', color: '#fff' }
});
