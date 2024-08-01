import React, { useContext, useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import LinkButtons from "./LinkButtons";
import IconButton from "@mui/material/IconButton";
import { styled, alpha } from "@mui/material/styles";
import {
  loginButton,
  registerButton,
  headerStyle,
} from "./ButtonStyles/ButtonStyles";
import InputBase from "@mui/material/InputBase";
import { Navigate, useNavigate } from "react-router-dom";

// styles for Appbar Component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "white",
    fontSize: "17px",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const HeaderBar = ({ title }) => {
  const [active, setActive] = useState(false);
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    function isUserActive() {
      const getAuth = localStorage.getItem("userNew");
      if (getAuth) {
        setisActive(true);
      }
    }
    isUserActive();
  }, [isActive]);
  async function handleLogout() {
    try {
      localStorage.removeItem("userNew");
      localStorage.removeItem("userID");
      localStorage.removeItem("email");
      await navigate("/signin", { replace: true, preventScrollReset: true });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Box sx={{ flexShrink: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar sx={headerStyle}>
            {/* <Toolbar sx={headerStyle}> */}

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setActive(!active)}
            ></IconButton>
            <Typography
              variant={"h4"}
              component={"span"}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {title.pageTitle || "page Title Placeholder"}
            </Typography>
            <Search sx={{ display: { xs: "none", md: "block" } }}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {!isActive ? (
                <>
                  <LinkButtons
                    buttonText="Join"
                    link="/signup"
                    buttonStyle={registerButton}
                  />
                  <LinkButtons
                    buttonText="Login"
                    link="/signin"
                    buttonStyle={{ color: "blue", backgroundColor: "white" }}
                  />
                </>
              ) : (
                <Button
                  color="error"
                  type="button"
                  variant="contained"
                  onClick={handleLogout}
                >
                  LOGOUT
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
HeaderBar.prototype = {
  title: PropTypes.shape({
    pageTitle: PropTypes.shape.isRequired,
  }),
};
HeaderBar.defaultProps = {
  title: {
    pageTitle: "Todo Manager",
  },
};
