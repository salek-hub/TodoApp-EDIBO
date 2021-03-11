import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const ListNames = ({ todos, callbackDelete, callbackUpdate }) => {

    // Hook
    const [state, setState] = useState({
        open: false,
        todo: '',
        idp: 0
    });
    const { open, todo, idp } = state;

    // Callback Handles
    const deleteOne = (id, e) => {
        callbackDelete(id); // Envio la el id al padre
    }
    const updateOne = (id, e) => {
        callbackUpdate(idp, todo)
        setState({
            open: false,
            todo: ''
        })
    }

    // Handles
    const handleOnChange = (e) => { // Input
        setState({
            open: open,
            todo: e.target.value,
            idp
        })
    }
    const handleClose = () => { // Close Modal
        setState({
            open: false,
            idp
        });
    }
    const handleShow = (id) => { // Open Modal
        setState({
            open: true,
            idp: id
        })
    };

    return (
        <div>
            <ul>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Todo</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((object, i) => {
                                return (
                                    <tr key={object.id}>
                                        <td>{object.todo}</td>
                                        <td>
                                            <Button variant="danger" className='btn-delete' type="submit" onClick={(e) => deleteOne(object.id, e)}>
                                                Delete
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="warning" onClick={(e) => handleShow(object.id)}>
                                                Edit
                                            </Button>
                                            <Modal
                                                show={open}
                                                onHide={handleClose}
                                                backdrop="static"
                                                keyboard={false}
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Modal title</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Control onChange={handleOnChange} type="email" name="todo" placeholder="Enter todo name" />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={(e) => updateOne(object.id)}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>

            </ul>
        </div>
    );
}

export default ListNames;