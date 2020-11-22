//TODO: tooltip의 변수들을 공용으로 사용하도록 수정
//TODO: css를 통해 tooltip을 관리하도록 수정
//TODO: 근처의 점들은 한곳에서 관리하는 방법을 고려하면 좋을 듯 함 / 한곳에서 관리하기 보다는 점들 항목을 모두 받아온 후 툴팁을 보여주는게 훨씬 효율적일듯 함

export default class ToolTip {
  constructor(section, top, left, title, xDataset) {
    // xDataset: Array, {borderColor, innerColor, datasetName, value}
    this.section = section;
    this.toolTip = document.createElement("span");
    this.toolTip.style.backgroundColor = "#000000cc";
    this.toolTip.style.display = "inline-block";
    this.toolTip.style.top = top + "px";
    this.toolTip.style.left = left + "px";
    this.toolTip.style.position = "absolute";
    this.toolTip.style.padding = "10px";
    this.toolTip.style.color = "#ffffff";
    this.toolTip.style.zIndex = "999";
    const tooltipTitle = document.createElement("div");
    tooltipTitle.innerText = title;
    this.toolTip.appendChild(tooltipTitle);
    xDataset.forEach(({ borderColor, backgroundColor, label, value }) => {
      const xData = document.createElement("div");
      const colorBlock = document.createElement("span");
      colorBlock.style.display = "inline-block";
      colorBlock.style.width = "12px";
      colorBlock.style.height = "12px";
      colorBlock.style.backgroundColor = borderColor;
      xData.appendChild(colorBlock);
      const xDataName = document.createElement("span");
      xDataName.innerText = "  " + label + ": " + value;
      xData.appendChild(xDataName);
      this.toolTip.appendChild(xData);
    });
  }
  remove() {
    this.section.removeChild(this.toolTip);
  }
  render() {
    //TODO: x,y 값과 넓이에 맞게 상하좌우를 조절하도록 만들것
    this.section.appendChild(this.toolTip);
  }
}
