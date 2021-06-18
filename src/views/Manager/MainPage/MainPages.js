import React from "react";

// sections for this page
import HeaderSection from "views/Manager/Sections/HeaderSection.js";

export default function MainPage(props) {
  const { ...rest } = props;
  return (
    <div>
      <HeaderSection {...rest} />
    </div>
  );
}
