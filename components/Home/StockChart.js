import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";

const StockChart = ({ data, name }) => {

  let stockData = data.slice(-30);

  let dates = [];
  let values = [];

  //console.log(data);
  //console.log(name);

  if (data) {
    stockData.map((data) => dates.push(data["date"]));
    //console.log(dates);
  
    stockData.map((item) =>    
      values.push([item["open"], item["close"], item["low"], item["high"]])
    );
    console.log(values);
  }

  const option = {

    title: {
      show: true,
      text: name,
      
      textStyle: {
        fontSize: 15,
        align: "center",
        lineHeight: 40,
        left: "40%",
      },      
    },

    tooltip: {
      trigger: "none",
      axisPointer: {
        animation: false,
        type: "cross",
        lineStyle: {
          color: "#376df4",
          width: 2,
          opacity: 1,
        },
      },
    },

    toolbox: {
      orient: "vertical",
      show: true,
      showTitle: true,
    },

    xAxis: {
      type: "category",
      data: dates,
      xisLine: { lineStyle: { color: "white" } },
      scale: true,
    },
    yAxis: [
      {
        type: "value"
      },
      {
        scale: true,
        axisLine: {
          lineStyle: { color: "white" },
        },
        splitLine: { show: false },
      },      
    ],

    grid: [
      {
        top: 40,
        bottom: 40,
        left: 50,
      },
    ],
    color: ["rgb(249,159,94)", "rgb(67,205,126)"],
    animation: true,

    series: [
      {
        type: "candlestick",
        name: "Daily",
        data: values,
        itemStyle: {
          normal: {
            color: "#FD1050",
            color0: "#0CF49B",
            borderColor: "#FD1050",
            borderColor0: "#0CF49B",
          },
        },
      },
    ]
  };

    return (
      <View style={styles.chartContainer}>
        <ECharts
          option={option}
          height={170}
          width={340}
          backgroundColor="rgba(93, 169, 81, 0.3)"
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1
  }
});

export default StockChart;
