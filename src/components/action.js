"use server";

import { revalidatePath } from "next/cache";

export async function createTodoAction(_, formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  // simple validation
  if (!title || !content) {
    return {
      status: "error",
      message: "title and content are required",
    };
  }

  try {
    // take time
    await fetch("https://v1.appbackend.io/v1/rows/UjDUaHABTSbi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ title, content, image: "" }]),
    });

    revalidatePath("/");
    return {
      status: "success",
      message: "Todo has been added!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create todo. Please try again.",
    };
  }
}

export async function deleteTodoAction(_, formData) {
  const todoId = formData.get("id");

  if (!todoId) {
    return {
      status: "error",
      message: "Todo ID is required",
    };
  }

  try {
    await fetch("https://v1.appbackend.io/v1/rows/UjDUaHABTSbi", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([todoId]),
    });

    revalidatePath("/");
    return {
      status: "success",
      message: "Todo deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete todo. Please try again.",
    };
  }
}