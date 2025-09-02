import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;
const distPath = path.resolve(__dirname, "../dist/public");

// Serve static files
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Static site served at http://localhost:${port}`);
});
