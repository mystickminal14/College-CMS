import { useEffect } from "react";

const NiaaChatbot = () => {
  useEffect(() => {
    // Ensure container exists before script load
    const container = document.querySelector(".npf_chatbots");
    if (!container) return;

    // Prevent duplicate script
    if (document.getElementById("niaa-chatbot-script")) return;

    const script = document.createElement("script");
    script.id = "niaa-chatbot-script";
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://chatbot.in8.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/617ab5c0b7b94a5a9e61a3370ed62bf2/ea3d661f033843b0b492672f5eb69d37";

    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="npf_chatbots"
      data-w="ea3d661f033843b0b492672f5eb69d37"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    />
  );
};

export default NiaaChatbot;
