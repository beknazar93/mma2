import React from "react";

const InstagramTab = () => {
  return (
    <div>
      <h2>Instagram</h2>
      <p>Откройте Instagram на сайте:</p>
      <div
        style={{
          width: "100%",
          height: "600px",
          overflow: "auto",
          border: "none",
        }}
      >
        <iframe
          src="https://www.instagram.com/direct/inbox/"
          title="Instagram Post"
          width="100%"
          height="600px"
          frameBorder="0"
          scrolling="no"
          allowtransparency="true"
        ></iframe>
      </div>
      <p>
        Для просмотра профиля, откройте{" "}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </p>
      <script src="//code.jivo.ru/widget/HRaSNpRj2I" async></script>
    </div>
  );
};

export default InstagramTab;
