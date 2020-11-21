import Chart from "./src/main.js";

const section = document.createElement("section");
document.body.appendChild(section);
section.style.width = "1000px";
section.style.height = "700px";
try {
  new Chart(section, {
    data: {
      datasets: [
        [3, 5, 3],
        [19, 2, 23],
        [0, 9, 8],
      ],
    },
    options: {
      title: "My Line Graph",
      color: ["#ff0000", "#00ff00", "#0000ff"],
    },
  });
} catch (e) {
  console.error(e);
}
