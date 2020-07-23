

export interface Todos {
    org : string[];
    people : string[];
    place : string[];
    text: string;
    time: string;
};

export interface TodosID {
    entry: Todos;
    id: string;
};

export type TodosList = TodosID[];