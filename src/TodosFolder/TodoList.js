import React, {useEffect, useState, useRef} from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

const LOCAL_STORAGE_KEY = 'todoList.todos'


function TodoList() {
    const [todos, setTodos] = useState([])
    const todoRefName = useRef()

    // Сохраняем список в local storage, чтобы после 
    // перезагрузки страницы они не удалились
    useEffect(() => {
        const storageTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storageTodo) setTodos(storageTodo)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) return

        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
    }

    const editTodo = (id, newText) => {
        if (!newText.text || /^\s*$/.test(newText.text)) return

        setTodos(prev => prev.map(item => (item.id === id ? newText : item)))
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })

        setTodos(updatedTodos)
    }

    return (
        <div>
            <h1 className='todo__header'>Мои планы</h1>
            <TodoForm ref={todoRefName} onSubmit={addTodo} />
            <Todo
                removeTodo={removeTodo}
                todos={todos}
                completeTodo={completeTodo}
                editTodo={editTodo}
            />
        </div>
    )
}

export default TodoList