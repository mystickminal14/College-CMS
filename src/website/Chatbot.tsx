import { useEffect } from "react";

const NiaaChatbot = () => {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("npf-chatbot-script")) return;

    const script = document.createElement("script");
    script.id = "npf-chatbot-script";
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://chatbot.in8.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/617ab5c0b7b94a5a9e61a3370ed62bf2/05e267aae0a14e60818bf64411d8e9dc";

    document.body.appendChild(script);

    return () => {
      // Optional cleanup (safe)
      script.remove();
    };
  }, []);

  return (
    <div
      className="npf_chatbots"
      data-w="05e267aae0a14e60818bf64411d8e9dc"
      style={{ display: "none" }}
    />
  );
};

export default NiaaChatbot;
