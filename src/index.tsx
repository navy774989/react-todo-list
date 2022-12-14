import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const container = document.getElementById("root")!;
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      main: "#7945f5",
    },
    secondary: {
      main: "#000000",
    },
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>
  </ThemeProvider>
);
reportWebVitals();
