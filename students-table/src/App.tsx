import { useState } from "react";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data/students";
import type { Student } from "./types/student";
import StudentForm from "./components/StudentForm";

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>

      <StudentForm onAdd={addStudent} />

      <StudentTable students={students} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}

export default App;
