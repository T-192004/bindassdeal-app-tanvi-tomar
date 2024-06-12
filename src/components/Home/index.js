import { useState, useEffect} from 'react';
import Header from '../Header'
import {v4 as uuidv4} from 'uuid';
import TodoItem from '../TodoItem'
import './index.css'

const Home = () => {
  const todoListLocalStorage = JSON.parse(localStorage.getItem('list'));
  console.log(todoListLocalStorage);
  const [todoList, setTodoList] = useState(todoListLocalStorage !== null ? todoListLocalStorage : []);
  const [tag, setTag] = useState('Education');
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const isEmpty = todoList.length === 0;

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(todoList));
  }, [todoList]);

  const deleteTodoItem = id => {
    const filteredList = todoList.filter(todo => todo.id !== id);
    setTodoList(filteredList);
  }

  const onAddTodo = () => {
    const newTodo = {
        id: uuidv4(),
        title,
        todo,
        tag,
        date: getCurrentDate(),
        isCompleted: false,
    };
    setTodoList(prev => [...prev, newTodo]);
    setTag('Education');
    setTitle('');
    setTodo('');
  }
  const checkCompletedTask = id => {
  setTodoList(prev => prev.map(eachtodo => {
      if (eachtodo.id === id) {
        return {...eachtodo, isCompleted: !eachtodo.isCompleted};
      }
      return eachtodo;
    }))
  }
  const renderEmptyContainer = () => (
    <div className='empty-list-container'>
        <img
          className='empty-list-img'
          alt="empty list"
          src="https://img.freepik.com/premium-vector/man-large-notepad-large-notebook-concept-filling-notebook-notepad-writing-notes-time-management-planning_531064-11003.jpg?w=826"
        />
        <h1 className='empty-list-heading'>No Task Added</h1>
        <p className='empty-list-descp'>Let's ! Add a task, take one more step towards your goal.</p>
    </div>
  );

  const renderTodoList = () => (
    <div className='todo-list-container'>
        <ul className='todo-list'>
            {todoList.map(todoItem => <TodoItem todoItem={todoItem} deleteTodoItem={deleteTodoItem} checkCompletedTask={checkCompletedTask} key={todoItem.id} />)}
        </ul>
    </div>
  );
  return (
    <>
        <Header />
        <div className='home-container'>
            <h1 className='main-heading'>Todo List</h1>
            <div className='todo-container'>
                {isEmpty ? renderEmptyContainer() : renderTodoList()}
                <div className='add-task-container'>
                    <h1 className='add-task-heading'>Create a New Task</h1>
                    <div className='task-input-container'>
                        <label className='task-label' htmlFor='taskTitle'>Title: </label>
                        <input 
                          className='task-input-box'
                          id="taskTitle"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          placeholder='Add Title'
                          required
                        />
                    </div>
                    <div className='task-input-container'>
                        <label className='task-label' htmlFor='taskTodo'>Todo: </label>
                        <input 
                          className='task-input-box'
                          id="taskTodo"
                          value={todo}
                          onChange={e => setTodo(e.target.value)}
                          placeholder='Add Todo'
                          required
                        />
                    </div>
                    <div className='task-input-container'>
                        <label className='task-label' htmlFor='taskTag'>Add Tag: </label>
                        <select id="options" className='task-input-box' value={tag} onChange={e => setTag(e.target.value)}>
                            <option className='task-label' value="Education">Education</option>
                            <option className='task-label' value="Entertainment">Entertainment</option>
                            <option className='task-label' value="Office">Office</option>
                            <option className='task-label' value="School">School</option>
                            <option className='task-label' value="Others">Others</option>
                        </select>
                    </div>
                    <button className='add-todo-btn' onClick={onAddTodo}>Add Todo</button>
                </div>
            </div>
        </div>
    </>
);
};

export default Home
