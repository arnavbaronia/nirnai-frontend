
# Frontend

Frontend application for uploading Tamil real estate PDFs and viewing parsed transactions.

---

## 📌 Features

- 📤 Upload Tamil PDF files to backend
- 📃 View extracted and translated transaction records
- 🔐 Authenticated login and registration
- 🔎 Search transactions by keyword or metadata

---

## ⚙️ Tech Stack

- **Framework**: React.js / Next.js
- **HTTP Client**: Axios
- **UI**: Tailwind CSS / Material UI
- **State Management**: Redux Toolkit or React Context
- **Authentication**: JWT-based client handling

---

## 📦 Installation, Setup and Running the Server

```bash
git clone https://github.com/nirnai-frontend.git
cd nirnai-frontend

npm install

NEXT_PUBLIC_API_URL=http://localhost:3000

npm run dev

npm run build
npm run start