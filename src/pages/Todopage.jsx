import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Todopage = () => {
  const [todos, setTodos] = useState([])
  const [todo,setTodo] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadTodo()
  }, [])

  const loadTodo = async () => {
    const response = await api.get('/todo/api/todos')
    setTodos(response.data)
  }

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todo/api/deleteTodoById/${id}`)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const createTodo = async (event) =>{
    event.preventDefault()
    const title = todo.trim()
    if (!title) return

    try{
      const response =await api.post('/todo/api/create',{
        title
      })
      setTodos(prev => [...prev],response.data)
      setTodo('')
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const toggleTodo = async(todo)=>{
    try{
      const updatedTodo = {
        ...todo,
        completed: !todo.completed
      }
      await api.put('/todo/api/updateTodo',updatedTodo)

      setTodos(prev=>
        prev.map(item=>{
          item.id == todo.id ? updatedTodo : item
        })
      )
    }
    catch(error){
      console.error('Error updating todo:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <main className="todo-page">
      <section className="todo-shell">
        <header className="todo-header">
          <div>
            <p className="eyebrow">Task manager</p>
            <h1>Todo List</h1>
            <p className="muted">Plan the day, check things off, keep moving.</p>
          </div>
          <button className="secondary-button" type="button" onClick={logout}>
            Logout
          </button>
        </header>

        <form className="todo-form" onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Add a new task"
            value={todo}
            onChange={e=>setTodo(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="todo-stats">
          <span>{todos.length} total</span>
          <span>{remainingCount} active</span>
          <span>{completedCount} done</span>
        </div>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">No tasks yet. Add one above.</li>
          ) : (
            todos.map((todo) => (
              <li className={todo.completed ? 'todo-item completed' : 'todo-item'} key={todo.id}>
                <label>
                  <input type="checkbox" checked={todo.completed} onChange={()=>toggleTodo(todo)}/>
                  <span>{todo.title}</span>
                </label>
                <button className="delete-button" type="button" onClick={()=>deleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  )
}

export default Todopage
