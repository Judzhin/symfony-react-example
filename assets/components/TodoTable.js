import React, {Component, useContext, useState} from 'react';
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

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    console.log('addTodo:', addTodo);

    const onSubmitForm = (e) => {
        e.preventDefault();
        context.createTodo({task: addTodo});
        setAddTodo('');
    }

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
                                    {todo.task}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right">
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
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