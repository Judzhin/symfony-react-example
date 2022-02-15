import React from "react";
import './App.css';
import TodoContextProvider from "./context/TodoContext";
import TodoTable from "./components/TodoTable";

function App() {
  return (
    <TodoContextProvider>
      <TodoTable />
    </TodoContextProvider>
  );
}

export default App;
