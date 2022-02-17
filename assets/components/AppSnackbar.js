import React, {Fragment, useContext} from 'react';
import {Button, Snackbar, SnackbarContent} from "@mui/material";
import {TodoContext} from "../context/TodoContext";

function AppSnackbar(props) {
    const context = useContext(TodoContext)
    const closeHandler = () => {
        context.setMessage(undefined)
    }
    return (
        <Snackbar open={context.message !== undefined} autoHideDuration={6000} onClose={closeHandler}>
            {context.message && (
                <SnackbarContent message={(Array.isArray(context.message) ? context.message.map((msg, idx) => (
                    <Fragment key={idx}>
                        <span>{msg}</span>
                        <br/>
                    </Fragment>
                )) : context.message)} action={[
                    <Button key={'dismiss'} onClick={closeHandler}>Dismiss</Button>
                ]}/>
            )}
        </Snackbar>
    );
}

export default AppSnackbar;