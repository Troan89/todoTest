
import {v1} from "uuid";
import {FilterValuesType, State, Task} from "../types/types";

const ADD_TASK = 'ADD_TASK'
const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
const CHANGE_TITLE = 'CHANGE_TITLE'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
const ADD_COMPLETED_TASK = 'ADD_COMPLETED_TASK'

type Action =
    | AddTask
    | ToggleCompleted
    | ChangeTitle
    | ClearCompleted
    | AddCompleted


export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ADD_TASK:
            const newTodo: Task = {
                id: v1(),
                title: action.title,
                filter: 'active',
                todoListId: action.todolistId
            };
            return {
                ...state,
                tasks: {...state.tasks, [action.todolistId]: [...state.tasks[action.todolistId], newTodo]}
            };
        case TOGGLE_COMPLETE:
            const updatedTasks = state.tasks[action.todolistId].map(task =>
                task.id === action.taskId ? {...task, filter: action.status} : task
            );
            return {
                ...state,
                tasks: {...state.tasks, [action.todolistId]: updatedTasks},
            };
        case ADD_COMPLETED_TASK:
            const updatedCompletedTasks = action.status === 'completed'
                ? [...state.completedTasks, action.taskId]
                : state.completedTasks.filter(id => id !== action.taskId);
            return {
                ...state,
                completedTasks: updatedCompletedTasks,
            };
        case CHANGE_TITLE:
            const updatedTitleTasks = state.tasks[action.todolistId].map(task =>
                task.id === action.taskId ? {...task, title: action.title} : task
            );
            return {
                ...state,
                tasks: {...state.tasks, [action.todolistId]: updatedTitleTasks},
            };
        case CLEAR_COMPLETED:
            const remainingTasks = state.tasks[action.todolistId].filter(task => !state.completedTasks.includes(task.id));
            return {
                ...state,
                tasks: {[action.todolistId]: remainingTasks},
                completedTasks: [],
            };
        default:
            return state;
    }
};

export const addTask = (title: string, todolistId: string) => ({
    type: ADD_TASK, title, todolistId
}  as const)
export const toggleCompleted = (taskId: string, status: FilterValuesType, todolistId: string) => ({
    type: TOGGLE_COMPLETE, taskId, todolistId, status
}  as const)
export const changeTitle = (taskId: string, title: string, todolistId: string) => ({
    type: CHANGE_TITLE, taskId, todolistId, title
}  as const)
export const clearCompleted = (todolistId: string) => ({
    type: CLEAR_COMPLETED, todolistId
}  as const)

export const addCompletedTask = (taskId: string, status: FilterValuesType, todolistId: string) => ({
    type: ADD_COMPLETED_TASK, taskId, todolistId, status
}  as const)

export type AddTask = ReturnType<typeof addTask>
export type ToggleCompleted = ReturnType<typeof toggleCompleted>
export type ChangeTitle = ReturnType<typeof changeTitle>
export type ClearCompleted = ReturnType<typeof clearCompleted>
export type AddCompleted = ReturnType<typeof addCompletedTask>

