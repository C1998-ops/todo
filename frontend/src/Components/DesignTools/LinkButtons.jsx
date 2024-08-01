import { Button } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { linkStyle } from "./ButtonStyles/ButtonStyles";

const LinkButtons = ({ buttonText, buttonStyle, link, props }) => {
  return (
    <Fragment>
      <Link style={linkStyle} to={link}>
        <Button variant="text" color="primary" style={buttonStyle}>
          {buttonText}
        </Button>
      </Link>
    </Fragment>
  );
};

export default LinkButtons;
