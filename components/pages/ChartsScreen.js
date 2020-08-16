
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-elements";
//import { ScrollView } from "react-native-gesture-handler";
import StockChart from "../Home/StockChart";


export default function ChartsScreen({route}) {
    //const [stockNews, setStockNews] = useState([]);
    const [stockInfo, setStockInfo] = useState([]);
    const [stockData, setStockData] = useState([]);

    let company = "AAPL";
      // check something from other page
      if (route.params){
        let code = route.params;
        company = code.data;
    }

    const initialLoading = async () => {
        try {
            const stockRes = await axios.get(
                //`https://cloud.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=6m&last=10&token=pk_b035331efd5e430a9287e5e92742b180`
                `https://sandbox.iexapis.com/stable/stock/${company}/batch?types=quote,news,chart&range=6m&last=10&token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
                //`https://sandbox.iexapis.com/stable/stock/${company}/batch?types=quote,news,chart&range=6m&last=10&token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`        
            );

            setStockInfo(stockRes.data.quote);
            //console.log(stockRes.data.quote);
            setStockData(stockRes.data.chart);
            console.log("XXXXXXX");
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //setInterval(() => {
            initialLoading();    
        //}, 4000);  
    }, [route]);

    return (
        <View style={styles.container}>     
            <StockChart name={company.toUpperCase()} data={stockData} info={stockInfo}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1,  margin: 0, padding: 0, paddingTop: 20 },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    marginTop: 20,
  },
});

