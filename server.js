import express from "express";
import fetch from "node-fetch";
const app = express();

app.get("/rss", async (req, res) => {
  const response = await fetch("https://www.upsc.gov.in/rss.xml");
  const text = await response.text();
  res.set("Content-Type", "application/xml");
  res.send(text);
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
