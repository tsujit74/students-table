import { useForm } from "react-hook-form";
import type { Student } from "../types/student";

type FormData = {
  name: string;
  email: string;
  age: number;
};

type Props = {
  onAdd: (student: Student) => void;
};

export default function StudentForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newStudent: Student = {
      id: Date.now(),
      ...data,
    };

    onAdd(newStudent);
    reset();
  };

  const handleReset = () => {
    reset();
    clearErrors();
  };

  // Validation rules
  const nameValidation = {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    onChange: () => clearErrors("name"),
  };

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Enter a valid email address",
    },
    onChange: () => clearErrors("email"),
  };

  const ageValidation = {
    required: "Age is required",
    valueAsNumber: true,
    min: {
      value: 1,
      message: "Age must be greater than 0",
    },
    max: {
      value: 120,
      message: "Age must be less than 120",
    },
    onChange: () => clearErrors("age"),
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-4 space-y-2 border border-gray-200 p-6 rounded-xl bg-white shadow-sm max-w-md"
    >
      <h2 className="text-lg font-semibold text-gray-800">Add Student</h2>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Name</label>

        <input
          type="text"
          {...register("name", nameValidation)}
          placeholder="Enter student name"
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
          focus:ring-2 focus:ring-blue-500
          ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />

        <p className="text-red-500 text-xs h-4">{errors.name?.message}</p>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Email</label>

        <input
          type="email"
          {...register("email", emailValidation)}
          placeholder="Enter email"
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
          focus:ring-2 focus:ring-blue-500
          ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />

        <p className="text-red-500 text-xs h-4">{errors.email?.message}</p>
      </div>

      {/* Age */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Age</label>

        <input
          type="number"
          {...register("age", ageValidation)}
          placeholder="Enter age"
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
          focus:ring-2 focus:ring-blue-500
          ${errors.age ? "border-red-500" : "border-gray-300"}`}
        />

        <p className="text-red-500 text-xs h-4">{errors.age?.message}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-50"
        >
          Add Student
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
