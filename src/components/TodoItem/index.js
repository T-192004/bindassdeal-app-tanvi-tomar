import { FcTodoList } from "react-icons/fc";
import './index.css'
import { MdDelete } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";

const TodoItem = props => {
    const {todoItem, checkCompletedTask, deleteTodoItem} = props;
    const {title,
        todo,
        tag,
        date,
        id,
        isCompleted} = todoItem;
    const isDone = isCompleted ? 'completed': ''
    console.log(todoItem);
    const onClickTodoIcon = () => {
        checkCompletedTask(id);
    };
    const onClickDeleteItem = () => {
        deleteTodoItem(id);
    };
    return (
        <li className="todo-item">
        <div className="left-section">
            <button onClick={onClickTodoIcon} className="todo-done-btn">
                <FcTodoList className="todo-icon" />
            </button>
            <div className={`todo-content ${isDone}`}>
            <div className="todo-item-header">
                <h1 className="todo-title">{title} </h1>
                <CiShoppingTag className="todo-tag-icon" />
                <p className="todo-tag">{tag}</p>
            </div>
                <p className="todo-descp">{todo}</p>
                <p className="todo-item-date">{date}</p>
            </div>
            </div>
            <button className="todo-done-btn" onClick={onClickDeleteItem}>
                <MdDelete className="dlte-icon" />
            </button>
        </li>
    )
}

export default TodoItem;