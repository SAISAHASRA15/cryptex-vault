const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const users = JSON.parse(
        fs.readFileSync("./users.json", "utf8")
    );

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        res.json({
            success: true,
            username: user.username,
            company: user.company
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
});

app.post("/incidents", (req, res) => {

    const incidents = JSON.parse(
        fs.readFileSync("./incidents.json", "utf8")
    );

    const incidentId =
        "INC-2026-" +
        Math.floor(10000 + Math.random() * 90000);

    const newIncident = {
        id: incidentId,
        ...req.body,
        status: "Open",
        reportedAt: new Date().toISOString()
    };

    incidents.push(newIncident);

    fs.writeFileSync(
        "./incidents.json",
        JSON.stringify(incidents, null, 2)
    );

    res.json({
        success: true,
        data: newIncident
    });

});

app.post("/submit-contact", (req, res) => {

    const filePath = "./contacts.json";

    let contacts = [];

    if (fs.existsSync(filePath)) {
        contacts = JSON.parse(fs.readFileSync(filePath));
    }

    contacts.push(req.body);

    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    res.json({
        success: true
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log("SERVER VERSION WITH INCIDENT ROUTE");
});