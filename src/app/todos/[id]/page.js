import Link from "next/link";
import { DeleteBtn } from "@/components/form";

async function getTodo(id) {
  try {
    const res = await fetch("https://v1.appbackend.io/v1/rows/QfCptJEpHB3X");
    if (!res.ok) {
      throw new Error('Failed to fetch todo');
    }
    const data = await res.json();
    return data.data.find(todo => todo._id === id);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return null;
  }
}

export default async function TodoDetailPage({ params }) {
  const { id } = params;
  const todo = await getTodo(id);

  if (!todo) {
    return (
      <main className="max-w-3xl mx-auto my-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Todo Not Found</h1>
          <Link href="/" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto my-12 px-4">
      <div className="mb-6">
        <Link href="/" className="text-indigo-500 hover:text-indigo-600">
          ← Back to Home
        </Link>
      </div>
      
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{todo.title}</h1>
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-wrap">{todo.content}</p>
          </div>
          <div className="flex gap-2 pt-4 border-t">
            <Link 
              href={`/todos/${todo._id}/edit`}
              className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 text-sm"
            >
              Edit
            </Link>
            <DeleteBtn id={todo._id} />
          </div>
        </div>
      </div>
    </main>
  );
}