import {ChangeEvent, useReducer} from "react";
import {Button, Checkbox} from "@mui/material";

import s from './todolist.module.css'
import {FilterValuesType, State,Todo} from "../../types/types";
import {
    addCompletedTask,
    addTask,
    changeTitle,
    clearCompleted,
    reducer,
    toggleCompleted
} from "../../reducer/taskReducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {AddItemForm} from "../AddItemForm/AddItemForm";



type Props = {
    todolist: Todo
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTitleTodo: (todolistId: string, newValue: string) => void
}
export const Todolist = ({todolist, changeFilter, changeTitleTodo}: Props) => {
    const initialState: State = {
        tasks: {"todolistId1": []},
        completedTasks: [],
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const handleToggleComplete = (value: FilterValuesType) => {
        changeFilter(value, todolist.id)
    };

    const handleAddTask = (title: string) => {
        if (title.trim() !== '') {
            dispatch(addTask(title, todolist.id))
        }
    };

    const onChangeStatus = (todolistId: string, taskId: string, status: FilterValuesType) => {
        dispatch(toggleCompleted(taskId, status, todolistId))
    }

    const onChangeTitleTask = (title: string, taskId: string) => {
        dispatch(changeTitle(taskId, title, todolist.id))
    }

    const changeTitleTodolist = (newValue: string) => {
        changeTitleTodo(todolist.id, newValue)
    }

    const clearCompletedTasks = () => {
        dispatch(clearCompleted(todolist.id))
    }

    let filterTasks = state.tasks[todolist.id]
    if (todolist.filter === 'active') {
        filterTasks = filterTasks.filter(task => task.filter === 'active')
    }
    if (todolist.filter === 'completed') {
        filterTasks = filterTasks.filter(task => task.filter === 'completed')
    }

    const mapTasks = filterTasks.map((task) => {
            const onChangeTitleHandler = (title: string) => onChangeTitleTask(title, task.id)

            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const taskId = task.id;
                const status = e.currentTarget.checked ? 'completed' : 'active'
                    dispatch(addCompletedTask(taskId, status, todolist.id))
                onChangeStatus(todolist.id, task.id, status)
            };
            return (
                <div key={task.id} className={s.task}>
                    <Checkbox
                        onChange={onChangeStatusHandler}
                        checked={task.filter === 'completed'}
                        style={{
                            textDecoration: state.completedTasks.includes(task.id) ? 'line-through' : 'none',
                            opacity: state.completedTasks.includes(task.id) ? 0.5 : 1,
                        }}
                    />
                    <EditableSpan title={task.title} onChange={onChangeTitleHandler}
                                  style={{
                                      textDecoration: state.completedTasks.includes(task.id) ? 'line-through' : 'none',
                                      opacity: state.completedTasks.includes(task.id) ? 0.5 : 1,
                                      width: '100%',
                                  }}/>

                </div>
            )
        })

    return (
        <div className={s.wrapper}>
            <h3>
                <EditableSpan title={todolist.title} onChange={changeTitleTodolist} />
            </h3>
            <div className={s.addItem}>
                <AddItemForm addItem={(title: string) => handleAddTask(title)}/>
            </div>
            {mapTasks}
            <div className={s.footerTodolist}>
                <span>{`${state.tasks[todolist.id].filter(task => task.filter === "active").length} items left`}</span>
                <div>
                    <Button color={"inherit"} variant={todolist.filter === 'all' ? "contained" : 'text'}
                            onClick={() => handleToggleComplete('all')}>all</Button>
                    <Button color={"primary"} variant={todolist.filter === 'active' ? 'contained' : 'text'}
                            onClick={() => handleToggleComplete('active')}>active</Button>
                    <Button color={"secondary"} variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                            onClick={() => handleToggleComplete('completed')}>Complete</Button>
                </div>
                <div>
                    <Button color={"warning"}
                            onClick={clearCompletedTasks}>Clear completed</Button>
                </div>
            </div>

        </div>
    );
};

