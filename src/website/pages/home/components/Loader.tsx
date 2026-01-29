import "./butterfly.css";

export default function PageLoader({ text = "Loading" }) {
  return (
    <div className="loader-overlay">
      <div className="loader-card">
        <div className="butterfly-glow" />
        <div className="butterfly-float">
          <div className="butter">
            <div className="fly fly1"></div>
            <div className="fly fly2"></div>
          </div>
        </div>
        <p className="loading-text">
          {text}
          <span className="dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
      </div>
    </div>
  );
}