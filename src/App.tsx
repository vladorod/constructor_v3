import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import AlgorithmsDetails from "./algorithms/AlgorithmsDetails/AlgorithmsDetails";
import { useStore } from "./stores/helpers/useStore";

function App() {
  const store = useStore();

  return (
    <div
      className="App"
      style={{
        margin: 20,
        marginTop: 200,
      }}
    >
      <AlgorithmsDetails />
    </div>
  );
}

export default App;
