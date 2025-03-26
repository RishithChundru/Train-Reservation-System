document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents default form submission
  
        // Get input values
        const from = document.getElementById("from").value.trim();
        const to = document.getElementById("to").value.trim();
        const journeyDate = document.getElementById("journey-date").value;
        const reservation = document.getElementById("general").value;
        const travelClass = document.getElementById("class").value;
  
        // Validate required fields
        if (!from || !to || !journeyDate) {
          alert("Please fill in Departure, Destination, and Journey Date.");
          return;
        }
  
        // Create query parameters for URL
        const queryParams = new URLSearchParams({
          from: from,
          to: to,
          date: journeyDate,
          reservation: reservation,
          class: travelClass,
        });
  
        // Redirect to trainSearch.html with parameters
        window.location.href = `trainSearch.html?${queryParams.toString()}`;
      });
    } else {
      console.error("Form element not found in trainBooking.html");
    }
  });
  