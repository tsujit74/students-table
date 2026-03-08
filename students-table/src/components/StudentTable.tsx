import type { Student } from "../types/student"

type Props = {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (id: number) => void
}

export default function StudentTable({ students, onEdit, onDelete }: Props) {
  return (
    <div className="w-full overflow-x-auto border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
          <tr className="text-sm">
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Age</th>
            <th className="px-6 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {students.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-6 text-center text-gray-500"
              >
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {student.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {student.email}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {student.age}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(student)}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(student.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}