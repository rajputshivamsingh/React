import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([])
  const [showFinised, setshowFinised] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinised(!showFinised);
  }
  


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(newTodos);
    // saveTodos()
    saveToLS()
  }

  const handleDelete = (e, id) => {
    // const id =  e.target.name
    // console.log(id)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    // saveTodos()
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    // console.log(todos)
    // saveTodos()
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name
    // console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    // console.log(newTodos)
    // saveTodos()
    saveToLS()
  }


  return (
    <>
      <Navbar />

      <div className=" md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">

        <h1 className="font-bold text-center text-2xl">iTalk - Manage your todos at one place</h1>

        <div className="addTodo my-5">
          <h2 className='text-lg font-bold my-2'>Add a Todo</h2>

          {/* <div className='flex'> </div> */}
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 my-3 text-sm font-bold text-white rounded-md '>Save</button>
        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinised} /> <span className="font-bold text-lg mx-2">Show Finished</span>

        <h2 className='text-lg font-bold my-4'>Your Todos</h2>

        <div className="todos">

          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}

          {todos.map(item => {

            return (showFinised || !item.isCompleted)&& <div key={item.todo} className="todo flex  my-3 justify-between">

              <div className='flex gap-5'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />

                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>

            </div>
          })}

        </div>


      </div>


    </>
  )
}

export default App
