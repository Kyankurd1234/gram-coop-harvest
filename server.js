const express = require("express");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;

app.get("/", (req, res) => {
res.send("GRAM COOP HARVEST backend is running!");
});

app.get("/health", (req, res) => {
res.json({ status: "ok", game: "GRAM COOP HARVEST" });
});

app.post("/telegram-webhook", async (req, res) => {
console.log("Telegram webhook received");
res.sendStatus(200);

const message = req.body?.message;
if (!message?.text || !message?.chat?.id || !BOT_TOKEN) return;

if (message.text === "/start") {
try {
await fetch("https://api.telegram.org/bot${BOT_TOKEN}/sendMessage", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
chat_id: message.chat.id,
text: "🌾 Welcome to GRAM COOP HARVEST!\n\nYour farm adventure starts here."
})
});
} catch (error) {
console.error("Telegram message failed:", error.message);
}
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
console.log("GRAM COOP HARVEST server started");
});
