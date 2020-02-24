/* 
    This file contains all of the interface definitions for each component in this project
*/

// the interface for the props of a todo list
export interface TodoListInterface {
    todos : Todo[];
}

export interface TodoListStateInterface{
    todos: Todo[];
}

// the interface for the props of a do list item
export interface TodoItemInterface{
    todo : Todo;
    updateHandler : ( event : React.ChangeEvent<HTMLInputElement>, id : string ) => void;
    removeHandler : ( id: string, cb : void ) => void;
    completeHandler : ( id : string ) => void;
    exportHandler : ( id : string, cb : void ) => void;
}

// the interface for the state of a todo list item
export interface TodoItemStateInterface{
    dialogueOpen : boolean;
}


// the interface for the props of a todo screen
export interface TodoScreenInterface{
    todos:Todo[]
}

export interface TodoScreenStateInterface{
    id : string
    todo : Todo
}

export interface AutoCompleteItemPropsInterface{
    description : string;
    selectHandler : ( id : string ) => void;
    searchRow : AutoCompleteSearchRow;
    item : AutoCompleteDeviceItem;
}

export interface AutoCompletePropsInterface{
    threshold : number;
    onChange : ( id : string ) => void;
    onBlur : ( id : string ) => void;
    onClick : ( id : string ) => void;
    index : number;
    searchRow : AutoCompleteSearchRow;
}