import React from "react";
import './App.css';
import TodoContextProvider from "./context/TodoContext";
import TodoTable from "./components/TodoTable";
import {Container, Typography} from "@mui/material";

function App() {
    return (
        <Container maxWidth="lg">
            <Typography variant="h1" component="div" gutterBottom>
                ToDo List:
            </Typography>
            <TodoContextProvider>
                <TodoTable/>
            </TodoContextProvider>
        </Container>
    );
}

export default App;
