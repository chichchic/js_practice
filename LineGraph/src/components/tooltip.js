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
    const tooltipTitle = document.createElement("div");
    tooltipTitle.innerText = title;
    this.toolTip.appendChild(tooltipTitle);
    xDataset.forEach(({ borderColor, innerColor, datasetName, value }) => {
      const xData = document.createElement("div");
      const colorBlock = document.createElement("span");
      colorBlock.style.display = "inline-block";
      colorBlock.style.width = "15px";
      colorBlock.style.height = "15px";
      colorBlock.style.border = `1px solid ${borderColor}`;
      colorBlock.style.backgroundColor = `${innerColor}`;
      xData.appendChild(colorBlock);
      const xDataName = document.createElement("span");
      xDataName.innerText = datasetName + ": " + value;
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
