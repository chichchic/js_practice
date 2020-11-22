import store from "../store/index.js";
import { pointCircle } from "../utils/common.js";
import ToolTip from "../components/tooltip.js";

//TODO: 점과 선에 올렸을 때 선을 강조시켜주는 작업하기 -> 점만 가능하게 만들어보고 선까지 할 수 있도록 만들기
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
