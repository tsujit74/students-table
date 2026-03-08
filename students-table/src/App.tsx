import { useState } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { initialStudents } from "./data/students";
import type { Student } from "./types/student";

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdate = (updated: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditingStudent(null);
  };

 
  const openDeleteModal = (id: number) => {
    const student = students.find((s) => s.id === id) || null;
    setDeletingStudent(student);
  };


  const confirmDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeletingStudent(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Students Management
      </h1>

      <StudentForm
        onAdd={addStudent}
        onUpdate={handleUpdate}
        editingStudent={editingStudent}
      />

      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
      />

      <DeleteConfirmModal
        student={deletingStudent}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingStudent(null)}
      />
    </div>
  );
}

export default App;