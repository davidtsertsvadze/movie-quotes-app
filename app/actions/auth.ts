"use server"; // this line means, that this function runs only on server

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try{
        const response = await fetch('{apiUrl}/api/auth/login', {
            method: "POST",
            headers: {
                "Content Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });

        if(!response.ok){
            return { success: false, error: "არასწორი მეილი ან პაროლი" };
        }

        const data = await response.json();
        const token = data.toke;

        // store token into the cookies
        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true, // ბრაუზერის JavaScript ვერ წაიკითხავს, რაც იცავს XSS შეტევებისგან
            secure: process.env.NODE_ENV === "production",
            maxAge: 60*60*24, // 1 დღე  
            path: "/",
        });

    return { success: true };
    } catch (error) {
        return { success: false, error: "სერვერთან კავშირი ვერ დამყარდა" }
    }
}
