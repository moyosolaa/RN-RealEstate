import "./global.css";
import React from "react";
import Navigation from "./navigation";
import { GlobalProvider } from "./app/lib/globalProvider";

export default function App() {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
}
