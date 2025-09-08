import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Redirector() {
  const { code } = useParams();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("urls") || "{}");
    const target = urls[code];

    if (target) {
      window.location.href = target;
    }
  }, [code]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Redirecting...</h2>
      <p>If you are not redirected automatically, the code is: {code}</p>
    </div>
  );
}
