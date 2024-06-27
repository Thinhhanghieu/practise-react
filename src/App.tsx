import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { router } from "./router/routes";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";

function App() {
  const globalStyles = {
    a: {
      color: "unset",
      textDecoration: "none"
    }
  };
	return (
		<>
			<CssBaseline />
			<GlobalStyles styles={globalStyles} />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
