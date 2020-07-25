
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

export interface PostData{
    date: string;
    text: string;
    time: string;
}

export interface PostDateID{
    id: string;
    pd: PostData
}

export interface Navigation {
    
    navigate: (route: string, params?: any) => void;
    navigation: {
        
        push: (route: string) => void;
        goBack: () => void;
        addListener: (focus: string, callback: () => void) => void;
    };
    route: {
        params: any;
    };
}