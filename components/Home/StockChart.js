import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";

export default class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: false
    }
  }

  onRef = ref => {
    if (ref) {
      this.chart = ref;
      console.log(this.chart.getOption());
    }
  };    

  initChart = () => {
    function calculateMA(dayCount, dataClose) {
      let result = [];
      //console.log(dataClose.length);
      for (let i = 0, len = dataClose.length; i < len; i++) {
          if (i < dayCount) {
              result.push('-');
              continue;
          }
          let sum = 0;
          for (let j = 0; j < dayCount; j++) {
              sum += dataClose[i - j];
          }
          //console.log(sum);
          result.push(sum / dayCount);
      }
      
      return result;
    }

    //let stockData = data.slice(-30);
    let data = this.props.data;
    let name = this.props.name;
    let stockData = this.props.data;


    let dates = [];
    let values = [];

    let dataLow = [];
    let dataHigh = [];
    let dataClose = [];

    //console.log(data);
    //console.log(stockData);

    for(let i=0; i < data.length; i++)
    {
      dataHigh.push(data[i].high);
      dataLow.push(data[i].low);
      dataClose.push(data[i].close);
    }

    if (data) {
      stockData.map((data) => dates.push(data["date"]));
      //console.log(dates);

      stockData.map((item) =>    
        values.push([item["open"], item["close"], item["low"], item["high"]])
      );
      //console.log(values);
    }

    const option = {
      
      title: {
        text: name,
      },

      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          lineStyle: {
            color: "#376df4",
            width: 1,
            opacity: 1,
          },
        },
      },   

      legend: {
          top: 30,
          data: ['Daily', 'MA5', 'MA10', 'MA20']
      },

      grid: {
        left: '15%',
        right: '10%',
        bottom: '15%'
      },

      xAxis: {
        type: "category",
        data: dates,
        //axisLine: { lineStyle: { color: "white" } },
        scale: true,
      },
      yAxis: [
        {
          type: "value",
          min: Math.min(...dataLow),
          max: Math.max(...dataHigh),
          //axisLine: {lineStyle: { color: "white" } },
        },
        {
          scale: false,
          splitLine: { show: false },
        },      
      ],

      dataZoom: [
          {
              type: 'inside',
              start: 50,
              end: 100
          },
          {
              show: true,
              type: 'slider',
              top: '90%',
              start: 50,
              end: 100
          }
      ],

      series: [
        
        {
          type: "candlestick",
          name: "Daily",
          data: values,
          itemStyle: {
            normal: {
              color: "#CF0101",
              color0: "#16C4E8",
              borderColor: "#CF0101",
              borderColor0: "#16C4E8",
            },
          },
        },

        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5, dataClose),
          smooth: true,
          lineStyle: {
              opacity: 0.5,
              //color: "#CF0101",
          }
        },

        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10, dataClose),
          smooth: true,
          lineStyle: {
              opacity: 0.5,
              //color: "#8F3A84",
          }
        },

        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20, dataClose),
          smooth: true,
          lineStyle: {
              opacity: 0.5
          }
        },
      ]
    };

    this.chart.setOption(option);
    this.chart.getOption(option => {});
  }

  render() {    
    return (
      <View style={styles.chartContainer}>
        <Button title="Update Chart" onPress={this.initChart} />
        <ECharts
          option={{}}
          ref={this.onRef}
          height={170}
          width={340}
          //backgroundColor="black"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1
  }
});

