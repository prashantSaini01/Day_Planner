import React, { useState } from "react";
import axios from 'axios';

function Create({ fetchTodos }) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (task.trim()) {
            axios.post('http://localhost:3001/add', { task: task })
                .then(result => {
                    setTask(''); // Clear the input field
                    fetchTodos(); // Fetch the updated list of todos
                })
                .catch(err => console.log(err));
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter a Task"
                value={task}
                onChange={(event) => setTask(event.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
