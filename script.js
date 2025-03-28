const selected = new Set();
const notifications = document.getElementById("notifications");
const simulateBtn = document.getElementById("simulateBtn");

const countryData = {
  DE: {
    name: "Germany",
    population: 14000000,
    cx: 540,
    cy: 230
  },
  CA: {
    name: "Canada",
    population: 1100000,
    cx: 200,
    cy: 140
  }
};

window.addEventListener("load", () => {
  const svgDoc = document.getElementById("svgMap").contentDocument;
  if (!svgDoc) return;

  Object.keys(countryData).forEach(id => {
    const el = svgDoc.getElementById(id);
    if (el) {
      el.style.fill = "#555";
      el.style.cursor = "pointer";

      el.addEventListener("click", () => {
        if (selected.has(id)) {
          el.style.fill = "#555";
          selected.delete(id);
        } else {
          el.style.fill = "#ffdd57";
          selected.add(id);
        }

        document.getElementById("simulationResult").textContent =
          "Selected: " + [...selected].map(k => countryData[k]?.name || k).join(", ");
      });
    }
  });
});

simulateBtn.addEventListener("click", () => {
  if (selected.size === 0) {
    notify("Please select at least one country to simulate.");
    return;
  }

  const svgDoc = document.getElementById("svgMap").contentDocument;
  if (!svgDoc) return;

  selected.forEach(id => {
    const country = countryData[id];
    if (!country) return;

    // Simulate population change
    let change = Math.floor(Math.random() * 2000000) - 1000000;
    if (id === "CA" && selected.has("DE")) change += 1500000;

    const newPop = Math.max(300000, country.population + change);
    country.population = newPop;

    drawPopCircle(svgDoc, country.cx, country.cy, newPop);
    notify(`${country.name}'s population: ${newPop.toLocaleString()}`);
  });
});

function drawPopCircle(svgDoc, x, y, population) {
  const existing = svgDoc.getElementById(`pop-${x}-${y}`);
  if (existing) existing.remove();

  const circle = svgDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 0);
  circle.setAttribute("fill", "rgba(0, 200, 255, 0.4)");
  circle.setAttribute("stroke", "cyan");
  circle.setAttribute("stroke-width", 1.5);
  circle.setAttribute("id", `pop-${x}-${y}`);
  svgDoc.documentElement.appendChild(circle);

  const radius = Math.sqrt(population / 100000); // adjust visual scale

  setTimeout(() => {
    circle.setAttribute("r", radius);
  }, 50);
}

function notify(message) {
  const div = document.createElement("div");
  div.className = "notification";
  div.textContent = message;
  notifications.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}
