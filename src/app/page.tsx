import { TodoItem } from "@/components/TodoItem"
import { prisma } from "@/db"
import Link from "next/link"
import { TodoList } from "@/components/TodoList"
import { DoneList } from "@/components/DoneList"

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id:string, complete:boolean){
  "use server"
  await prisma.todo.update({where: {id}, data:{complete}})
}

export default async function Home() {
  const todos = await getTodos()
  return (
    <>
      <header className="flex justify-between items-center mb-4"> 
        <h1 className="text-2xl">Todos</h1>
        <Link 
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new">New</Link>
      </header>
      {/* <TodoList todos={todos}/> */}
      <div className="grid grid-cols-2 place-content-center h-48">
        <div className="justify-self-center border-solid border-2 border-slate-500 w-80 bg-slate-700 rounded-2xl shadow-2xl p-5">
          <ul className="pl-4">
            {todos.map(todo =>(
              <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
            ))}
          </ul>
        </div>
        <DoneList/>
      </div>
      
      
    </>
    
  )
}
