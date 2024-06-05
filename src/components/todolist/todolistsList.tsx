import {useState} from "react";
import {FilterValuesType, Todo} from "../../types/types";
import {Todolist} from "./Todolist";



export const TodolistsList = () => {
    const [todos, setTodos] = useState<Todo[]>([{id: "todolistId1", title: "What needs to be done", filter: "all"}]);

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let newTodo = todos.map((todo)=>todo.id === todolistId ? {...todo, filter: value} : todo)
        setTodos(newTodo)
    }

    function changeTitleTodolist(todolistId: string, newValue: string) {
        setTodos(todos.map(todo=>todo.id === todolistId ? {...todo, title: newValue} : {...todo}))
    }

    const mapTodos = todos.map((todo)=>{
        return (
            <div>
                <Todolist
                    todolist={todo}
                    key={todo.id}
                    changeFilter={changeFilter}
                    changeTitleTodo={changeTitleTodolist}
                />
            </div>
        )
    })

    return (
        <div>
            {mapTodos}
        </div>
    );
};

