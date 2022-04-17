import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Timer from './Timer';
import TodoList from './TodosFolder/TodoList';

const root = ReactDOM.createRoot(document.querySelector('header'));
root.render(
  <Header />
);

const timerBody = ReactDOM.createRoot(document.querySelector('.timer'));
timerBody.render(
  <Timer />
)

const todoBody = ReactDOM.createRoot(document.querySelector('.todo'))
todoBody.render(
  <TodoList />
)