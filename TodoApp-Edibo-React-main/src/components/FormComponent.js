import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListNames from './list-names';
import { Form, Button } from 'react-bootstrap';

const BASE_URL = "http://localhost:4000/todos";
const FormComponent = () => {

    /**
     * HOOKS
     **************************************/
    // useState
    const [state, setState] = useState({
        name: '',
        todos: []
    });
    const { name, todos: todos } = state;

    // useEffect
    useEffect(() => {
        axios.get(BASE_URL).then(res => {
            const data = res.data;
            setState({
                name: [...name],
                todos: data
            });
        });
    }, state);


    /**
     * HANDLES
     **************************************/
    // Evento de cambio en el input
    const handleChange = (e) => {
        setState({
            name: e.target.value,
            todos: todos
        });
    }

    // Submit de creación
    const handleSubmit = (e) => {
        e.preventDefault();
        const newObject = {
            "todo": name,
            "author": "Óscar",
            "done": false
        }
        axios.post(BASE_URL, newObject)
            .then(res => {
                setState({
                    name: '',
                    todos: [...todos, res.data]
                })
            });
    }

    // Callback para traer el id del hijo y eliminarlo
    const callBackDelete = (id) => {
        console.log(id);
        axios.delete(BASE_URL + `/${id}`).
            then(res => {
                console.log(res)
                setState({
                    name: '',
                    todos: [...todos.filter(e => e.id !== id)]
                });
            }
            );
    }

    // Callback para traer el id y el body del hijo y actualizarlo
    const callbackUpdate = (id, body) => {
        console.log(id);
        const newObject = {
            "todo": body,
            "author": "Óscar",
            "done": false
        }
        axios.put(BASE_URL + `/${id}`, newObject)
            .then(res => {
                console.log(res);
                axios.get(BASE_URL).
                    then(get => {
                        setState({
                            name: '',
                            todos: get.data
                        })
                    })
            })
    }

    return (
        <div>
            <form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" name="todo" value={name} onChange={handleChange} placeholder="Enter todo name" />
                </Form.Group>
                <Button variant="primary" className='mb-3' type="submit" onClick={handleSubmit}>
                    Add
                </Button>
            </form>
            <ListNames todos={todos} callbackDelete={callBackDelete} callbackUpdate={callbackUpdate}></ListNames>
        </div>
    )
}

export default FormComponent;