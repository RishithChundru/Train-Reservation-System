// Function to get query parameters from URL
function getQueryParams() {
  let params = new URLSearchParams(window.location.search);

  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || "";
  const travelClass = params.get("class") || "All Classes";
  const quota = params.get("quota") || "General";

  // Fill form fields with the retrieved values
  document.getElementById("departure").value = from;
  document.getElementById("destination").value = to;
  document.getElementById("datePick").value = date;
  document.getElementById("classlist").value = travelClass;
  document.getElementById("quotaList").value = quota;

  // Fetch train data only if valid input exists
  if (from && to && date) {
    fetchTrainData(from, to, date);
  }
}

// Run the function when the page loads
window.onload = getQueryParams;

// Function to fetch train data from API
async function fetchTrainData(fromStation, toStation, journeyDate) {
  if (!fromStation || !toStation || !journeyDate) return;

  const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromStation}&toStationCode=${toStation}&dateOfJourney=${journeyDate}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d7d28d209amsh7d9f0f55c98e357p15a7c4jsn3c820b45bae0", // Replace with your actual API key
      "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to fetch train data");

    const data = await response.json();
    console.log("Fetched Train Data:", data.data); // Debugging

    displayResults(data.data || []);
  } catch (error) {
    console.error("Error fetching train data:", error);
  }
}

// Event listener for Modify Search button
document.getElementById("submit").addEventListener("click", () => {
  const fromStation = document.getElementById("departure").value.trim();
  const toStation = document.getElementById("destination").value.trim();
  const journeyDate = document.getElementById("datePick").value;

  if (!fromStation || !toStation || !journeyDate) {
    alert("Please enter Departure, Destination, and Date.");
    return;
  }

  fetchTrainData(fromStation, toStation, journeyDate);
});

// Function to display train results
function displayResults(trains) {
  const trainResults = document.getElementById("trainResults");
  trainResults.innerHTML = ""; // Clear previous results

  if (trains.length === 0) {
    trainResults.innerHTML = "<p>No trains found</p>";
    return;
  }

  trains.forEach((train) => {
    const trainCard = document.createElement("div");
    trainCard.classList.add("trainCard");

    trainCard.innerHTML = `
      <div id="first">
        <p id="depToDest">${train.from_station_name} → ${train.to_station_name}</p>
        <h1 id="trainName">${train.train_name} (${train.train_number})</h1>
        <p id="runsOn">${train.run_days ? train.run_days.join(" ") : "N/A"}</p>
      </div>
      <div id="center">
        <p id="depTime">Departure: ${train.from_std || "N/A"}</p>
        <p id="trainID">Train Number: ${train.train_number}</p>
        <p id="arrTime">Arrival: ${train.to_std || "N/A"}</p>
      </div>
      <div id="bottom">
        <div id="coaches">
  ${generateCoachButtons(train)}
</div>
<button id="bookBtn">Book Now</button>

      </div>
    `;

    trainResults.appendChild(trainCard);
  });
}

// Function to generate coach availability buttons dynamically
function generateCoachButtons(train) {
  const classes = ["SL", "3A", "3E", "2A", "1A"];
  
  const availableClasses = train.available_classes || [];
  const fares = train.fare || {};

  return classes
    .map(
      (cls) => `
      <button>
        <p>${cls}</p>
        <p id="seatAvail">${
          availableClasses.includes(cls) ? "Available" : "No seats Available"
        }</p>
        <p id="price">₹${fares[cls] || 0}</p>
      </button>
    `
    )
    .join("");
}

// Swap Departure and Destination
document.getElementById("swapBtn").addEventListener("click", () => {
  const depInput = document.getElementById("departure");
  const destInput = document.getElementById("destination");

  const temp = depInput.value;
  depInput.value = destInput.value;
  destInput.value = temp;
});
