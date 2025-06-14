"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTodoAction(formData) {
    const id = formData.get("id")
    const title = formData.get("title")
    const content = formData.get("content");


    await fetch("https://v1.appbackend.io/v1/rows/UjDUaHABTSbi" , {
          method: "PUT",
          headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({ _id: id, title, content, image: " "})
    })

    revalidatePath("/")

    redirect("/")
}
