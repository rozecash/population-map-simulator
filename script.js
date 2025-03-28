// Initial population data (for example purposes)
const populationData = {
  germany: 83000000, // Germany's population
  canada: 38000000,  // Canada's population
  france: 67000000,  // France's population
  italy: 60000000    // Italy's population
};

// Simulate population changes
function simulatePopulationChange() {
  const countrySelect = document.getElementById("countrySelect");
  const selectedCountry = countrySelect.value;
  const startButton = document.getElementById("startSimulation");

  // Set initial populations
  let currentPopulation = populationData[selectedCountry];
  const immigrationEffect = Math.random() * 5000000; // Simulate immigration from famine or events
  
  // Simulate gradual population change
  let targetPopulation = currentPopulation + immigrationEffect;

  // Display the initial population
  const currentPopulationDisplay = document.getElementById("currentPopulation");
  currentPopulationDisplay.textContent = `Current Population: ${currentPopulation.toLocaleString()}`;

  // Simulate the growth or decline
  const simulationResult = document.getElementById("simulationResult");
  simulationResult.textContent = `Simulating immigration... (Increasing by ${immigrationEffect.toLocaleString()} people)`;

  // Smooth transition of population
  let populationInterval = setInterval(() => {
    if (currentPopulation < targetPopulation) {
      currentPopulation += 10000; // Increase population slowly
      currentPopulationDisplay.textContent = `Current Population: ${Math.round(currentPopulation).toLocaleString()}`;
    } else {
      clearInterval(populationInterval);
      simulationResult.textContent = `Simulation complete! Final Population: ${Math.round(currentPopulation).toLocaleString()}`;
    }
  }, 50); // Update population every 50ms for smooth effect
}

// Event listener for the start button
document.getElementById("startSimulation").addEventListener("click", () => {
  simulatePopulationChange();
});

// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 2); // Center on the world map

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Markers for Germany and Canada
L.marker([51.1657, 10.4515]).addTo(map)  // Germany's coordinates
  .bindPopup('Germany')
  .openPopup();

L.marker([56.1304, -106.3468]).addTo(map)  // Canada coordinates
  .bindPopup('Canada')
  .openPopup();

// Optionally, you can add click handlers to zoom to specific countries
L.marker([51.1657, 10.4515]).on('click', () => {
  map.setView([51.1657, 10.4515], 5); // Zoom in to Germany
});

L.marker([56.1304, -106.3468]).on('click', () => {
  map.setView([56.1304, -106.3468], 5); // Zoom in to Canada
});
