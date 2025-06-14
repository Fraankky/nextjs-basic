"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateTodoAction( formData) {
    const _id = formData.get("_id")
    const title = formData.get("title")
    const content = formData.get("content");


    await fetch("https://v1.appbackend.io/v1/rows/UjDUaHABTSbi" , {
          method: "PUT",
          headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({"_id":"","title":"","content":""})
    })

    revalidatePath("/")
    redirect("/")
}
