const wa = require('@open-wa/wa-automate');
const express = require('express');
const app = express();
const PORT = 3000;

let clientInstance;

wa.create({
    sessionDataPath: './session', // folder for saving session
    headless: true, // No browser UI
    qrTimeout: 0, // Unlimited time to scan QR
    authTimeout: 0,
}).then(client => {
    clientInstance = client;
    console.log("WhatsApp bot ready!");
}).catch(err => console.error("Error starting bot:", err));

// API route to send message
app.get('/send/:number/:message', async (req, res) => {
    if (!clientInstance) {
        return res.status(500).json({ error: "WhatsApp bot not ready yet" });
    }

    let number = req.params.number;
    let message = req.params.message;

    // Convert number to WhatsApp format
    if (!number.includes('@c.us')) {
        number = number + '@c.us';
    }

    try {
        await clientInstance.sendText(number, message);
        res.json({ success: true, number, message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send message" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
