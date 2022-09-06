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
    const schemaTodo = {name: '', description: ''};
    const [addTodo, setAddTodo] = useState(schemaTodo);
    // const [addTodoName, setAddTodoName] = useState('');
    // const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShow, setEditIsShow] = useState(false);
    const [editTodo, setEditTodo] = useState(schemaTodo);
    // const [editTodoName, setEditTodoName] = useState('');
    // const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deleteConfirmationIsShow, setDeleteConfirmationIsShow] = useState(false);
    const [deleteTodo, setDeleteTodo] = useState({});

    const onCreateSubmit = (e) => {
        e.preventDefault();
        // if (addTodoName.length && addTodoDescription.length) {
        if (addTodo.name.length && addTodo.description.length) {
            // context.createTodo({
            //     name: addTodoName,
            //     description: addTodoDescription,
            // });
            // setAddTodoName('');
            // setAddTodoDescription('');
            context.createTodo(addTodo);
            setAddTodo(schemaTodo)
        }
    }

    const onEditChangeTextField = (e) => {
        e.preventDefault();
        // debugger;
        // setEditTodoName(e.target.value);
        setEditTodo({...editTodo, [e.target.name]: e.target.value})
    }

    /**
     *
     * @param e
     */
    const onEditKeyUpTextField = (e) => {
        if (13 === e.keyCode) {
            onEditChangeTextField(e);
            // doUpdateTodo({id: editIsShow, name: editTodoName});
            doUpdateTodo({...editTodo, id: editIsShow});
        }
    }

    /**
     *
     * @param editTodo
     */
    const doUpdateTodo = (editTodo) => {
        context.updateTodo(editTodo)
        setEditIsShow(false);
        // setEditTodoName('');
        setEditTodo(schemaTodo);
    }

    return (
        <Fragment>
            {/*<form onSubmit={(e) => {context.createTodo({name:addTodo}, e)}}>*/}

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">
                                <form onSubmit={onCreateSubmit} style={{width: '100%'}}>
                                    <Table sx={{minWidth: 650}} aria-label="simple table">
                                        <TableBody>
                                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell component="th" scope="row">
                                                    <TextField label="Write a todo name"
                                                               value={addTodo.name}
                                                               onChange={(e) => { // onChange={e => setAddTodo(e.target.value)}/>
                                                                   // setAddTodoName(e.target.value);
                                                                   // setAddTodoDescription(addTodoDescription);
                                                                   setAddTodo({...addTodo, name: e.target.value});
                                                               }} variant="standard" fullWidth={true}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <TextField label="Write a todo name"
                                                               value={addTodo.description}
                                                               onChange={(e) => { // onChange={e => setAddTodo(e.target.value)}/>
                                                                   // setAddTodoName(addTodoName);
                                                                   // setAddTodoDescription(e.target.value);
                                                                   setAddTodo({
                                                                       ...addTodo,
                                                                       description: e.target.value
                                                                   });
                                                               }} variant="standard" fullWidth={true}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center" width={80}>
                                                    <IconButton type="submit" onClick={onCreateSubmit}>
                                                        <AddIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </form>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {context.todos.slice().reverse().map((todo, i) => (
                            <TableRow key={i} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="td" scope="row">
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell component="td" scope="row" onDoubleClick={() => {
                                                    setEditIsShow(todo.id);
                                                    // setEditTodoName(todo.name);
                                                    setEditTodo(todo);
                                                }}>
                                                    {editIsShow === todo.id ?
                                                        <TextField name="name"
                                                                   value={editTodo.name}
                                                                   variant="standard"
                                                                   fullWidth={true}
                                                                   onKeyUp={onEditKeyUpTextField}
                                                                   onChange={onEditChangeTextField}/> : todo.name
                                                    }
                                                </TableCell>
                                                <TableCell component="td" scope="row" onDoubleClick={() => {
                                                    setEditIsShow(todo.id);
                                                    // setEditTodoName(todo.name);
                                                    setEditTodo(todo);
                                                }}>
                                                    {editIsShow === todo.id ?
                                                        <TextField name="description"
                                                                   value={editTodo.description} variant="standard"
                                                                   fullWidth={true}
                                                                   onKeyUp={onEditKeyUpTextField}
                                                                   onChange={onEditChangeTextField}/> : todo.description
                                                    }
                                                </TableCell>
                                                <TableCell component="td" scope="row" align="right" width={80}>
                                                    {editIsShow === todo.id ? (
                                                        <Fragment>
                                                            <IconButton onClick={() => {
                                                                // doUpdateTodo({id: todo.id, name: editTodoName})
                                                                doUpdateTodo({...editTodo, id: todo.id})
                                                            }}>
                                                                <DoneIcon/>
                                                            </IconButton>
                                                            <IconButton onClick={() => {
                                                                setEditIsShow(false);
                                                                // setEditTodoName('');
                                                                setEditTodo(schemaTodo);
                                                            }}>
                                                                <CancelIcon/>
                                                            </IconButton>
                                                        </Fragment>
                                                    ) : (
                                                        <Fragment>
                                                            <IconButton onClick={() => {
                                                                setEditIsShow(todo.id);
                                                                // setEditTodoName(todo.name);
                                                                setEditTodo(todo);
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
                                        </TableBody>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {deleteConfirmationIsShow && (<DeleteDialog
                open={deleteConfirmationIsShow}
                setDeleteConfirmationIsShow={setDeleteConfirmationIsShow}
                todo={deleteTodo}
            />)}

        </Fragment>
    );
}

export default TodoTable;