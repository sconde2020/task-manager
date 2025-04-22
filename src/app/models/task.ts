export interface Task {
    id: number,
    title: string,
    description: string,
    done: boolean,
    createdAt: string, // ISO date string
    updatedAt: string  // ISO date string
}
