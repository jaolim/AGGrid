import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TodoList() {

    const [columnDefs, setColumnDefs] = useState([
        { field: 'description', sortable: true, filter: true, floatingFilter: true, wrapText: true, autoHeight: true },
        { field: 'date', filter: true, floatingFilter: true },
        {
            field: 'priority', filter: true, floatingFilter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        }
    ]);
    const [todos, setTodos] = useState([]);
    const [userInput, setUserInput] = useState({ description: '', date: '', priority: '' });
    const gridRef = useRef();


    const handleChange = (event) => {
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    };

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
            alert('Select a row first!');
        }
    }

    const addTodo = () => {
        if (!userInput.description) {
            alert("Missing description");
        } else {
            setTodos([...todos, { description: userInput.description, priority: userInput.priority, date: userInput.date }]);
            setUserInput({ description: '', priority: '', date: '' });
        }
    };

    return (
        <>
            <h1>AG-Grid Todolist</h1>
            <p>
                Description:<input placeholder="Description" name="description" onChange={handleChange} value={userInput.description} />
                Date:<input placeholder="Date" name="date" onChange={handleChange} value={userInput.date} />
                Priority:<input placeholder="Priority" name="priority" onChange={handleChange} value={userInput.priority} />
                <button name="add" onClick={addTodo}>Add</button>
                <button name="delete" onClick={handleDelete}>Delete</button>
            </p>
            <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                <AgGridReact
                    animateRows="true" //on by default but changing this value to false is the way to toggle it off
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowData={todos}
                    columnDefs={columnDefs}
                    rowSelection="single"
                />
            </div>
        </>
    );
}

export default TodoList;