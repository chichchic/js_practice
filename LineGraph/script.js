import Chart from "./src/main.js";

const section = document.createElement("section");
document.body.appendChild(section);
section.style.width = "1000px";
section.style.height = "700px";

try {
  new Chart(section, {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"], // 필수, 데이터 길이를 파악
      datasets: [
        {
          label: "First", // 없으면 공백
          backgroundColor: "rgba(255, 99, 132, 0.2)", // 없으면 투명
          borderColor: "rgba(255,99,132,1)", // 없으면 랜덤 색상
          data: [0, 0, -30, -25, 10, 0, 9], // 필수
          fill: false, // 없으면 false
        },
        {
          label: "Second",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          data: [-19, 2, -23, 0, 0, 0, -20],
          fill: false,
        },
        {
          label: "Third",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          data: [8, 5, -29, 3],
          fill: false,
        },
        {
          label: "Fourth",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: [6, -5, 1, 5, 7, 9, 11],
          fill: false,
        },
        {
          label: "Fifth",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          data: [-2, 5, 7, 9, 9],
          fill: false,
        },
        {
          label: "Sixth",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          data: [3, 1, 2, -6, 30, 5, 51],
          fill: false,
        },
      ],
    },
    options: {
      legend: {
        //TODO: 클릭시 보이고 안보이고 할 수 있도록 뱃지 만들면 좋을 듯 함. 따라서 div로 만드는게 효과적일것 같음
        // 변경시 전체 다시 렌더링
        display: false,
        position: "top",
      },
      responsive: true,
      title: {
        display: true, // 변경시 전체 다시 렌더링
        text: "Line Chart", // 변경시 title 값만 변경
      },
      tooltips: {
        // 변경시 event만 켜고 끄면 됨
        display: true, //기본 true
      },
      scales: {
        //변경시 그리드만 다시 렌더링
        xAxes: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
        yAxes: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      },
    },
  });
} catch (e) {
  console.error(e);
}
