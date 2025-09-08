import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    // Simple shortcode generator
    const code = Math.random().toString(36).substring(2, 8);
    const newShortUrl = `${window.location.origin}/${code}`;

    // Save mapping to localStorage
    const urls = JSON.parse(localStorage.getItem("urls") || "{}");
    urls[code] = url;
    localStorage.setItem("urls", JSON.stringify(urls));

    setShortUrl(newShortUrl);
    setUrl("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ width: "300px", padding: "8px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
          Shorten
        </button>
      </form>

      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
