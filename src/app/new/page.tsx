import Link from "next/link";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

async function createTodo(data:FormData) {
    "use server"
    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0){
        throw new Error("Invalid Tittle")
    }
    await prisma.todo.create({data : {title, complete: false}})
    redirect("/")
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      {/* form to take user todos */}
      <form 
        action={createTodo} 
        className="flex gap-2 flex-col">
        <div className="flex justify-center">
          <input
            type="text"
            name="title"
            className="border border-slate-300 bg-transparent rounded p-2 w-1/2 outline-none focus-within:border-slate-100"
          />
        </div>
        
        <div className="flex gap-1 justify-end">
          {/* cancel button to take user back */}
          <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded
         hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
          {/* button to submit form */}
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded
         hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
