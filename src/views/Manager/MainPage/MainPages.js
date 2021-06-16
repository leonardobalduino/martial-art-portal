import React from "react";

// core components
import Header from "components/Header/Header.js";

export default function MainPage(props) {
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        fixed
        brand="Gerenciador"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
    </div>
  );
}
