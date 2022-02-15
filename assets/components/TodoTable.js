import React, {Component, useContext} from 'react';
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
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                            <TableCell component="th" scope="row">
                                <TextField label="Write a new task" variant="standard" fullWidth={true} />
                            </TableCell>
                            <TableCell component="th" scope="row" align="center" width={80}>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {context.todos.map((todo, i) => (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {todo.task}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TodoTable;