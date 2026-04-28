"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    axios.post(`/api/student`, {
        name,
        surname,
      })
      .then(function (response) {
        console.log(response.data);

        setName("");
        setSurname("");
        setShowForm(false);
      });
  };

  return (
    <div className="p-10">
      <button
        onClick={() => setShowForm(true)}
        className="bg-violet-800 text-white px-4 py-2 rounded"
      >
        Add Student
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            placeholder="Name"
            className="border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Surname"
            className="border p-2"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}
