
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-elements";
//import { ScrollView } from "react-native-gesture-handler";
import StockChart from "../Home/StockChart";

let code = null;
let temp = null;

export default function ChartsScreen({route}) {
  const [ibmData, setIBMData] = useState([]);
  const [teslaData, setTeslaData] = useState([]);
  const [microsoftData, setMicrosoftData] = useState([]);
  const [appleData, setAppleData] = useState([]);
  const [stockNews, setStockNews] = useState([]);
  const [stockInfo, setStockInfo] = useState([]);
  const [stockData, setStockData] = useState([]);

  
  // check something from other page
  //console.log(route.params);
  //console.log(code);
  if (route.params)
    code = route.params;

  let data0 =[
    {
        "date": "2020-05-08",
        "open": 124.24,
        "close": 124.22,
        "high": 127.59,
        "low": 125.45,
        "volume": 5087467,
        "uOpen": 127.65,
        "uClose": 126.04,
        "uHigh": 126.18,
        "uLow": 121.7,
        "uVolume": 5203487,
        "change": 0,
        "changePercent": 0,
        "label": "May 8, 20",
        "changeOverTime": 0
    },
    {
        "date": "2020-05-11",
        "open": 124.88,
        "close": 128.16,
        "high": 125.98,
        "low": 123.7,
        "volume": 3558246,
        "uOpen": 127.71,
        "uClose": 125.78,
        "uHigh": 126.7,
        "uLow": 125.03,
        "uVolume": 3598772,
        "change": -0.4,
        "changePercent": -0.3255,
        "label": "May 11, 20",
        "changeOverTime": -0.003323
    },
    {
        "date": "2020-05-12",
        "open": 128.23,
        "close": 121.63,
        "high": 129.37,
        "low": 122.9,
        "volume": 4842945,
        "uOpen": 127.02,
        "uClose": 124.71,
        "uHigh": 126.01,
        "uLow": 122.16,
        "uVolume": 4903439,
        "change": -2.44,
        "changePercent": -1.9385,
        "label": "May 12, 20",
        "changeOverTime": -0.022294
    },
    {
        "date": "2020-05-13",
        "open": 122.73,
        "close": 115.97,
        "high": 122.91,
        "low": 119.07,
        "volume": 6133695,
        "uOpen": 122.86,
        "uClose": 120.51,
        "uHigh": 125.43,
        "uLow": 117.26,
        "uVolume": 5961418,
        "change": -4.55,
        "changePercent": -3.8123,
        "label": "May 13, 20",
        "changeOverTime": -0.061016
    },
    {
        "date": "2020-05-14",
        "open": 117.45,
        "close": 118.4,
        "high": 119.21,
        "low": 112,
        "volume": 5363328,
        "uOpen": 114.65,
        "uClose": 121.41,
        "uHigh": 122.6,
        "uLow": 113.29,
        "uVolume": 5334996,
        "change": 1.24,
        "changePercent": 1.0632,
        "label": "May 14, 20",
        "changeOverTime": -0.051
    },
    {
        "date": "2020-05-15",
        "open": 117.63,
        "close": 119.38,
        "high": 120.46,
        "low": 119.51,
        "volume": 4901669,
        "uOpen": 118.89,
        "uClose": 119.6,
        "uHigh": 120.72,
        "uLow": 116.19,
        "uVolume": 4981744,
        "change": 0.03,
        "changePercent": 0.0261,
        "label": "May 15, 20",
        "changeOverTime": -0.050542
    },
    {
        "date": "2020-05-18",
        "open": 119.88,
        "close": 124.6,
        "high": 128.34,
        "low": 119.99,
        "volume": 4411935,
        "uOpen": 120.64,
        "uClose": 126.89,
        "uHigh": 123.59,
        "uLow": 120.87,
        "uVolume": 4317734,
        "change": 4.6,
        "changePercent": 4.1105,
        "label": "May 18, 20",
        "changeOverTime": -0.01172
    },
    {
        "date": "2020-05-19",
        "open": 121.57,
        "close": 124.04,
        "high": 125.09,
        "low": 126.11,
        "volume": 3342286,
        "uOpen": 124.61,
        "uClose": 123.23,
        "uHigh": 127.56,
        "uLow": 124.57,
        "uVolume": 3344648,
        "change": -1.31,
        "changePercent": -1.0489,
        "label": "May 19, 20",
        "changeOverTime": -0.022327
    },
    {
        "date": "2020-05-20",
        "open": 123.07,
        "close": 126.92,
        "high": 124.08,
        "low": 125.1,
        "volume": 3932190,
        "uOpen": 125.35,
        "uClose": 124.06,
        "uHigh": 126.25,
        "uLow": 125.8,
        "uVolume": 3976834,
        "change": 1.11,
        "changePercent": 0.9278,
        "label": "May 20, 20",
        "changeOverTime": -0.01324
    },
    {
        "date": "2020-05-21",
        "open": 121.26,
        "close": 122.5,
        "high": 126.67,
        "low": 119.3,
        "volume": 4177513,
        "uOpen": 126.79,
        "uClose": 123.83,
        "uHigh": 124.79,
        "uLow": 121.41,
        "uVolume": 4171088,
        "change": -2.35,
        "changePercent": -1.9371,
        "label": "May 21, 20",
        "changeOverTime": -0.032414
    },
    {
        "date": "2020-05-22",
        "open": 120.52,
        "close": 122.69,
        "high": 122.06,
        "low": 120.25,
        "volume": 4206077,
        "uOpen": 124.12,
        "uClose": 119.94,
        "uHigh": 119.64,
        "uLow": 121.6,
        "uVolume": 4271248,
        "change": -0.74,
        "changePercent": -0.6175,
        "label": "May 22, 20",
        "changeOverTime": -0.038654
    },
    {
        "date": "2020-05-26",
        "open": 125.7,
        "close": 122.14,
        "high": 125.22,
        "low": 124.91,
        "volume": 5579114,
        "uOpen": 126.2,
        "uClose": 126.27,
        "uHigh": 123.11,
        "uLow": 123.84,
        "uVolume": 5713349,
        "change": 3.48,
        "changePercent": 2.9008,
        "label": "May 26, 20",
        "changeOverTime": -0.010267
    },
    {
        "date": "2020-05-27",
        "open": 123.97,
        "close": 128.41,
        "high": 129.38,
        "low": 124.78,
        "volume": 5961146,
        "uOpen": 124.12,
        "uClose": 129.04,
        "uHigh": 130.05,
        "uLow": 128.76,
        "uVolume": 5882089,
        "change": 3.83,
        "changePercent": 3.2482,
        "label": "May 27, 20",
        "changeOverTime": 0.021106
    },
    {
        "date": "2020-05-28",
        "open": 126.97,
        "close": 130.52,
        "high": 132.62,
        "low": 128.53,
        "volume": 4041629,
        "uOpen": 130.01,
        "uClose": 127.52,
        "uHigh": 128.36,
        "uLow": 124.65,
        "uVolume": 4068348,
        "change": -1.01,
        "changePercent": -0.8096,
        "label": "May 28, 20",
        "changeOverTime": 0.012706
    },
    {
        "date": "2020-05-29",
        "open": 125.4,
        "close": 129.8,
        "high": 130.07,
        "low": 125.72,
        "volume": 8293369,
        "uOpen": 127.79,
        "uClose": 126.2,
        "uHigh": 125.59,
        "uLow": 125.17,
        "uVolume": 8192325,
        "change": 0.38,
        "changePercent": 0.303,
        "label": "May 29, 20",
        "changeOverTime": 0.01611
    },
    {
        "date": "2020-06-01",
        "open": 125.45,
        "close": 128.47,
        "high": 130.12,
        "low": 128.86,
        "volume": 2917063,
        "uOpen": 125.19,
        "uClose": 127.84,
        "uHigh": 131.05,
        "uLow": 127.4,
        "uVolume": 2936769,
        "change": -0.01,
        "changePercent": -0.008,
        "label": "Jun 1, 20",
        "changeOverTime": 0.01579
    },
    {
        "date": "2020-06-02",
        "open": 129.94,
        "close": 127,
        "high": 129,
        "low": 130.32,
        "volume": 3001990,
        "uOpen": 127.21,
        "uClose": 130,
        "uHigh": 129,
        "uLow": 125.48,
        "uVolume": 3008604,
        "change": 1.14,
        "changePercent": 0.9294,
        "label": "Jun 2, 20",
        "changeOverTime": 0.024533
    },
    {
        "date": "2020-06-03",
        "open": 130.4,
        "close": 132.39,
        "high": 135.7,
        "low": 130,
        "volume": 4082514,
        "uOpen": 132.36,
        "uClose": 130.1,
        "uHigh": 130.7,
        "uLow": 131,
        "uVolume": 3968437,
        "change": 3.09,
        "changePercent": 2.4801,
        "label": "Jun 3, 20",
        "changeOverTime": 0.049479
    },
    {
        "date": "2020-06-04",
        "open": 133.43,
        "close": 131.56,
        "high": 131.43,
        "low": 131.36,
        "volume": 3884513,
        "uOpen": 129.93,
        "uClose": 132.27,
        "uHigh": 134.74,
        "uLow": 129.91,
        "uVolume": 3921476,
        "change": -0.16,
        "changePercent": -0.13,
        "label": "Jun 4, 20",
        "changeOverTime": 0.048378
    },
    {
        "date": "2020-06-05",
        "open": 137.51,
        "close": 132.57,
        "high": 138.91,
        "low": 136.47,
        "volume": 6010360,
        "uOpen": 136.98,
        "uClose": 133.09,
        "uHigh": 137.65,
        "uLow": 132.84,
        "uVolume": 6130102,
        "change": 3.23,
        "changePercent": 2.4923,
        "label": "Jun 5, 20",
        "changeOverTime": 0.075066
    },
    {
        "date": "2020-06-08",
        "open": 136.02,
        "close": 136,
        "high": 139.93,
        "low": 135.76,
        "volume": 5497911,
        "uOpen": 136.02,
        "uClose": 139.23,
        "uHigh": 137.25,
        "uLow": 134.66,
        "uVolume": 5628968,
        "change": 3.84,
        "changePercent": 2.8406,
        "label": "Jun 8, 20",
        "changeOverTime": 0.108684
    },
    {
        "date": "2020-06-09",
        "open": 134.75,
        "close": 132.25,
        "high": 137.4,
        "low": 131.32,
        "volume": 5517362,
        "uOpen": 135.89,
        "uClose": 137.86,
        "uHigh": 133.7,
        "uLow": 135.92,
        "uVolume": 5653620,
        "change": -3.99,
        "changePercent": -2.8699,
        "label": "Jun 9, 20",
        "changeOverTime": 0.073383
    },
    {
        "date": "2020-06-10",
        "open": 134.61,
        "close": 135.98,
        "high": 134.71,
        "low": 135.7,
        "volume": 4903607,
        "uOpen": 137.28,
        "uClose": 130.73,
        "uHigh": 133.01,
        "uLow": 135.4,
        "uVolume": 4822601,
        "change": -2,
        "changePercent": -1.5481,
        "label": "Jun 10, 20",
        "changeOverTime": 0.05869
    },
    {
        "date": "2020-06-11",
        "open": 131.71,
        "close": 120.58,
        "high": 129.2,
        "low": 118.56,
        "volume": 12199139,
        "uOpen": 126.24,
        "uClose": 122.56,
        "uHigh": 131.6,
        "uLow": 119.68,
        "uVolume": 11909009,
        "change": -12.22,
        "changePercent": -9.4719,
        "label": "Jun 11, 20",
        "changeOverTime": -0.041596
    },
    {
        "date": "2020-06-12",
        "open": 127.06,
        "close": 124.09,
        "high": 124.58,
        "low": 122.48,
        "volume": 6449289,
        "uOpen": 124.16,
        "uClose": 124.32,
        "uHigh": 129.08,
        "uLow": 121.09,
        "uVolume": 6520461,
        "change": 4,
        "changePercent": 3.3533,
        "label": "Jun 12, 20",
        "changeOverTime": -0.008856
    },
    {
        "date": "2020-06-15",
        "open": 122.01,
        "close": 125.43,
        "high": 127.76,
        "low": 121.03,
        "volume": 5237065,
        "uOpen": 122.2,
        "uClose": 125.11,
        "uHigh": 126.34,
        "uLow": 120.86,
        "uVolume": 5332564,
        "change": -0.27,
        "changePercent": -0.2165,
        "label": "Jun 15, 20",
        "changeOverTime": -0.011124
    },
    {
        "date": "2020-06-16",
        "open": 128,
        "close": 129.54,
        "high": 133.2,
        "low": 125.19,
        "volume": 5858032,
        "uOpen": 126,
        "uClose": 125.49,
        "uHigh": 131.8,
        "uLow": 125.02,
        "uVolume": 5869851,
        "change": 3.6,
        "changePercent": 3.0081,
        "label": "Jun 16, 20",
        "changeOverTime": 0.018267
    },
    {
        "date": "2020-06-17",
        "open": 129.65,
        "close": 126.67,
        "high": 127.36,
        "low": 128.2,
        "volume": 3159973,
        "uOpen": 127.9,
        "uClose": 128.69,
        "uHigh": 128.9,
        "uLow": 129.4,
        "uVolume": 3199762,
        "change": -1,
        "changePercent": -0.804,
        "label": "Jun 17, 20",
        "changeOverTime": 0.009822
    },
    {
        "date": "2020-06-18",
        "open": 128,
        "close": 129.27,
        "high": 129,
        "low": 127.6,
        "volume": 2987436,
        "uOpen": 127,
        "uClose": 124.68,
        "uHigh": 127.4,
        "uLow": 126.19,
        "uVolume": 2988089,
        "change": 0.01,
        "changePercent": 0.0081,
        "label": "Jun 18, 20",
        "changeOverTime": 0.00998
    },
    {
        "date": "2020-06-19",
        "open": 127.45,
        "close": 126.77,
        "high": 127.89,
        "low": 125.39,
        "volume": 8485187,
        "uOpen": 126.48,
        "uClose": 128.33,
        "uHigh": 132,
        "uLow": 126.81,
        "uVolume": 8181697,
        "change": -1.72,
        "changePercent": -1.3698,
        "label": "Jun 19, 20",
        "changeOverTime": -0.004295
    },
    {
        "date": "2020-06-22",
        "open": 123.98,
        "close": 122.87,
        "high": 128,
        "low": 125.04,
        "volume": 4844359,
        "uOpen": 126.51,
        "uClose": 122.25,
        "uHigh": 124.3,
        "uLow": 125.01,
        "uVolume": 5003659,
        "change": -1.4,
        "changePercent": -1.1874,
        "label": "Jun 22, 20",
        "changeOverTime": -0.015762
    },
    {
        "date": "2020-06-23",
        "open": 125.14,
        "close": 121.98,
        "high": 123.5,
        "low": 121.65,
        "volume": 6698686,
        "uOpen": 124.22,
        "uClose": 122.64,
        "uHigh": 128.1,
        "uLow": 121.73,
        "uVolume": 6899221,
        "change": -1.67,
        "changePercent": -1.4197,
        "label": "Jun 23, 20",
        "changeOverTime": -0.029256
    },
    {
        "date": "2020-06-24",
        "open": 123.23,
        "close": 119.97,
        "high": 119.3,
        "low": 119.03,
        "volume": 7059579,
        "uOpen": 121.83,
        "uClose": 120.36,
        "uHigh": 121.91,
        "uLow": 120.15,
        "uVolume": 6978844,
        "change": -3.07,
        "changePercent": -2.568,
        "label": "Jun 24, 20",
        "changeOverTime": -0.053925
    },
    {
        "date": "2020-06-25",
        "open": 117.4,
        "close": 119.04,
        "high": 124.32,
        "low": 119.8,
        "volume": 6315704,
        "uOpen": 117.67,
        "uClose": 119.1,
        "uHigh": 120.02,
        "uLow": 116.9,
        "uVolume": 6343896,
        "change": 2.66,
        "changePercent": 2.2905,
        "label": "Jun 25, 20",
        "changeOverTime": -0.032555
    },
    {
        "date": "2020-06-26",
        "open": 118.46,
        "close": 120.39,
        "high": 122.73,
        "low": 119.87,
        "volume": 11099863,
        "uOpen": 120.25,
        "uClose": 118.9,
        "uHigh": 122.38,
        "uLow": 121.07,
        "uVolume": 11007013,
        "change": -1.84,
        "changePercent": -1.5854,
        "label": "Jun 26, 20",
        "changeOverTime": -0.047346
    },
    {
        "date": "2020-06-29",
        "open": 120.68,
        "close": 121.12,
        "high": 120.24,
        "low": 117.92,
        "volume": 4246990,
        "uOpen": 119.02,
        "uClose": 122.28,
        "uHigh": 124.89,
        "uLow": 123.22,
        "uVolume": 4307848,
        "change": 2.68,
        "changePercent": 2.259,
        "label": "Jun 29, 20",
        "changeOverTime": -0.026473
    },
    {
        "date": "2020-06-30",
        "open": 123,
        "close": 125.71,
        "high": 122.6,
        "low": 119,
        "volume": 3967997,
        "uOpen": 120.21,
        "uClose": 124.66,
        "uHigh": 123.9,
        "uLow": 121,
        "uVolume": 4030771,
        "change": 1.03,
        "changePercent": 0.8549,
        "label": "Jun 30, 20",
        "changeOverTime": -0.01868
    },
    {
        "date": "2020-07-01",
        "open": 122.24,
        "close": 119.77,
        "high": 122.14,
        "low": 119.73,
        "volume": 4772043,
        "uOpen": 123.17,
        "uClose": 122.99,
        "uHigh": 125.64,
        "uLow": 123.79,
        "uVolume": 4845140,
        "change": -2.29,
        "changePercent": -1.9092,
        "label": "Jul 1, 20",
        "changeOverTime": -0.036843
    },
    {
        "date": "2020-07-02",
        "open": 122.81,
        "close": 121,
        "high": 125.06,
        "low": 124.43,
        "volume": 3818191,
        "uOpen": 123.2,
        "uClose": 122.7,
        "uHigh": 124.04,
        "uLow": 119.42,
        "uVolume": 3900901,
        "change": 1.21,
        "changePercent": 0.9909,
        "label": "Jul 2, 20",
        "changeOverTime": -0.02752
    },
    {
        "date": "2020-07-06",
        "open": 122.81,
        "close": 124.32,
        "high": 125.6,
        "low": 123.53,
        "volume": 4213522,
        "uOpen": 124.82,
        "uClose": 124.39,
        "uHigh": 122.08,
        "uLow": 125.29,
        "uVolume": 4120635,
        "change": 0.51,
        "changePercent": 0.4247,
        "label": "Jul 6, 20",
        "changeOverTime": -0.023013
    },
    {
        "date": "2020-07-07",
        "open": 121,
        "close": 118.79,
        "high": 124.87,
        "low": 120.88,
        "volume": 4474225,
        "uOpen": 122,
        "uClose": 122.95,
        "uHigh": 123.39,
        "uLow": 121.89,
        "uVolume": 4347926,
        "change": -2.72,
        "changePercent": -2.2657,
        "label": "Jul 7, 20",
        "changeOverTime": -0.044121
    },
    {
        "date": "2020-07-08",
        "open": 123.73,
        "close": 121.27,
        "high": 120.89,
        "low": 121.88,
        "volume": 5199374,
        "uOpen": 123.71,
        "uClose": 119.83,
        "uHigh": 122.37,
        "uLow": 120.61,
        "uVolume": 5322777,
        "change": 0.13,
        "changePercent": 0.1148,
        "label": "Jul 8, 20",
        "changeOverTime": -0.04296
    },
    {
        "date": "2020-07-09",
        "open": 120,
        "close": 121.34,
        "high": 124,
        "low": 116.9,
        "volume": 4990441,
        "uOpen": 118,
        "uClose": 117.75,
        "uHigh": 122,
        "uLow": 118.6,
        "uVolume": 4957978,
        "change": -2,
        "changePercent": -1.7331,
        "label": "Jul 9, 20",
        "changeOverTime": -0.059895
    },
    {
        "date": "2020-07-10",
        "open": 116.3,
        "close": 121.85,
        "high": 122.66,
        "low": 115.39,
        "volume": 4485483,
        "uOpen": 118.2,
        "uClose": 123.81,
        "uHigh": 124.02,
        "uLow": 115.62,
        "uVolume": 4358289,
        "change": 2.76,
        "changePercent": 2.3452,
        "label": "Jul 10, 20",
        "changeOverTime": -0.038971
    },
    {
        "date": "2020-07-13",
        "open": 123.71,
        "close": 120.2,
        "high": 122.15,
        "low": 122.5,
        "volume": 4822584,
        "uOpen": 122.27,
        "uClose": 120,
        "uHigh": 122.9,
        "uLow": 124.24,
        "uVolume": 4837855,
        "change": 0.87,
        "changePercent": 0.7478,
        "label": "Jul 13, 20",
        "changeOverTime": -0.031956
    },
    {
        "date": "2020-07-14",
        "open": 122.15,
        "close": 122.2,
        "high": 126.59,
        "low": 123.75,
        "volume": 4702259,
        "uOpen": 121.82,
        "uClose": 122,
        "uHigh": 120.96,
        "uLow": 121.86,
        "uVolume": 4583134,
        "change": 1.4,
        "changePercent": 1.211,
        "label": "Jul 14, 20",
        "changeOverTime": -0.019794
    },
    {
        "date": "2020-07-15",
        "open": 123.2,
        "close": 126,
        "high": 124.84,
        "low": 127.34,
        "volume": 4592890,
        "uOpen": 123.3,
        "uClose": 128,
        "uHigh": 124.16,
        "uLow": 124.65,
        "uVolume": 4666591,
        "change": 2.5,
        "changePercent": 1.99,
        "label": "Jul 15, 20",
        "changeOverTime": 0.000082
    },
    {
        "date": "2020-07-16",
        "open": 122.87,
        "close": 125.2,
        "high": 129.2,
        "low": 127.74,
        "volume": 4513025,
        "uOpen": 126.8,
        "uClose": 129.78,
        "uHigh": 130.09,
        "uLow": 124.66,
        "uVolume": 4452802,
        "change": 1.01,
        "changePercent": 0.8357,
        "label": "Jul 16, 20",
        "changeOverTime": 0.008422
    },
    {
        "date": "2020-07-17",
        "open": 128.45,
        "close": 126.88,
        "high": 130.78,
        "low": 126.8,
        "volume": 4174894,
        "uOpen": 125.06,
        "uClose": 130.82,
        "uHigh": 131.68,
        "uLow": 123.5,
        "uVolume": 3997823,
        "change": 1.2,
        "changePercent": 0.89,
        "label": "Jul 17, 20",
        "changeOverTime": 0.017903
    },
    {
        "date": "2020-07-20",
        "open": 127.49,
        "close": 131.03,
        "high": 131.97,
        "low": 125.57,
        "volume": 10220132,
        "uOpen": 131.65,
        "uClose": 130.63,
        "uHigh": 132.24,
        "uLow": 125.37,
        "uVolume": 10104138,
        "change": 1.29,
        "changePercent": 1.0468,
        "label": "Jul 20, 20",
        "changeOverTime": 0.027819
    },
    {
        "date": "2020-07-21",
        "open": 131.5,
        "close": 129.28,
        "high": 137.55,
        "low": 128.4,
        "volume": 15507729,
        "uOpen": 131.32,
        "uClose": 130.04,
        "uHigh": 136.75,
        "uLow": 126.3,
        "uVolume": 15689975,
        "change": -0.31,
        "changePercent": -0.2486,
        "label": "Jul 21, 20",
        "changeOverTime": 0.025775
    },
    {
        "date": "2020-07-22",
        "open": 128.2,
        "close": 131.61,
        "high": 135.03,
        "low": 128.6,
        "volume": 8312016,
        "uOpen": 126.3,
        "uClose": 129.35,
        "uHigh": 133.04,
        "uLow": 131.8,
        "uVolume": 8436443,
        "change": 2.63,
        "changePercent": 2.0805,
        "label": "Jul 22, 20",
        "changeOverTime": 0.047637
    },
    {
        "date": "2020-07-23",
        "open": 133.6,
        "close": 129.74,
        "high": 130.27,
        "low": 127.88,
        "volume": 4339447,
        "uOpen": 133.7,
        "uClose": 130.07,
        "uHigh": 132.52,
        "uLow": 131.57,
        "uVolume": 4379242,
        "change": -1.41,
        "changePercent": -1.046,
        "label": "Jul 23, 20",
        "changeOverTime": 0.035681
    },
    {
        "date": "2020-07-24",
        "open": 129.14,
        "close": 129.68,
        "high": 128.9,
        "low": 128.3,
        "volume": 3659669,
        "uOpen": 131.51,
        "uClose": 130.88,
        "uHigh": 127.71,
        "uLow": 127.4,
        "uVolume": 3620573,
        "change": -1.57,
        "changePercent": -1.2106,
        "label": "Jul 24, 20",
        "changeOverTime": 0.023481
    },
    {
        "date": "2020-07-27",
        "open": 125.71,
        "close": 127.05,
        "high": 131.37,
        "low": 127.38,
        "volume": 3875135,
        "uOpen": 125.43,
        "uClose": 128.91,
        "uHigh": 128.89,
        "uLow": 128.65,
        "uVolume": 3883070,
        "change": 0.42,
        "changePercent": 0.346,
        "label": "Jul 27, 20",
        "changeOverTime": 0.026579
    },
    {
        "date": "2020-07-28",
        "open": 126.48,
        "close": 128.04,
        "high": 129.84,
        "low": 124.88,
        "volume": 4208308,
        "uOpen": 126.65,
        "uClose": 129.2,
        "uHigh": 129.24,
        "uLow": 130.05,
        "uVolume": 4277315,
        "change": -1.79,
        "changePercent": -1.3876,
        "label": "Jul 28, 20",
        "changeOverTime": 0.012099
    },
    {
        "date": "2020-07-29",
        "open": 126.24,
        "close": 128.63,
        "high": 126.14,
        "low": 128.35,
        "volume": 2931249,
        "uOpen": 126.03,
        "uClose": 128.27,
        "uHigh": 131.14,
        "uLow": 125.85,
        "uVolume": 2850327,
        "change": 0.89,
        "changePercent": 0.6898,
        "label": "Jul 29, 20",
        "changeOverTime": 0.019779
    },
    {
        "date": "2020-07-30",
        "open": 129.6,
        "close": 127.2,
        "high": 124.65,
        "low": 124.44,
        "volume": 4146156,
        "uOpen": 129.34,
        "uClose": 124.3,
        "uHigh": 124,
        "uLow": 122.73,
        "uVolume": 4096193,
        "change": -2.45,
        "changePercent": -1.9463,
        "label": "Jul 30, 20",
        "changeOverTime": -0.000746
    },
    {
        "date": "2020-07-31",
        "open": 127.73,
        "close": 127.3,
        "high": 125.28,
        "low": 125.07,
        "volume": 5522439,
        "uOpen": 125.16,
        "uClose": 125.67,
        "uHigh": 124.51,
        "uLow": 122.28,
        "uVolume": 5373165,
        "change": 0.04,
        "changePercent": 0.034,
        "label": "Jul 31, 20",
        "changeOverTime": -0.000417
    },
    {
        "date": "2020-08-03",
        "open": 127.7,
        "close": 124.69,
        "high": 128.29,
        "low": 123.46,
        "volume": 3533034,
        "uOpen": 128.8,
        "uClose": 129.33,
        "uHigh": 126.67,
        "uLow": 127.13,
        "uVolume": 3628350,
        "change": 1.39,
        "changePercent": 1.1387,
        "label": "Aug 3, 20",
        "changeOverTime": 0.010813
    },
    {
        "date": "2020-08-04",
        "open": 124.93,
        "close": 128.89,
        "high": 127.83,
        "low": 123.94,
        "volume": 3498900,
        "uOpen": 128.59,
        "uClose": 128.51,
        "uHigh": 126.78,
        "uLow": 126.18,
        "uVolume": 3556663,
        "change": 1.54,
        "changePercent": 1.2854,
        "label": "Aug 4, 20",
        "changeOverTime": 0.02393
    },
    {
        "date": "2020-08-05",
        "open": 129.87,
        "close": 127.23,
        "high": 132.46,
        "low": 127.7,
        "volume": 3701350,
        "uOpen": 132.3,
        "uClose": 127.26,
        "uHigh": 127.92,
        "uLow": 128.15,
        "uVolume": 3857855,
        "change": -0.4,
        "changePercent": -0.3158,
        "label": "Aug 5, 20",
        "changeOverTime": 0.020935
    },
    {
        "date": "2020-08-06",
        "open": 125,
        "close": 129.98,
        "high": 129.58,
        "low": 131,
        "volume": 3462710,
        "uOpen": 126,
        "uClose": 127.42,
        "uHigh": 128.33,
        "uLow": 127,
        "uVolume": 3567110,
        "change": 0.7,
        "changePercent": 0.5481,
        "label": "Aug 6, 20",
        "changeOverTime": 0.02661
    },
    {
        "date": "2020-08-07",
        "open": 128.9,
        "close": 125.53,
        "high": 127.9,
        "low": 124.36,
        "volume": 3705589,
        "uOpen": 128.9,
        "uClose": 125.83,
        "uHigh": 127.89,
        "uLow": 124.35,
        "uVolume": 3819911,
        "change": -1.21,
        "changePercent": -0.9249,
        "label": "Aug 7, 20",
        "changeOverTime": 0.016196
    }
  ]
  // receive data from Stocks
  //let code = route.params;
  //console.log(code.data);
  const initialLoading = async () => {
    try {

      if (code != null){
        console.log("XXXXX", code.data, "XXXXX");
        const stockRes = await axios.get(
          `https://sandbox.iexapis.com/stable/stock/${code.data}/batch?types=quote,news,chart&range=6m&last=10&token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`        
        );

        //setStockInfo(stockRes.data.quote);
        //setStockNews(stockRes.data.news);
        setStockData(stockRes.data.chart);
      }
      else{

        /*
        const ibmRes = await axios.get(
          `https://cloud.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=1m&last=10&token=pk_3965c1c84956414c9027755dc0047d5f`
          `https://sandbox.iexapis.com/stable/stock/IBM/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`        
        );
        const teslaRes = await axios.get(
          `https://sandbox.iexapis.com/stable/stock/TSLA/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
        );

        const microsoftRes = await axios.get(
          `https://sandbox.iexapis.com/stable/stock/MSFT/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
        );
      
        const appleRes = await axios.get(
          `https://sandbox.iexapis.com/stable/stock/MSFT/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
          //`https://sandbox.iexapis.com/stable/stock/IBM/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
          //`https://cloud.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=1m&last=10&token=pk_3965c1c84956414c9027755dc0047d5f`
        );
        */
        //setIBMData(ibmRes.data);
        setIBMData(data0);
        setTeslaData(data0);
        setMicrosoftData(data0);
        //console.log(ibmRes.data);
        //setTeslaData(teslaRes.data);
        //console.log(teslaRes.data);
        //setMicrosoftData(microsoftRes.data);
        //console.log(microsoftRes.data);
        //setAppleData(appleRes.data);
      
        //console.log(appleRes.data.quote);
        //console.log(appleRes.data.quote['close']);
        //console.log(appleRes.data['quote']);
        //console.log(Object.keys(appleRes.data['quote']));
        //console.log(Object.values(appleRes.data['quote']));
        //console.log(appleRes.data.Object);
        //console.log("here");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect(() => {
    //console.log("code.data: ", code.data.toUpperCase());
    console.log("temp: ", temp);
    console.log("code: ", code);
    if((code != null) && (temp != code)) {
        temp = code;
        initialLoading();       
        console.log("code.data: ", code.data.toUpperCase());
        //console.log("temp: ", temp);
        //code = null;
    }    
  //}, []);

  //console.log(code.data.toUpperCase());

  if(code != null){
    console.log("YYYYY", code.data.toUpperCase(), "YYYYY");
    return (
          <View style={styles.container}>     
              <StockChart name={code.data.toUpperCase()} data={stockData} />
              <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
          </View>
      );
  }
  else{
    return (
        //<ScrollView>
          <View style={styles.container}>     
              <StockChart name="IBM" data={ibmData} />
              <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
              <StockChart name=" Tesla Inc" data={teslaData} />
              <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
              <StockChart name="Microsoft Corporation" data={microsoftData} />
    {/*         <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
              <StockChart name="Apple Inc." data={appleData} />
    */}
          </View>
        //</ScrollView>
      );
  } 
}

const styles = StyleSheet.create({
  container: { flex: 1,  margin: 0, padding: 0, paddingTop: 20 },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    marginTop: 20,
  },
});

