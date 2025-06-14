import { CreateForm, DeleteBtn } from "@/components/form";
import Link from "next/link";

async function getTodos() {
  try {
    const res = await fetch("https://v1.appbackend.io/v1/rows/UjDUaHABTSbi", {
      cache: 'no-store' // untuk data yang sering berubah
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return { data: [] };
  }
}

export default async function Home() {
  const todolist = await getTodos();

  return (
    <main className="max-w-3xl mx-auto my-12 space-y-12 px-4">
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
        <CreateForm />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Todos</h2>
        {todolist.data && todolist.data.length > 0 ? (
          <div className="space-y-4">
            {todolist.data.map((todo) => {
              return (
                <div key={todo._id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-900">{todo.title}</h3>
                    <p className="text-gray-600">{todo.content}</p>
                    <div className="flex gap-2 pt-2">
                      {todo._id && (
                        <Link 
                          href={`/todos/${todo._id}`} 
                          className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 text-sm transition-colors"
                        >
                          View Details
                        </Link>
                      )}
                      <DeleteBtn id={todo._id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No todos yet. Create your first todo above!</p>
          </div>
        )}
      </div>
    </main>
  );
}