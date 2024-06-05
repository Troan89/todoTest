import {addTask, clearCompleted, reducer} from "../../reducer/taskReducer.ts";

describe('tasks test', ()=>{
    test('добавление задачи', () => {
        const initialState = {
            tasks: {
                'todolist1': [],
            },
            completedTasks: [],
        };
        const newTaskTitle = 'Новая задача';
        const todolistId = 'todolist1';

        const action = addTask(newTaskTitle, todolistId);
        const newState = reducer(initialState, action);

        expect(newState.tasks[todolistId].length).toBe(1);
        expect(newState.tasks[todolistId][0].title).toBe(newTaskTitle);
    });
    test('удаление завершенных задач', () => {
        const initialState = {
            tasks: {
                'todolist1': [
                    { id: '1', title: 'Задача 1', filter: 'active', todoListId: 'todolist1' },
                    { id: '2', title: 'Задача 2', filter: 'completed', todoListId: 'todolist1' },
                    { id: '3', title: 'Задача 3', filter: 'completed', todoListId: 'todolist1' },
                ],
            },
            completedTasks: ['2', '3'],
        };
        const todolistId = 'todolist1';

        const action = clearCompleted(todolistId);
        const newState = reducer(initialState, action);

        expect(newState.tasks[todolistId].length).toBe(1);
        expect(newState.tasks[todolistId].every(task => task.filter !== 'completed')).toBeTruthy();
        expect(newState.completedTasks).toEqual([]);
    });
})


