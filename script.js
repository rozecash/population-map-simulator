const countries = document.querySelectorAll(".country");
const simulationResult = document.getElementById("simulationResult");

const countryData = {
  germany: 83000000,
  canada: 38000000,
  france: 67000000,
  italy: 60000000,
};

let selectedCountries = [];

countries.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.id;
    if (selectedCountries.includes(id)) {
      selectedCountries = selectedCountries.filter(c => c !== id);
      el.classList.remove("selected");
    } else {
      selectedCountries.push(id);
      el.classList.add("selected");
    }
  });
});

document.getElementById("simulateBtn").addEventListener("click", () => {
  if (selectedCountries.length === 0) {
    alert("Please select at least one country.");
    return;
  }

  simulationResult.textContent = "Simulating population changes...";

  selectedCountries.forEach((countryId) => {
    let currentPop = countryData[countryId];
    const randomEffect = Math.floor(Math.random() * 5000000 - 2500000);
    const targetPop = currentPop + randomEffect;
    const element = document.getElementById(countryId);

    let animationFrame;
    function animate() {
      const diff = targetPop - currentPop;
      if (Math.abs(diff) < 1000) {
        countryData[countryId] = targetPop;
        simulationResult.textContent = `Simulation complete for: ${selectedCountries.join(", ")}`;
        return;
      }

      currentPop += diff / 20;
      const percentChange = ((currentPop - countryData[countryId]) / countryData[countryId]) * 100;

      const color = percentChange > 0 ? `rgb(0, ${200 + percentChange}, 0)` : `rgb(${200 - percentChange}, 0, 0)`;
      element.style.fill = color;

      animationFrame = requestAnimationFrame(animate);
    }

    animate();
  });
});
