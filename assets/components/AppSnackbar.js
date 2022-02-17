import React, {useContext} from 'react';
import {Button, Snackbar, SnackbarContent} from "@mui/material";
import {TodoContext} from "../context/TodoContext";

function AppSnackbar(props) {
    const context = useContext(TodoContext)

    const doOpen = () => {
        return context.message !== undefined
            && 0 !== context.message.length ;
    }
    const resetMessage = () => {
        context.setMessage('')
    }
    return (
        <Snackbar open={doOpen()} autoHideDuration={6000} variant={'success'} onClose={resetMessage}>
            <SnackbarContent message={context.message} variant={'success'} action={[
                <Button key={'dismiss'} onClick={resetMessage}>Dismiss</Button>
            ]} />
        </Snackbar>
    );
}

export default AppSnackbar;