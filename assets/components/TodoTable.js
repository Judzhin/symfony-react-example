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


function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShow, setEditIsShow] = useState(false);
    const [editTodo, setEditTodo] = useState('');

    /**
     *
     * @param e
     */
    const onSubmitForm = (e) => {
        e.preventDefault();
        context.createTodo({task: addTodo});
        setAddTodo('');
    }

    /**
     *
     * @param e
     */
    const onChangeTextField = (e) => {
        setAddTodo(e.target.value);
    }

    return (
        // <form onSubmit={(e) => {context.createTodo({task:addTodo}, e)}}>
        <form onSubmit={onSubmitForm}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">
                                <TextField label="Write a new task" variant="standard" fullWidth={true} value={addTodo}
                                           // onChange={e => setAddTodo(e.target.value)}/>
                                           onChange={onChangeTextField}/>
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
                                <TableCell component="th" scope="row">
                                    {editIsShow === todo.id ?
                                        <TextField value={editTodo} variant="standard" fullWidth={true} onChange={e => {
                                            e.preventDefault();
                                            setEditTodo(e.target.value);
                                        }} /> : todo.task
                                    }
                                </TableCell>
                                <TableCell component="th" scope="row" align="right">
                                    {editIsShow === todo.id ? (
                                        <Fragment>
                                            <IconButton onClick={() => {
                                                context.updateTodo({id: todo.id, task: editTodo})
                                                setEditIsShow(false);
                                                setEditTodo('');
                                            }}>
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                setEditIsShow(false);
                                                setEditTodo('');
                                            }}>
                                                <CancelIcon/>
                                            </IconButton>
                                        </Fragment>
                                    ): (
                                        <Fragment>
                                            <IconButton onClick={() => {
                                                setEditIsShow(todo.id);
                                                setEditTodo(todo.task);
                                            }}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton>
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
    );
}

export default TodoTable;