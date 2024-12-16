import React from "react";

const TelegramTab = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Telegram</h2>
      <p>Откройте Telegram для общения:</p>
      <a
        href="https://web.telegram.org/k/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#0088cc",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        Открыть Telegram
      </a>
    </div>
  );
};

export default TelegramTab;
