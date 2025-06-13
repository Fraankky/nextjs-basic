"use client";

import { useActionState } from "react";
import { createTodoAction, deleteTodoAction } from "./action";

export const CreateForm = () => {
  const [state, action, pending] = useActionState(createTodoAction, null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Todo</h2>
      <form action={action} className="space-y-4">
        <div>
          <input 
            name="title" 
            placeholder="Title" 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <textarea 
            name="content" 
            placeholder="Content" 
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button 
          disabled={pending}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Creating..." : "Create Todo"}
        </button>
        {state?.status === "error" && (
          <div className="text-red-500 text-sm mt-2">{state?.message}</div>
        )}
        {state?.status === "success" && (
          <div className="text-emerald-500 text-sm mt-2">{state?.message}</div>
        )}
      </form>
    </div>
  );
};

export const DeleteBtn = ({ id }) => {
  const [state, action, pending] = useActionState(deleteTodoAction, null);

  return (
    <div>
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <button 
          disabled={pending}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          onClick={(e) => {
            if (!confirm('Are you sure you want to delete this todo?')) {
              e.preventDefault();
            }
          }}
        >
          {pending ? "Deleting..." : "Delete"}
        </button>
      </form>
      {state?.status === "error" && (
        <div className="text-red-500 text-xs mt-1">{state?.message}</div>
      )}
    </div>
  );
};