/// <reference types="react" />
export interface TodoListInterface {
    todos: Todo[];
}
export interface TodoListStateInterface {
    todos: Todo[];
}
export interface TodoItemInterface {
    todo: Todo;
    updateHandler: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    removeHandler: (id: string, cb: void) => void;
    completeHandler: (id: string) => void;
    exportHandler: (id: string, cb: void) => void;
}
export interface TodoItemStateInterface {
    dialogueOpen: boolean;
}
export interface TodoScreenInterface {
    todos: Todo[];
}
export interface TodoScreenStateInterface {
    id: string;
    todo: Todo;
}
export interface AutoCompleteItemPropsInterface {
    description: string;
    selectHandler: (id: string) => void;
    searchRow: AutoCompleteSearchRow;
    item: AutoCompleteDeviceItem;
    onClick: (event: React.MouseEvent<HTMLLIElement>, indexKey: number, item: AutoCompleteDeviceItem) => void;
}
export interface AutoCompletePropsInterface {
    threshold: number;
    onChange: (id: string) => void;
    onBlur: (id: string) => void;
    onClick: (id: string) => void;
    index: number;
    searchRow: AutoCompleteSearchRow;
}
