import React, { useState, useEffect } from 'react';


const App = () => {

    const [todoList, setTodoList] = useState([])

    const handleInput = (e) => {
        if (e.target.value !== '' && e.key === 'Enter') {
            let data = {
                label: e.target.value,
                done: false,
            }
            let aux = todoList.concat(data)
            setTodoList(aux)
            updateData(aux)
            e.target.value = ''
        }
    }

    const handleDeletion = (index) => {
        let aux = todoList.filter(item => item !== todoList[index])
        setTodoList(aux)
        updateData(aux)
    }

    const handleClear = () => {
        let aux = []
        setTodoList(aux)
        deleteData()
        
    }
    
        const createData = async () => {
            try {
                let raw = JSON.stringify([]);
    
                let requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: raw,
                };
    
                const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/diego-sepulveda-lavin', requestOptions)
                const result = await resp.json()
                if(result.result){
                    getData()
                }
    
            } catch (error) {
                console.log(error)
            }
        }

        const deleteData = async () => {
            try {
    
                let requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                };
    
                const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/diego-sepulveda-lavin', requestOptions)
                const result = await resp.json()
                if (result.result){
                    getData()
                }
    
            } catch (error) {
                console.log(error)
            }
        }


    const getData = async () => {
        try {
            const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/diego-sepulveda-lavin')
            const data = await resp.json()
            if(data.msg){
                createData()
            }else {
                setTodoList(data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const updateData = async (lista) => {
        try {

            let raw = JSON.stringify(lista);

            let requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: raw,
            };

            const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/diego-sepulveda-lavin', requestOptions)
            const result = await resp.json()

            if (result.msg){
                getData()
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        return () => {
            
        }
    }, [])


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    <h1 id="titulo" className="animate__animated animate__bounce text-center">TODO List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card text-left paper">
                        <div className="card-body mx-none px-0 py-0">
                            <ul className="list-group">
                                <input type="text" id="input" className="list-group-item" placeholder="What needs to be done?" onKeyPress={handleInput} />

                                {
                                    todoList.length > 0 &&
                                    todoList.map((elemento, index) => {
                                        return (
                                            <li key={index} className="list-group-item animate__animated animate__slideInDown" id="tarea">
                                                {elemento.label}
                                                <button type="button" className="close" aria-label="Close" onClick={() => handleDeletion(index)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </li>)
                                    })
                                }

                            </ul>
                        </div>
                        <div className="card-footer text-muted">
                            {
                                todoList.length > 0 ?
                                    <>
                                        <span>Tasks left </span>
                                        <span className="badge badge-warning badge-pill">{todoList.length}</span>
                                    </>
                                    : `There is no pending tasks`
                            }
                            <button className="btn btn-primary ml-5" onClick={handleClear}>Clean tasks</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
