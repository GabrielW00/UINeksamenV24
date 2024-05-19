import React from "react";
import backgroundImage from "../../assets/background.png";
/*Setter bakgrunnsbilde og plasserer childkomponenter utover*/ 
function BackgroundImage({ children }) {
  return (
    <div
      className="min-h-screen w-full bg-contain"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "repeat-y",
      }}
    >
      {children}
    </div>
  );
}

export default BackgroundImage;
