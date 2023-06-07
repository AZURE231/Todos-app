import { prisma } from "@/db";
import { TodoItem } from "./TodoItem";

async function toggleTodo(id:string, complete:boolean){
    "use server"
    await prisma.todo.update({where: {id}, data:{complete}})
  }

export function TodoList(todos){
    return(
        <>
            <div className="border-solid border-2 border-slate-500 w-80 bg-slate-700 rounded-2xl shadow-2xl p-5">
                <ul className="pl-4">
                {todos.map(todo =>(
                    <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
                ))}
                </ul>
            </div>
        </>
    )
}