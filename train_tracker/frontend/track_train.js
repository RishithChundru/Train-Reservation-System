async function fetchTrainStatus() {
    const trainNo = document.getElementById("train_input").value;
    if (!trainNo) {
        alert("Please enter a train number!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/train/${trainNo}`);
        const data = await response.json();

        if (data.success) {
            document.getElementById("train_name").innerText = data.train_name;
            document.getElementById("updated_time").innerText = "Last Updated: " + data.updated_time;

            const tableBody = document.querySelector("#train_data tbody");
            tableBody.innerHTML = ""; 

            data.data.forEach(station => {
                const row = `<tr>
                    <td>${station.station_name}</td>
                    <td>${station.distance}</td>
                    <td>${station.timing}</td>
                    <td>${station.delay}</td>
                    <td>${station.platform}</td>
                    <td>${station.halt}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            document.getElementById("train_status").style.display = "block";
        } else {
            alert("No data found for the train number!");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to fetch train data. Please try again.");
    }
}


function clearInput() {
    document.getElementById("train_input").value = "";
    document.getElementById("train_status").style.display = "none";
}
