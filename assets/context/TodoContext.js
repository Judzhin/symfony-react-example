import React, {Component, createContext} from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            todos: [{
                id: 1,
                task: 'ToDo SomeThink'
            }, {
                id: 2,
                task: 'Write a Code'
            }, {
                id: 3,
                task: 'Drop machine'
            }]
        }
    }

    /**
     *
     * @param newTodo
     */
    createTodo(newTodo) {
        let data = [...this.state.todos];
        data.push(newTodo)
        this.setState({
            // todos: [todo].concat(data)
            todos: data
        });
    }

    // read
    readTodo() {

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

        let data = [...this.state.todos];
        let todo = data.find(todo => todo.id === editTodo.id);
        todo.task = editTodo.task

        this.setState({
            todos: data
        })
    }

    // delete
    deleteTodo() {

    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;