import React, {Component, useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PropTypes from 'prop-types';
import TodoContextProvider, {TodoContext} from "../context/TodoContext";

function DeleteDialog(props) {
    const context = useContext(TodoContext)
    const doClose = () => {
        props.setDeleteConfirmationIsShow(false);
    }
    return (
        <Dialog onClose={doClose} fullWidth={true} maxWidth='sm' open={props.open} >
            <DialogTitle>
                Are you sure you wish delete this to-do?
            </DialogTitle>
            <DialogContent>
                {props.todo.task}
            </DialogContent>
            <DialogActions>
                <Button onClick={doClose}>Cancel</Button>
                <Button onClick={() => {
                    context.deleteTodo(props.todo)
                    doClose()
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShow: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })
}

export default DeleteDialog;