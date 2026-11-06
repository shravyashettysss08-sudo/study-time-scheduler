"use client";

import type { Subject } from "../app/context/SubjectContext";

type SubjectCardProps = {
  subject: Subject;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function SubjectCard({
  subject,
  onToggle,
  onDelete,
}: SubjectCardProps) {
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{subject.name}</h3>

      <p className="text-sm text-gray-500">
        {subject.duration} minutes
      </p>

      <p className="mt-2">
        {subject.completed ? "Completed" : "Not completed"}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onToggle(subject.id)}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          {subject.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => onDelete(subject.id)}
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}