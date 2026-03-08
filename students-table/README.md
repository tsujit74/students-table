# Student Management System

A simple **Student Management System** built with **React + TypeScript + Vite + Tailwind CSS**.
This project allows users to **add, edit, delete, and export student data to Excel** with a clean and responsive UI.

---

## Live DEMO

* LIVE : https://students-table-eight.vercel.app/


## 🚀 Features

* ➕ Add new students
* ✏️ Edit existing student details
* 🗑️ Delete students with confirmation modal
* 📊 Display total number of students
* 📥 Export student data to Excel
* ⏳ Loading spinner for simulated data loading
* 📱 Responsive layout (Form on left, table on right)

---

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **XLSX / Excel Export Utility**

---

## 📂 Project Structure

```
src
│
├── components
│   ├── StudentForm.tsx
│   ├── StudentTable.tsx
│   ├── DeleteConfirmModal.tsx
│   └── LoadingSpinner.tsx
│
├── data
│   └── students.ts
│
├── types
│   └── student.ts
│
├── utils
│   └── exportExcel.ts
│
└── App.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/tsujit74/students-table
```

Navigate into the project:

```bash
cd student-table
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 📸 UI Overview

* **Left Section:** Student Form (Add / Edit)
* **Right Section:** Student Table + Export Button
* **Top:** Total Students Counter

---

## 📦 Future Improvements

* Search and filter students
* Pagination
* Backend API integration
* Database storage
* Authentication

---

## 👨‍💻 Author

**Sujit Thakur**

* GitHub: https://github.com/tsujit74
* Portfolio: https://sujit-porttfolio.vercel.app/

---

