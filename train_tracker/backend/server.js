const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/train/:train_no", async (req, res) => {
    try {
        const trainNo = req.params.train_no;
        const apiUrl = `https://rappid.in/apis/train.php?train_no=${trainNo}`;
        
        // Fetch data from the API
        const response = await axios.get(apiUrl);
        
        // Send response back to frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching train data:", error);
        res.status(500).json({ error: "Error fetching train data" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
