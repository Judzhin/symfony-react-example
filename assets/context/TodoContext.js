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
            todos: []
        }
    }

    // create
    createTodo(todo) {
        let data = [...this.state.todos];
        data.push(todo)
        this.setState({
            // todos: [todo].concat(data)
            todos: data
        });
    }

    // read
    readTodo() {

    }

    // update
    updateTodo() {

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