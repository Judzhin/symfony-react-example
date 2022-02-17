import React, {Component, createContext} from 'react';
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        // let todos = [{
        //     id: 1,
        //     task: 'ToDo SomeThink'
        // }, {
        //     id: 2,
        //     task: 'Write a Code'
        // }, {
        //     id: 3,
        //     task: 'Drop machine'
        // }];
        this.state = {
            // lastIdentifier: todos.length,
            todos: [], // todos
            message: ''
        }
    }

    componentDidMount() {
        this.readTodo();
    }

    // read
    readTodo() {

        axios.get('/api/tasks/')
            .then(response => {
                this.setState({todos: response.data})
            })
            .catch(err => {
                // console.error(err);
            });
    }

    /**
     *
     * @param newTodo
     */
    createTodo(newTodo) {
        // Sync Method
        // let data = [...this.state.todos];
        // newTodo['id'] = ++(this.state.lastIdentifier);
        // data.push(newTodo);
        // this.setState({
        //     // todos: [todo].concat(data)
        //     todos: data
        // });

        // Async Method
        axios.post('/api/tasks/', newTodo)
            .then(response => {
                let data = [...this.state.todos];
                data.push(response.data.data.todo);
                this.setState({
                    todos: data
                });
            })
    }

    /**
     *
     * @param editTodo
     */
    updateTodo(editTodo) {

        // let data = [];
        // this.state.todos.forEach(todo => {
        //     if (todo.id === editTodo.id) {
        //         return data.push(editTodo);
        //     }
        //     data.push(todo);
        // });

        // // Sync
        // let data = [...this.state.todos];
        // let todo = data.find(todo => todo.id === editTodo.id);
        // todo.name = editTodo.name
        //
        // this.setState({
        //     todos: data
        // })

        // Async
        axios.put(`/api/tasks/${editTodo.id}`, editTodo)
            .then(response => {
                let data = [...this.state.todos];
                let todo = data.find(todo => todo.id === editTodo.id);
                todo.name = editTodo.name
                this.setState({
                    todos: data
                })
            })
    }

    // delete
    deleteTodo(deleteTodo) {
        // Sync
        // // let data = [...this.state.todos].filter(todo => todo.id !== deleteTodo.id);
        // let data = [...this.state.todos], todo = data.find(todo => {
        //     return todo.id === deleteTodo.id;
        // });
        //
        // data.splice(data.indexOf(todo), 1);
        //
        // this.setState({
        //     todos: data
        // })

        // Async
        axios.delete(`/api/tasks/${deleteTodo.id}`, deleteTodo)
            .then(response => {
                let data = [...this.state.todos], todo = data.find(todo => {
                    return todo.id === deleteTodo.id;
                });

                data.splice(data.indexOf(todo), 1);

                this.setState({
                    todos: data
                })
            })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                // for snackbar
                setMessage: (message) => this.setState({message: message})
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;