import React, {Component, Fragment, useContext, useState} from 'react';
import {TodoContext} from "../context/TodoContext";
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Paper,
    IconButton, TextField, Box
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShow, setEditIsShow] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShow, setDeleteConfirmationIsShow] = useState(false);
    const [deleteTodo, setDeleteTodo] = useState({});

    /**
     *
     * @param e
     */
    const doSubmitForm = (e) => {
        e.preventDefault();
        if (addTodo.length) {
            context.createTodo({
                name: addTodo
            });
            setAddTodo('');
        }
    }

    /**
     *
     * @param e
     */
    const onCreateChangeTextField = (e) => {
        setAddTodo(e.target.value);
    }

    /**
     *
     * @param e
     */
    const onEditChangeTextField = (e) => {
        e.preventDefault();
        setEditTodo(e.target.value);
    }

    /**
     *
     * @param e
     */
    const onEditKeyUpTextField = (e) => {
        if (13 === e.keyCode) {
            onEditChangeTextField(e);
            doUpdateTodo({id: editIsShow, name: editTodo});
        }
    }

    /**
     *
     * @param editTodo
     */
    const doUpdateTodo = (editTodo) => {
        context.updateTodo(editTodo)
        setEditIsShow(false);
        setEditTodo('');
    }

    return (
        <Fragment>
            {/*<form onSubmit={(e) => {context.createTodo({name:addTodo}, e)}}>*/}
            <form onSubmit={doSubmitForm}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    <TextField label="Write a new task" variant="standard" fullWidth={true}
                                               value={addTodo}
                                        // onChange={e => setAddTodo(e.target.value)}/>
                                               onChange={onCreateChangeTextField}/>
                                </TableCell>
                                <TableCell component="th" scope="row" align="center" width={80}>
                                    <IconButton type="submit">
                                        <AddIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {context.todos.slice().reverse().map((todo, i) => (
                                <TableRow key={i} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row" onDoubleClick={() => {
                                        setEditIsShow(todo.id);
                                        setEditTodo(todo.name);
                                    }}>
                                        {editIsShow === todo.id ?
                                            <TextField value={editTodo} variant="standard"
                                                       fullWidth={true}
                                                       onKeyUp={onEditKeyUpTextField}
                                                       onChange={onEditChangeTextField}/> : todo.name
                                        }
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                        {editIsShow === todo.id ? (
                                            <Fragment>
                                                <IconButton onClick={() => {
                                                    doUpdateTodo({id: todo.id, name: editTodo})
                                                }}>
                                                    <DoneIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                    setEditIsShow(false);
                                                    setEditTodo('');
                                                }}>
                                                    <CancelIcon/>
                                                </IconButton>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <IconButton onClick={() => {
                                                    setEditIsShow(todo.id);
                                                    setEditTodo(todo.name);
                                                }}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                    setDeleteConfirmationIsShow(true);
                                                    setDeleteTodo(todo)
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Fragment>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>

            {deleteConfirmationIsShow && (<DeleteDialog
                open={deleteConfirmationIsShow}
                setDeleteConfirmationIsShow={setDeleteConfirmationIsShow}
                todo={deleteTodo}
            />)}

        </Fragment>
    );
}

export default TodoTable;