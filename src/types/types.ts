export type State = {
    tasks: Tasks;
    completedTasks: string[];
}

export type FilterValuesType = 'all' | "active" | "completed"
export type Todo = {
    id: string
    title: string
    filter: FilterValuesType
}
export type Task = {
    id: string
    title: string
    filter: FilterValuesType
    todoListId: string
}
export type Tasks = {
    [key: string]: Task[]
}