import React, {useContext} from 'react';
import {Snackbar} from "@mui/material";
import {TodoContext} from "../context/TodoContext";

function AppSnackbar(props) {
    const context = useContext(TodoContext)
    return (
        <Snackbar open={false}>
        some info
        </Snackbar>
    );
}

export default AppSnackbar;