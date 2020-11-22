export default {
  padding: {
    top: 0, //title + padding
    right: 0, //padding
    bottom: 0, //xAxes + padding
    left: 0, //yAxes + padding
  },
  xGap: null,
  canvasSize: {
    width: null,
    height: null,
  },
  pixelRatio: null,
  labels: [],
  datasets: [],
  // xAxes: {
  //   display: true,
  //   scaleLabel: {
  //     display: false,
  //     labelString: "",
  //   },
  // },
  // yAxes: {
  //   display: true,
  //   scaleLabel: {
  //     display: false,
  //     labelString: "",
  //   },
  // },
  maxData: 0,
  minData: 0,
  unit: null,
  unitCount: null,
  hasNegative: null,
  dataLength: null,
  dotPoints: new Set(),
  dotDatas: {},
};
