import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import "../style/todolists.scss";

export default function TodoLists() {
    let initTodo;
    if (localStorage.getItem("todos") === null) {
        initTodo = [];
    }
    else {
        initTodo = JSON.parse(localStorage.getItem("todos"));
    }
    const [todos, setTodos] = useState(initTodo);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const submit = (e) => {
        e.preventDefault();
        console.log('submit button clicked');
        if (!title || !desc) {
            alert('please enter Title and Description');
        } else {
            addTodo(title, desc);
            setTitle('');
            setDesc('');
        }
    }

    const addTodo = (title, desc) => {
        console.log('adding List...');
        let sno;
        if (todos.length === 0) {
            sno = 0;
        } else {
            sno = todos[todos.length - 1].sno + 1;
        }
        const myTodo = {
            sno: sno,
            title: title,
            desc: desc
        }
        setTodos([...todos, myTodo]);
        console.log(myTodo);
    }

    const onDelete = (todo) => {
        setTodos(todos.filter((e) => {
            return e != todo;
        }))
        console.log('deleted',todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    return (
        <>
            <Helmet>
                <title>React App | Todo Lists</title>
            </Helmet>
            <div className='container my-3 pt-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='todo_lists_box mt-5'>
                            <h3 className="mb-3">Add Todo Lists</h3>
                            <div className='forms_container'>
                                <form onSubmit={submit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="title" placeholder="Enter Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="desc">Password</label>
                                        <input type="text" className="form-control" id="desc" placeholder="Enter Description" value={desc} onChange={(e) => {setDesc(e.target.value)}} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add Todo</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='todo_lists_box mt-5'>
                            <h3 className="mb-3">Todos List</h3>
                            {todos.length === 0 ? "No Todos to display" :  
                                (
                                    todos.map((todo) => {
                                        console.log(todo.sno);
                                        return (
                                            <>
                                                <div className='mb-3' key={todo.sno}>
                                                    <h4 className='mb-1 title'>Title: {todo.title}</h4>
                                                    <p className='mb-1 desc'>Description: {todo.desc}</p>
                                                    <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
                                                </div>
                                                <hr/>
                                            </>
                                            )
                                        })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}  






