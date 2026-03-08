import type { Student } from "../types/student";

type Props = {
  student: Student | null;
  onConfirm: (id: number) => void;
  onCancel: () => void;
};

export default function DeleteConfirmModal({
  student,
  onConfirm,
  onCancel,
}: Props) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold">Delete Student</h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium">{student.name}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(student.id)}
            className="px-3 py-1.5 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}