import React from "react";
import './App.css';
import TodoContextProvider from "./context/TodoContext";
import TodoTable from "./components/TodoTable";
import {Container, CssBaseline, Typography} from "@mui/material";
import AppSnackbar from "./components/AppSnackbar";

function App() {
    return (
        <Container maxWidth="lg">
            <Typography variant="h3" component="div" mt={2} mb={3}>
                ToDo List:
            </Typography>
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar />
            </TodoContextProvider>
        </Container>
    );
}

export default App;
