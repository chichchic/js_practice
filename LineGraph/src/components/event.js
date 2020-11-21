import store from "../store/index.js";
import { pointCircle } from "../utils/common.js";
import ToolTip from "../components/tooltip.js";

//tooltip의 변수들을 공용으로 사용하도록 수정
export function dotHover(section, r) {
  let x;
  let y;
  let key = null;
  let findDot = false;
  let tooltip = null;
  section.addEventListener("mousemove", (e) => {
    [...store.state.dotPoints].some((element) => {
      const divisionPoint = element.indexOf(".") + 6;
      x = element.substr(0, divisionPoint);
      y = element.substr(divisionPoint);
      if (pointCircle(e.clientX, e.clientY, x, y, r)) {
        key = element;
        findDot = true;
        return true;
      } else {
        findDot = false;
        return false;
      }
    });
    if (findDot && !tooltip) {
      tooltip = new ToolTip(
        section,
        y,
        x,
        store.state.dotDatas[key].title,
        store.state.dotDatas[key].xDataset
      );
      tooltip.render();
      this.renderMouseOn(store.state.dotDatas[key].primeLineNumber);
    } else if (!findDot && tooltip) {
      tooltip.remove();
      tooltip = null;
      this.render();
    }
  });
}
