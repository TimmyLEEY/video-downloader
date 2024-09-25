const express = require("express");
const cors = require("cors");
const youtubedl = require("youtube-dl-exec");
const app = express();

app.use(
  cors({
    origin: "https://video-downloaderr.netlify.app/",
  })
);
app.use(express.json());

app.post("/download", async (req, res) => {
  const { url, format } = req.body;

  try {
    const videoInfo = await youtubedl(url, {
      dumpSingleJson: true,
      format: format, // Use the selected format
    });

    const downloadLink = videoInfo.url || videoInfo.formats[0].url;

    res.json({ downloadLink });
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).json({ message: "Error processing video URL" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
