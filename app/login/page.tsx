"use client" // რადგან გვჭირდება ინტერაქცია, ფორმის საბმიტი და ვეითინგი

import {useState} from "react";
import {useRouter} from "next/navigation";
import {loginAction} from "@/app/actions/auth";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault(); // ბრაუზერის სტანდარტული გვერდის გადატვირთვის გაუქმება
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await loginAction(formData);

        if(result.success) {
            // თუ ლოგინი წარმატებულია , გადავიყვანოთ ადმინში
            router.push("/admin");
            router.refresh();
        } else {
            setError(result.error || "დაფიქსირდა შეცდომა");
            setLoading(false); // ღილაკი ისევ აქტიური გავხადოთ  
        }
    }

    return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <h1 className="text-center text-2xl font-bold tracking-tight">ადმინ პანელში შესვლა</h1>
        
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-400">ელ-ფოსტა</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-gray-800 bg-gray-950 p-3 text-white focus:border-amber-500 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400">პაროლი</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full rounded-lg border border-gray-800 bg-gray-950 p-3 text-white focus:border-amber-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 p-3 font-semibold text-gray-950 transition hover:bg-amber-400 disabled:bg-gray-700 disabled:text-gray-400"
          >
            {loading ? "მიმდინარეობს შემოწმება..." : "შესვლა"}
          </button>
        </form>
      </div>
    </main>
  );
}   