"use client";

import { useState } from "react";
import { submitContactMessage } from "@/actions/contact";

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };
    try {
      await submitContactMessage(data);
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 mt-10 bg-white p-8 rounded-3xl shadow-xl">
      <div>
        <label className="block text-sm font-semibold mb-2 text-[#4a3f35]">Name</label>
        <input name="name" required type="text" className="w-full p-4 rounded-xl border border-[#d4a373]/30 bg-[#fdfbf7] text-[#4a3f35] focus:outline-none focus:ring-2 focus:ring-[#d4a373] transition-all" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-[#4a3f35]">Email</label>
        <input name="email" required type="email" className="w-full p-4 rounded-xl border border-[#d4a373]/30 bg-[#fdfbf7] text-[#4a3f35] focus:outline-none focus:ring-2 focus:ring-[#d4a373] transition-all" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-[#4a3f35]">Message</label>
        <textarea name="message" required rows={5} className="w-full p-4 rounded-xl border border-[#d4a373]/30 bg-[#fdfbf7] text-[#4a3f35] focus:outline-none focus:ring-2 focus:ring-[#d4a373] transition-all"></textarea>
      </div>
      <button disabled={status === "loading"} type="submit" className="w-full py-4 bg-[#4a3f35] text-[#fdfbf7] font-semibold rounded-xl hover:bg-[#d4a373] transition-colors disabled:opacity-70 font-accent tracking-widest uppercase">
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && <p className="text-[#d4a373] text-center font-bold mt-4">Thank you! Your message has been sent.</p>}
      {status === "error" && <p className="text-red-600 text-center font-bold mt-4">Oops! Something went wrong. Please try again.</p>}
    </form>
  );
}
