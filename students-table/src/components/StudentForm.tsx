import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { Student } from "../types/student"

type FormData = {
  name: string
  email: string
  age: number
}

type Props = {
  onAdd: (student: Student) => void
  onUpdate: (student: Student) => void
  editingStudent: Student | null
}

export default function StudentForm({
  onAdd,
  onUpdate,
  editingStudent,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>()


  const nameRules = {
    required: "Name is required",
    minLength: { value: 2, message: "Name must be at least 2 characters" },
    onChange: () => clearErrors("name"),
  }

  const emailRules = {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Enter a valid email address",
    },
    onChange: () => clearErrors("email"),
  }

  const ageRules = {
    required: "Age is required",
    valueAsNumber: true,
    min: { value: 1, message: "Age must be greater than 0" },
    max: { value: 120, message: "Age must be less than 120" },
    onChange: () => clearErrors("age"),
  }


  useEffect(() => {
    if (!editingStudent) return

    reset({
      name: editingStudent.name,
      email: editingStudent.email,
      age: editingStudent.age,
    })
  }, [editingStudent, reset])


  const submitForm = (data: FormData) => {
  if (editingStudent) {
    onUpdate({ id: editingStudent.id, ...data })
  } else {
    onAdd({ id: Date.now(), ...data })
  }

  reset({
    name: "",
    email: "",
    age: 0,
  })
}

  /* Reset logic */
  const resetForm = () => {
    reset()
    clearErrors()
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-2 border p-6 bg-white shadow-sm max-w-md mb-5"
    >
      <h2 className="text-lg font-semibold">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h2>

      {/* Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", nameRules)}
          className={`w-full border px-3 py-2 rounded-md ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p className="text-red-500 text-xs h-4">{errors.name?.message}</p>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", emailRules)}
          className={`w-full border px-3 py-2 rounded-md ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p className="text-red-500 text-xs h-4">{errors.email?.message}</p>
      </div>

      {/* Age */}
      <div className="space-y-1">
        <label htmlFor="age" className="text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register("age", ageRules)}
          className={`w-full border px-3 py-2 rounded-md ${
            errors.age ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p className="text-red-500 text-xs h-4">{errors.age?.message}</p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="border px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>
    </form>
  )
}