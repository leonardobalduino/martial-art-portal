import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

export default function GraduationSection(props) {
  const { graduation } = props;
  return <div>{graduation.name}</div>;
}

GraduationSection.propTypes = {
  graduation: PropTypes.object,
};
