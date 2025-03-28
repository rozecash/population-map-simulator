const countries = document.querySelectorAll(".country");
const map = document.getElementById("worldMap");
const result = document.getElementById("simulationResult");
const notifications = document.getElementById("notifications");

// Real historical data (approximate, 1840s)
const countryData = {
  germany: {
    population: 14000000,
    coords: { x: 525, y: 225 }
  },
  canada: {
    population: 1100000,
    coords: { x: 225, y: 125 }
  }
};

let selected = [];

countries.forEach(country => {
  country.addEventListener("click", () => {
    const id = country.id;
    if (selected.includes(id)) {
      selected = selected.filter(c => c !== id);
      country.classList.remove("selected");
    } else {
      selected.push(id);
      country.classList.add("selected");
    }
    result.textContent = `Selected: ${selected.join(", ")}`;
  });
});

document.getElementById("simulateBtn").addEventListener("click", () => {
  if (selected.length === 0) {
    notify("Select a country first!", "error");
    return;
  }

  selected.forEach(id => {
    const data = countryData[id];
    const circleId = `pop-${id}`;
    const existingCircle = document.getElementById(circleId);
    const newPop = simulatePopulationChange(id);

    if (existingCircle) existingCircle.remove();

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("id", circleId);
    circle.setAttribute("class", "population-circle");
    circle.setAttribute("cx", data.coords.x);
    circle.setAttribute("cy", data.coords.y);

    // Scale population to radius visually
    const radius = Math.sqrt(newPop / 20000); // adjust scaling factor
    circle.setAttribute("r", 0);
    map.appendChild(circle);

    setTimeout(() => circle.setAttribute("r", radius), 50);

    notify(`${id.charAt(0).toUpperCase() + id.slice(1)} population: ${newPop.toLocaleString()}`, "info");

    countryData[id].population = newPop;
  });
});

function simulatePopulationChange(id) {
  const current = countryData[id].population;
  let change = Math.floor(Math.random() * 2000000) - 1000000;
  if (id === "canada" && selected.includes("germany")) {
    change += 1500000; // immigration boost
  }
  return Math.max(500000, current + change);
}

function notify(message, type) {
  const div = document.createElement("div");
  div.className = "notification";
  div.textContent = message;
  notifications.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 5000);
}
