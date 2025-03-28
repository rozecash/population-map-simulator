// Population data for example countries
const populationData = {
  germany: { population: 83000000, coords: [51.1657, 10.4515] },
  canada: { population: 38000000, coords: [56.1304, -106.3468] },
  france: { population: 67000000, coords: [46.6034, 1.8883] },
  italy: { population: 60000000, coords: [41.8719, 12.5674] },
};

// Initialize the map
const map = L.map("map").setView([20, 0], 2); // Centered globally

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const countryLayers = {};

// Add countries to the map
Object.keys(populationData).forEach((country) => {
  const { coords } = populationData[country];
  const layer = L.circle(coords, {
    color: "gray",
    fillColor: "gray",
    fillOpacity: 0.5,
    radius: 500000,
  }).addTo(map);

  layer.bindPopup(`${country.charAt(0).toUpperCase() + country.slice(1)}`);
  countryLayers[country] = layer;
});

// Function to simulate population change
function simulatePopulationChange(selectedCountries) {
  const resultDisplay = document.getElementById("simulationResult");
  resultDisplay.textContent = "Simulating population changes...";
  const updateInterval = 50; // Update every 50ms

  selectedCountries.forEach((country) => {
    let currentPopulation = populationData[country].population;
    const immigrationEffect = Math.random() * 5000000 - 2500000; // Random growth/decline
    const targetPopulation = currentPopulation + immigrationEffect;

    const updatePopulation = setInterval(() => {
      if (Math.abs(currentPopulation - targetPopulation) < 1000) {
        clearInterval(updatePopulation);
        populationData[country].population = targetPopulation; // Finalize population
        resultDisplay.textContent = `Simulation complete for ${selectedCountries.join(", ")}.`;
      } else {
        currentPopulation += (targetPopulation - currentPopulation) / 10; // Smooth change
        const layer = countryLayers[country];
        const percentageChange = ((currentPopulation / populationData[country].population) - 1) * 100;

        // Update map circle radius and color dynamically
        layer.setStyle({
          fillColor: percentageChange > 0 ? "green" : "red",
          color: percentageChange > 0 ? "green" : "red",
        });
        layer.setRadius(500000 + (percentageChange / 2) * 100000); // Adjust size
      }
    }, updateInterval);
  });
}

// UI Interaction
document.getElementById("startSimulation").addEventListener("click", () => {
  const selectedOptions = Array.from(
    document.querySelectorAll("#countrySelect option:checked")
  ).map((option) => option.value);

  if (selectedOptions.length > 0) {
    simulatePopulationChange(selectedOptions);
  } else {
    alert("Please select at least one country to simulate.");
  }
});
