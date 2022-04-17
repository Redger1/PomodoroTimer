import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '')

    const inputFocus = useRef(null)
    // Автофокус на инпут
    useEffect(() => {
        inputFocus.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        props.onSubmit({
            id: uuidv4(),
            text: input
        })

        setInput('')
    }

    return(
        <form className="todo__form" onSubmit={handleSubmit}>
            {props.edit ? (
            <>
                <input
                    placeholder='Обновить'
                    name="text"
                    value={input}
                    className="todo__input"
                    onChange={handleChange}
                    ref={inputFocus}
                />
                <button onClick={handleSubmit} className="todo__button">Обновить</button>
            </> ) : (
            <>
                <input
                    placeholder='Добавить дело'
                    name="text"
                    value={input}
                    className="todo__input"
                    onChange={handleChange}
                    ref={inputFocus}
                />
                <button onClick={handleSubmit} className="todo__button">Добавить</button>
            </> )
            }
            
        </form>
    )
}

export default TodoForm