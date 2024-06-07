import React from "react";
import PropTypes from "prop-types";

function EmptyLayout({ children }) {
  return <>{children}</>;
}

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EmptyLayout;
