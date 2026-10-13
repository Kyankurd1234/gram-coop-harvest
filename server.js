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

const message = req.body?.message;
res.sendStatus(200);

if (!message?.text || !message?.chat?.id) {
console.log("No text message or chat ID");
return;
}

if (!BOT_TOKEN) {
console.log("BOT_TOKEN is missing");
return;
}

if (message.text.trim() === "/start") {
try {
const response = await fetch(
"https://api.telegram.org/bot${BOT_TOKEN}/sendMessage",
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
chat_id: message.chat.id,
text: "🌾 Welcome to GRAM COOP HARVEST!\n\nYour farm adventure starts here."
})
}
);

  const result = await response.json();
  console.log("Telegram sendMessage result:", result.ok, result.description || "success");
} catch (error) {
  console.error("Telegram message failed:", error.message);
}

}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
console.log("GRAM COOP HARVEST server started");
});
