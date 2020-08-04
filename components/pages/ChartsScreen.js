
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-elements";
//import { ScrollView } from "react-native-gesture-handler";
import StockChart from "../Home/StockChart";

export default function ChartsScreen() {
  const [ibmData, setIBMData] = useState([]);
  const [teslaData, setTeslaData] = useState([]);
  const [microsoftData, setMicrosoftData] = useState([]);
  const [appleData, setAppleData] = useState([]);
  const initialLoading = async () => {
    try {
      const ibmRes = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/IBM/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );
      const teslaRes = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/TSLA/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );

      const microsoftRes = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/MSFT/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );
     
      const appleRes = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/MSFT/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );

      setIBMData(ibmRes.data);
      //console.log(ibmRes.data);
      setTeslaData(teslaRes.data);
      //console.log(teslaRes.data);
      setMicrosoftData(microsoftRes.data);
      //console.log(microsoftRes.data);
      setAppleData(appleRes.data);
      //console.log(microsoftRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialLoading();
  }, []);
  return (
    //<ScrollView>
      <View style={styles.container}>     
          <StockChart name="IBM" data={ibmData} />
          <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
          <StockChart name=" Tesla Inc" data={teslaData} />
          <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
          <StockChart name="Microsoft Corporation" data={microsoftData} />
{/*}      <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
          <StockChart name="Apple Inc." data={appleData} />
*/}
      </View>
    //</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    marginTop: 20,
  },
});

