"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const router = useRouter();
  const [students, setStudents] = useState<{ id: number; name: string; surname: string }[]>([]);

  useEffect(() => {
   axios
   .get("/api/student")
   .then(function (response){
    setStudents(response.data);
   })
   .catch(function(error){
    console.log(error);
   }
   )
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("/api/student", {
      name,
      surname,
    });

    setName("");
    setSurname("");
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
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
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded mt-5"
      >
        Logout
      </button>
      </div>
      <table border={1} style={{ width: "67%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.surname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}