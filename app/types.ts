export type Task = {
    id: string;
    description: string;
    isComplete: boolean;
};

export type TaskItemProps = {
    id: string;
    description: string;
    isComplete: boolean;
    toggleComplete: (id: string) => void;
};