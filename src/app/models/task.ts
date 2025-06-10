export interface Task {
    id: number | undefined, // unique identifier for the task
    title: string, // cannot be empty
    description: string, // cannot be empty
    priority: 'LOW' | 'MEDIUM' | 'HIGH', // optional, default is 'LOW'
    dueDate: string | null, // ISO date string or null
    done: boolean, // true if the task is completed, false otherwise
    createdAt: string, // ISO date string or null
    updatedAt: string  // ISO date string or null
}
