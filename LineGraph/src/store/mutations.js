//XXX: type 확인하도록 추가해주면 좋을듯 함
function makeRandomColor() {
  return `${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }`;
}

export default {
  SET_PADDING(state, { top = 0, right = 0, bottom = 0, left = 0 }) {
    Object.assign(state.padding, { top, right, bottom, left });
  },
  ADD_PADDING(state, { top = 0, right = 0, bottom = 0, left = 0 }) {
    state.padding.top += top;
    state.padding.right += right;
    state.padding.bottom += bottom;
    state.padding.left += left;
  },
  SET_CANVAS_SIZE(state, payload) {
    //변경시 그래프 전체 다시그려야함
    if (payload.hasOwnProperty("width")) {
      state.canvasSize.width = payload.width;
    }
    if (payload.hasOwnProperty("height")) {
      state.canvasSize.height = payload.height;
    }
  },
  SET_PIXEL_RATIO(state, payload) {
    state.pixelRatio = payload;
  },
  SET_LABELS(state, payload) {
    //변경시 그래프 전체 다시그려야함
    state.labels = payload;
    state.dataLength = payload.length;
    state.xGap =
      (state.canvasSize.width - (state.padding.left + state.padding.right)) /
      payload.length;
  },
  SET_DATASETS(state, payload) {
    //변경시 변경 내용만 적용하면 됨
    //TODO: 데이터 변경시 변경된 사항만 적용시킬 수 있도록 해야 함
    //TODO: 데이터 값을 변경시킬 수 있는 API 만들기
    payload.forEach((data, index) => {
      console.log(data);
      if (!data.hasOwnProperty("data")) {
        throw "datasets val must have data property";
      }
      if (!data.hasOwnProperty("label")) {
        data[label] = "";
      }
      if (!data.hasOwnProperty("backgroundColor")) {
        data[backgroundColor] = "transparent";
      }
      if (!data.hasOwnProperty("borderColor")) {
        data[borderColor] = `rgb(${makeRandomColor()}, 1)`;
      }
      if (!data.hasOwnProperty("fill")) {
        data[fill] = false;
      }
      state.datasets.push(data);
    });
  },
  SET_MAX_DATA(state, payload) {
    //변경시 그래프 전체 다시그려야함
    state.maxData = payload;
  },
  SET_MIN_DATA(state, payload) {
    //변경시 그래프 전체 다시그려야함
    state.minData = payload;
    state.hasNegative = payload < 0 ? true : false;
  },
  SET_UNIT(state, { unit, maxAbsData }) {
    state.unit = unit;
    state.unitCount =
      maxAbsData % unit === 0
        ? maxAbsData / unit
        : unit * (Math.floor(maxAbsData / unit) + 1);
  },
  ADD_DOT_POINTS_DATA(state, { x, y, title, lineNumber, zIndex, xDataset }) {
    const key = x.toFixed(5) + y.toFixed(5);
    if (!state.dotPoints.has(key)) {
      state.dotPoints.add(key);
      state.dotDatas[key] = {
        title: title,
        primeLineNumber: lineNumber,
        primeLineZIndex: zIndex,
        xDataset: [xDataset],
      };
    } else {
      if (state.dotDatas[key].primeLineZIndex < zIndex) {
        state.dotDatas[key].primeLineZIndex = zIndex;
        state.dotDatas[key].primeLineNumber = lineNumber;
        state.dotDatas[key].xDataset.unshift(xDataset);
      } else {
        state.dotDatas[key].xDataset.push(xDataset);
      }
    }
  },
};
