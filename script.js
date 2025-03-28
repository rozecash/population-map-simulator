// Initial population data
const populationData = {
  germany: { population: 83000000, coords: [51.1657, 10.4515] },
  canada: { population: 38000000, coords: [56.1304, -106.3468] },
  france: { population: 67000000, coords: [46.6034, 1.8883] },
  italy: { population: 60000000, coords: [41.8719, 12.5674] },
};

// Disable map movement by customizing options
const map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false,
  tap: false,
  touchZoom: false
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Store circles per country
const countryLayers = {};

Object.entries(populationData).forEach(([country, data]) => {
  const circle = L.circle(data.coords, {
    color: "gray",
    fillColor: "gray",
    fillOpacity: 0.6,
    radius: 500000
  }).addTo(map);
  circle.bindPopup(`${country.charAt(0).toUpperCase() + country.slice(1)}`);
  countryLayers[country] = circle;
});

function simulatePopulationChange(selectedCountries) {
  const resultDisplay = document.getElementById("simulationResult");
  resultDisplay.textContent = "Simulating population changes...";

  selectedCountries.forEach((country) => {
    const originalPopulation = populationData[country].population;
    const randomEffect = Math.floor(Math.random() * 5000000 - 2500000); // +/- 2.5M
    const targetPopulation = originalPopulation + randomEffect;

    let currentPop = originalPopulation;

    const interval = setInterval(() => {
      const diff = targetPopulation - currentPop;

      if (Math.abs(diff) < 1000) {
        clearInterval(interval);
        populationData[country].population = targetPopulation;

        resultDisplay.textContent = `Simulation complete for ${selectedCountries.join(", ")}.`;
      } else {
        currentPop += diff / 20; // smooth easing
        const roundedPop = Math.round(currentPop);
        const changePercent = ((roundedPop - originalPopulation) / originalPopulation) * 100;

        const circle = countryLayers[country];
        circle.setStyle({
          color: changePercent > 0 ? "limegreen" : "crimson",
          fillColor: changePercent > 0 ? "limegreen" : "crimson"
        });

        // Adjust radius based on percentage change
        circle.setRadius(500000 + changePercent * 10000);

        circle.setPopupContent(`${country.charAt(0).toUpperCase() + country.slice(1)}<br>Population: ${roundedPop.toLocaleString()}`);
      }
    }, 50);
  });
}

document.getElementById("startSimulation").addEventListener("click", () => {
  const selectedOptions = Array.from(document.querySelectorAll("#countrySelect option:checked")).map(opt => opt.value);
  if (selectedOptions.length === 0) {
    alert("Please select at least one country.");
    return;
  }
  simulatePopulationChange(selectedOptions);
});
