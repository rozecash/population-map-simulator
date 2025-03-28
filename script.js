body {
  background-color: #121212;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  margin: 0;
  padding: 20px;
}

svg {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  display: block;
}

.country {
  fill: gray;
  stroke: white;
  stroke-width: 0.5;
  transition: fill 0.5s ease, stroke 0.3s;
  cursor: pointer;
}

.country.selected {
  stroke: #ffdd57;
  stroke-width: 2;
}

.population-circle {
  fill: rgba(0, 200, 255, 0.4);
  stroke: cyan;
  stroke-width: 1.5;
  pointer-events: none;
  transition: r 1s ease;
}

button {
  padding: 10px 20px;
  background: #7f5af0;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #624bdc;
}

#simulationResult {
  margin-top: 15px;
  color: #aaa;
  font-size: 16px;
}

#notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  background-color: #222;
  border-left: 5px solid #7f5af0;
  padding: 10px 15px;
  border-radius: 4px;
  color: white;
  opacity: 0;
  transform: translateX(100%);
  animation: slideIn 0.5s forwards, fadeOut 0.5s 4s forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
