
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-elements";
//import { ScrollView } from "react-native-gesture-handler";
import StockChart from "../Home/StockChart";

let code = null;
let company = null;
export default function ChartsScreen({route}) {
    const [ibmData, setIBMData] = useState([]);
    const [stockNews, setStockNews] = useState([]);
    const [stockInfo, setStockInfo] = useState([]);
    const [stockData, setStockData] = useState([]);
  
    // check something from other page
    if (route.params){
        code = route.params;
        company = code.data;
    }       
    else
        company = "IBM";

    const initialLoading = async () => {
        try {
            const stockRes = await axios.get(
                `https://sandbox.iexapis.com/stable/stock/${company}/batch?types=quote,news,chart&range=6m&last=10&token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`        
            );

            //setStockInfo(stockRes.data.quote);
            //setStockNews(stockRes.data.news);
            setStockData(stockRes.data.chart);
        }
        catch (error) {
            console.log(error);
        }
    };

    initialLoading();      
    return (
        <View style={styles.container}>     
            <StockChart name={company.toUpperCase()} data={stockData} />
            <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
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

