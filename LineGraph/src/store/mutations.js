//XXX: type 확인하도록 추가해주면 좋을듯 함
export default {
  SET_GAP(state) {
    state.gap.x =
      (state.canvasSize.width - (state.padding.left + state.padding.right)) /
      state.xLabels.length;
    state.gap.y =
      (state.canvasSize.height - (state.padding.top + state.padding.bottom)) /
      state.yLabels.length;
  },
  SET_CANVAS_SIZE(state, payload) {
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
  SET_X_LABELS(state, payload) {
    state.xLabels = payload;
  },
  SET_Y_LABELS(state, payload) {
    state.yLabels = payload;
  },
  SET_COLOR(state, payload) {
    state.color = payload;
  },
  SET_DATA(state, payload) {
    state.data = payload;
    if (Array.isArray(payload[0])) {
      state.datasetCount = payload.length;
    }
  },
  SET_MAX_DATA(state, payload) {
    state.maxData = payload;
  },
};
