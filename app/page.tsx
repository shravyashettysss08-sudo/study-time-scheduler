"use client";

import { useState, useEffect } from "react";

type Subject = {
  id: number;
  name: string;
  duration: number;
  completed: boolean;
};

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [duration, setDuration] = useState("30");
  const [loaded, setLoaded] = useState(false);

  // Load subjects from LocalStorage
  useEffect(() => {
    try {
      const savedSubjects = localStorage.getItem("subjects");

      if (savedSubjects) {
        setSubjects(JSON.parse(savedSubjects));
      }
    } catch (error) {
      console.error("Error loading subjects:", error);
    }

    setLoaded(true);
  }, []);

  // Save subjects to LocalStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("subjects", JSON.stringify(subjects));
    }
  }, [subjects, loaded]);

  // Add Subject
  function addSubject() {
    if (subjectName.trim() === "") {
      alert("Please enter a subject name!");
      return;
    }

    const newSubject: Subject = {
      id: Date.now(),
      name: subjectName.trim(),
      duration: Number(duration),
      completed: false,
    };

    setSubjects((previousSubjects) => [
      ...previousSubjects,
      newSubject,
    ]);

    setSubjectName("");
    setDuration("30");
  }

  // Complete or Undo Subject
  function completeSubject(id: number) {
    setSubjects((previousSubjects) =>
      previousSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              completed: !subject.completed,
            }
          : subject
      )
    );
  }

  // Delete Subject
  function deleteSubject(id: number) {
    setSubjects((previousSubjects) =>
      previousSubjects.filter((subject) => subject.id !== id)
    );
  }

  // Total Subjects
  const totalSubjects = subjects.length;

  // Total Study Time
  const totalMinutes = subjects.reduce(
    (total, subject) => total + subject.duration,
    0
  );

  // Completed Subjects
  const completedCount = subjects.filter(
    (subject) => subject.completed
  ).length;

  // Progress Percentage
  const progress =
    totalSubjects === 0
      ? 0
      : Math.round((completedCount / totalSubjects) * 100);

  // Convert minutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Study Time Scheduler 📚
        </h1>

        <p className="mb-8 text-gray-600">
          Plan your study time and stay productive!
        </p>

        {/* Dashboard Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total Subjects */}
          <div className="rounded-xl bg-white p-5 shadow">

            <p className="text-sm text-gray-500">
              Total Subjects
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {totalSubjects}
            </h2>

          </div>

          {/* Study Time */}
          <div className="rounded-xl bg-white p-5 shadow">

            <p className="text-sm text-gray-500">
              Study Time
            </p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {hours}h {minutes}m
            </h2>

          </div>

          {/* Completed */}
          <div className="rounded-xl bg-white p-5 shadow">

            <p className="text-sm text-gray-500">
              Completed
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {completedCount}
            </h2>

          </div>

        </div>

        {/* Progress Section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow">

          <div className="mb-3 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-gray-800">
              Study Progress
            </h2>

            <span className="font-bold text-blue-600">
              {progress}%
            </span>

          </div>

          {/* Progress Bar */}
          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

          </div>

          <p className="mt-3 text-sm text-gray-500">
            {completedCount} out of {totalSubjects} subjects completed
          </p>

        </div>

        {/* Add Subject */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Add Subject
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row">

            {/* Subject Name */}
            <input
              type="text"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(event) =>
                setSubjectName(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addSubject();
                }
              }}
              className="flex-1 rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-blue-500"
            />

            {/* Duration */}
            <select
              value={duration}
              onChange={(event) =>
                setDuration(event.target.value)
              }
              className="rounded-lg border border-gray-300 p-3 text-gray-800 outline-none"
            >

              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1 hour 30 minutes</option>

            </select>

            {/* Add Button */}
            <button
              onClick={addSubject}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              + Add Subject
            </button>

          </div>

        </div>

        {/* Study Schedule */}
        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Today&apos;s Study Schedule
          </h2>

          {/* Empty Message */}
          {subjects.length === 0 ? (

            <p className="py-6 text-center text-gray-500">
              No subjects added yet. Add your first subject!
            </p>

          ) : (

            <div className="space-y-4">

              {subjects.map((subject) => (

                <div
                  key={subject.id}
                  className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center"
                >

                  {/* Subject Details */}
                  <div>

                    <h3
                      className={`text-lg font-semibold ${
                        subject.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {subject.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {subject.duration} minutes
                    </p>

                    {subject.completed && (

                      <p className="mt-1 text-sm font-medium text-green-600">
                        Completed ✓
                      </p>

                    )}

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">

                    {/* Complete Button */}
                    <button
                      onClick={() =>
                        completeSubject(subject.id)
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
                        subject.completed
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {subject.completed
                        ? "Undo"
                        : "Mark Completed"}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        deleteSubject(subject.id)
                      }
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Stay focused. Stay consistent. 💪
        </p>

      </div>

    </main>
  );
}