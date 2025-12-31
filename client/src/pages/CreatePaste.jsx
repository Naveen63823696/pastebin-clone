import { useState } from "react";
import api from "../api";

const CreatePaste = () => {
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);

    const expiresAt = expiry
      ? new Date(Date.now() + expiry * 60 * 1000)
      : null;

    const res = await api.post("/paste", {
      content,
      expiresAt,
      maxViews: maxViews || null,
    });

    setLink(`${window.location.origin}/paste/${res.data.pasteId}`);
    setLoading(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
    <>
    <style>{`
  /* ===== Base Reset ===== */
  * {
    box-sizing: border-box;
  }
html,
body,
#root {
  height: 100%;
  margin: 0;
}

  body {
    
    margin: 0;
    font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f3f4f6, #eef2ff);
    color: #111827;
  }

  /* ===== Page Layout ===== */
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  padding: 24px;
}



  /* ===== Card ===== */
  .card {
    background: #ffffff;
    width: 100%;
    max-width: 640px;
    padding: 28px;
    border-radius: 16px;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.08),
      0 4px 10px rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    align-items: center;  
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.1),
      0 6px 14px rgba(0, 0, 0, 0.06);
  }

  /* ===== Title ===== */
  h1 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 26px;
    font-weight: 700;
    color: #1f2937;
    letter-spacing: -0.3px;
  }

  /* ===== Labels ===== */
  label {
    display: block;
    font-size: 13px;
    margin-bottom: 6px;
    color: #4b5563;
    font-weight: 600;
  }

  /* ===== Textarea ===== */
  textarea {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    resize: vertical;
    font-size: 14px;
    background-color: #fafafa;
    color: #111827; /* ✅ FIXED */
    transition: border 0.2s ease, box-shadow 0.2s ease;
  }

  textarea::placeholder {
    color: #9ca3af;
  }

  textarea:focus {
    outline: none;
    border-color: #6366f1;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  /* ===== Row Inputs ===== */
  .row {
    display: flex;
    gap: 16px;
    margin-top: 18px;
  }

  .row div {
    flex: 1;
  }

  input {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    font-size: 14px;
    background-color: #fafafa;
    color: #111827; /* ✅ FIXED */
    transition: border 0.2s ease, box-shadow 0.2s ease;
  }

  input::placeholder {
    color: #9ca3af;
  }

  input:focus {
    outline: none;
    border-color: #6366f1;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  /* ===== Primary Button ===== */
  button {
    width: 100%;
    margin-top: 28px;
    padding: 14px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.35);
  }

  button:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px rgba(79, 70, 229, 0.25);
  }

  button:disabled {
    background: #9ca3af;
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.8;
  }

  /* ===== Result Box ===== */
  .result {
    margin-top: 28px;
    padding: 18px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f8fafc, #eef2ff);
    border: 1px solid #e5e7eb;
  }

  .result p {
    font-size: 12px;
    margin-bottom: 10px;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    text-align: center;
  }

  /* ===== Link Row ===== */
  .link-row {
    
    gap: 12px;
    align-items: center;
  }

  .link-row a {
  align-items: center;
    flex: 1;
    font-size: 14px;
    color: #4f46e5;
    text-decoration: none;
    word-break: break-all;
    background: #ffffff;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  /* ===== Copy Button ===== */
  .copy-btn {
    padding: 10px 14px;
    font-size: 13px;
    background: #4f46e5;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .copy-btn:hover {
    background: #4338ca;
    transform: translateY(-1px);
  }

  /* ===== Mobile ===== */
  @media (max-width: 600px) {
    .row {
      flex-direction: column;
    }

    .card {
      padding: 22px;
    }

    h1 {
      font-size: 22px;
    }
  }
`}</style>



      <div className="page">
        <div className="card">
          <h1>Pastebin Clone</h1>

          <label>Paste Content</label>
          <textarea
            rows="8"
            placeholder="Paste your text here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="row">
            <div>
              <label>Expiry (minutes)</label>
              <input
                type="number"
                placeholder="Optional"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>

            <div>
              <label>Max Views</label>
              <input
                type="number"
                placeholder="Optional"
                value={maxViews}
                onChange={(e) => setMaxViews(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Paste"}
          </button>

          {link && (
            <div className="result">
              <p>Shareable Link</p>
              <div className="link-row">
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
                <button className="copy-btn" onClick={copyLink}>
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePaste;
