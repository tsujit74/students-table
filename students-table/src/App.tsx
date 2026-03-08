import { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import LoadingSpinner from "./components/LoadingSpinner";
import { initialStudents } from "./data/students";
import { exportStudentsToExcel } from "./utils/exportExcel";
import type { Student } from "./types/student";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  const openDeleteModal = (id: number) => {
    const student = students.find((s) => s.id === id) || null;
    setDeletingStudent(student);
  };

  const confirmDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeletingStudent(null);
  };

  const handleExport = () => {
    if (exporting) return;

    setExporting(true);

    exportStudentsToExcel(students);

    setTimeout(() => {
      setExporting(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Students Management</h1>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>

      <StudentForm
        onAdd={addStudent}
        onUpdate={handleUpdate}
        editingStudent={editingStudent}
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={handleExport}
          disabled={exporting}
          className={`px-4 py-2 rounded-md text-white transition
    ${exporting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          {exporting ? "Downloading..." : "Download Excel"}
        </button>
      </div>

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
