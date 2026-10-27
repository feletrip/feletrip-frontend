"use client";

import { useState } from "react";
import Image from "next/image";

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
  date: string;
  time: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Moris Barbar",
      email: "moris@example.com",
      comment:
        "Interactively visualize top-line internal or \"organic\" sources rather than top-line niche mark unleash 24/7 opportunities after high standards in process improvements. Uniquely deploy methodologies with reliable information.",
      date: "August 10, 2023",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "Sophie Lane",
      email: "sophie@example.com",
      comment:
        "Interactively visualize top-line internal or \"organic\" sources rather than top-line niche mark unleash 24/7 opportunities after high standards in process improvements. Uniquely deploy methodologies with reliable information.",
      date: "August 10, 2023",
      time: "11:45 AM",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [comment, setComment] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return { date, time };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim()) return;

    const { date, time } = getCurrentDateTime();
    const newComment: Comment = { id: Date.now(), name, email, comment, date, time };
    setComments([...comments, newComment]);
    setComment("");
    if (!saveInfo) {
      setName("");
      setEmail("");
      setPhone("");
      setWebsite("");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm text-neutral-700 dark:text-neutral-200 placeholder-neutral-400 outline-none focus:border-[#c9a96e] transition-colors duration-200";

  return (
    <div style={{ fontFamily: "'Jost', sans-serif" }}>

      {/* ===================== */}
      {/* Section heading */}
      {/* ===================== */}
      <h2
        className="text-sm tracking-[0.15em] uppercase text-neutral-800 dark:text-neutral-100 mb-1 font-normal"
      >
        {comments.length} Comment{comments.length !== 1 ? "s" : ""}
      </h2>
      <div className="w-8 h-px bg-[#c9a96e] mb-7" />

      {/* ===================== */}
      {/* Comments List */}
      {/* ===================== */}
      <div className="space-y-7 mb-10">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-4">
            {/* Avatar */}
            <div className="shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=200&auto=format&fit=crop"
                alt={c.name}
                width={46}
                height={46}
                className="object-cover grayscale-[10%]"
                style={{ aspectRatio: "1/1" }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 border-b border-neutral-100 dark:border-neutral-800 pb-7">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-neutral-800 dark:text-neutral-100"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
                >
                  {c.name}
                </span>
                <button
                  className="text-[10px] tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#b8935a] transition-colors font-light"
                >
                  Reply
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 mb-3 tracking-wide font-light">
                {c.date} — {c.time}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                {c.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== */}
      {/* Leave a Comment Form */}
      {/* ===================== */}
      <h2 className="text-sm tracking-[0.15em] uppercase text-neutral-800 dark:text-neutral-100 mb-1 font-normal">
        Leave a Comment
      </h2>
      <div className="w-8 h-px bg-[#c9a96e] mb-7" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
            className={inputClass}
            style={{ fontWeight: 300 }}
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClass}
            style={{ fontWeight: 300 }}
            required
          />
        </div>

        {/* Phone + Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className={inputClass}
            style={{ fontWeight: 300 }}
          />
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Your Website"
            className={inputClass}
            style={{ fontWeight: 300 }}
          />
        </div>

        {/* Save info checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="w-3.5 h-3.5 accent-[#c9a96e]"
          />
          <span className="text-xs text-neutral-400 font-light">
            Save your email info in the browser for next comments.
          </span>
        </label>

        {/* Textarea */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your Comment"
          rows={5}
          className={inputClass}
          style={{ fontWeight: 300, resize: "none" }}
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="px-8 py-3 bg-primary cursor-pointer text-white text-xs tracking-[0.18em] uppercase hover:bg-[#b8935a] transition-colors duration-200"
          style={{ fontWeight: 400 }}
        >
          Post Comment →
        </button>
      </form>
    </div>
  );
}