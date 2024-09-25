import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState("best");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://render.com/docs/web-services#port-binding",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: videoUrl, format }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download video");
      }

      const data = await response.json();
      setDownloadLink(data.downloadLink);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Video Downloader</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="format">Select Format:</label>
          <select
            id="format"
            className="form-control"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="best">Best Quality</option>
            <option value="mp4">MP4</option>
            <option value="mp3">MP3</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Download
        </button>
      </form>

      {loading && <p>Processing...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {downloadLink && (
        <div className="alert alert-success">
          <p>Video ready for download:</p>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
