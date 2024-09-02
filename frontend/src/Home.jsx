import React, { useEffect, useState } from "react";
import Create from "./Create";
import './App.css';
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, done: !todo.done } : todo
                ));
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>Day Planner</h2>
            <Create fetchTodos={fetchTodos} />
            {
                todos.length === 0 ?
                    <div><h2>No Records</h2></div>
                    :
                    todos.map((todo) => (
                        <div key={todo._id} className="task">
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {todo.done ? <BsFillCheckCircleFill className="icon" /> : <BsCircleFill className="icon" />}
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
