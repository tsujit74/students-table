import { useState } from "react";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data/students";
import type { Student } from "./types/student";
import StudentForm from "./components/StudentForm";

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdate = (updated: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>

      <StudentForm
        onAdd={addStudent}
        onUpdate={handleUpdate}
        editingStudent={editingStudent}
      />
      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={() => {}}
      />
    </div>
  );
}

export default App;
