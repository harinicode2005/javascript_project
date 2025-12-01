function updateClock() {
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add 0 before single-digit numbers
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("time").textContent = 
    `${hours}:${minutes}:${seconds}`;
}

// Update every 1 second
setInterval(updateClock, 1000);

// Run immediately once
updateClock();
