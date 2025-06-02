export interface Task {
    id: number, // unique identifier for the task
    title: string, // cannot be empty
    description: string, // cannot be empty
    priority: 'low' | 'medium' | 'high', // optional, default is 'low'
    dueDate: string | null, // ISO date string or null
    done: boolean, // true if the task is completed, false otherwise
    createdAt: string, // ISO date string or null
    updatedAt: string  // ISO date string or null
}
