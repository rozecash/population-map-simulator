function drawPopCircle(svgDoc, x, y, population, id) {
  // Remove existing circle
  const existing = svgDoc.getElementById(`pop-${id}`);
  if (existing) existing.remove();

  const circle = svgDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 0);
  circle.setAttribute("fill", "rgba(0, 200, 255, 0.4)");
  circle.setAttribute("stroke", "cyan");
  circle.setAttribute("stroke-width", 1.5);
  circle.setAttribute("id", `pop-${id}`);
  svgDoc.documentElement.appendChild(circle);

  const radius = Math.sqrt(population / 100000);

  setTimeout(() => {
    circle.setAttribute("r", radius);
  }, 50);

  drawPopulationLabel(svgDoc, x, y, population, id);
}

function drawPopulationLabel(svgDoc, x, y, population, id) {
  const labelId = `label-${id}`;
  let label = svgDoc.getElementById(labelId);

  if (!label) {
    label = svgDoc.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("id", labelId);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("fill", "#fff");
    svgDoc.documentElement.appendChild(label);
  }

  label.setAttribute("x", x);
  label.setAttribute("y", y - 10); // Slightly above circle
  label.setAttribute("font-size", getFontSize(population));
  label.textContent = population.toLocaleString() + " people";
}

function getFontSize(pop) {
  // Scale font between 10 and 24px based on population
  const minSize = 10, maxSize = 24;
  const minPop = 500000, maxPop = 20000000;
  const scale = (pop - minPop) / (maxPop - minPop);
  return Math.max(minSize, Math.min(maxSize, minSize + scale * (maxSize - minSize)));
}

// Update simulate click logic to pass the id:
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

    let change = Math.floor(Math.random() * 2000000) - 1000000;
    if (id === "CA" && selected.has("DE")) change += 1500000;

    const newPop = Math.max(300000, country.population + change);
    country.population = newPop;

    drawPopCircle(svgDoc, country.cx, country.cy, newPop, id);
    notify(`${country.name}'s population: ${newPop.toLocaleString()}`);
  });
});
