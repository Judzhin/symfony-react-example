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
            message: undefined
        }
    }

    componentDidMount() {
        this.readTodo();
    }

    // read
    readTodo() {

        axios.get('/api/tasks/')
            .then(response => {
                this.setState({todos: response.data.data})
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
                let state = {
                    success: response.data.success,
                    message: response.data.message
                };

                if (response.data.success) {
                    let data = [...this.state.todos];
                    data.push(response.data.data);
                    state = {...state, todos: data}
                }

                if (response.data.error) {
                    console.error(response.data.error);
                }

                this.setState(state);
            })
            .catch(error => {
                console.log(error);
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
                if (response.data.success) {
                    let data = [...this.state.todos],
                        todo = data.find(todo => todo.id === editTodo.id),
                        oldName = todo.name;
                    todo.name = editTodo.name
                    this.setState({
                        todos: data,
                        message: [
                            response.data.message, oldName, todo.name
                        ]
                    })
                }
            })
    }

    /**
     *
     * @param deleteTodo
     */
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
                if (response.data.success) {
                    let data = [...this.state.todos], todo = data.find(todo => {
                        return todo.id === deleteTodo.id;
                    });

                    data.splice(data.indexOf(todo), 1);

                    this.setState({
                        todos: data,
                        message: response.data.message
                    })
                }
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