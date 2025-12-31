import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const ViewPaste = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/paste/${id}`)
      .then(res => setContent(res.data.content))
      .catch(err => setError(err.response?.data?.message || "Error"));
  }, [id]);

  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>View Paste</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </div>
  );
};

export default ViewPaste;
