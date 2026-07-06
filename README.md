<div align="center">

# AI Resume Analyzer

**An intelligent full-stack application that analyzes your resume against a job description and generates a complete interview preparation report powered by Google Gemini AI.**

[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)

</div>

---

## :pushpin: What It Does

AI Resume Analyzer takes your **resume (PDF)**, a **job description**, and an optional **self-description** -- then uses **Google Gemini AI** to generate a comprehensive interview preparation report including:

- :white_check_mark: **Match Score** -- How well your profile fits the job (0-100)
- :white_check_mark: **Technical Questions** -- Questions likely to be asked, with intention & model answers
- :white_check_mark: **Behavioral Questions** -- Soft-skill questions with intention & model answers
- :white_check_mark: **Skill Gaps** -- Missing skills with severity levels (low / medium / high)
- :white_check_mark: **Preparation Plan** -- Day-by-day study plan to close skill gaps
- :white_check_mark: **AI-Generated Resume PDF** -- A polished, ATS-friendly resume tailored to the job

---

## :building_construction: Project Structure

```
Ai Resume Analyzer/
|-- Backend/
|   |-- server.js                        # Entry point - starts Express server
|   +-- src/
|       |-- app.js                       # Express app setup (CORS, routes, middleware)
|       |-- config/
|       |   +-- database.js              # MongoDB connection
|       |-- controllers/
|       |   |-- auth.controller.js       # Register, Login, Logout
|       |   +-- interview.controller.js  # Generate report, Get reports, Generate resume PDF
|       |-- middlewares/
|       |   |-- auth.middleware.js       # JWT authentication guard
|       |   +-- file.middleware.js       # Multer file upload (PDF in memory)
|       |-- models/
|       |   |-- user.model.js            # User schema
|       |   |-- interviewReport.model.js # Full interview report schema
|       |   +-- blacklist.model.js       # JWT blacklist for logout
|       |-- routes/
|       |   |-- auth.routes.js           # /api/auth/*
|       |   +-- interview.routes.js      # /api/interview/*
|       +-- services/
|           +-- ai.service.js            # Gemini AI integration + Puppeteer PDF generation
|
+-- Frontend/
    |-- index.html
    +-- src/
        |-- main.jsx                     # React entry point
        |-- App.jsx                      # Root component with providers
        |-- app.routes.jsx               # React Router route definitions
        |-- style.scss                   # Global styles
        +-- features/
            |-- auth/
            |   |-- auth.context.jsx     # Auth state (user, token)
            |   |-- components/
            |   |   +-- Protected.jsx    # Route guard component
            |   |-- hooks/               # useAuth hook
            |   |-- pages/
            |   |   |-- Login.jsx
            |   |   +-- Register.jsx
            |   +-- services/
            |       +-- auth.api.js      # Auth API calls (axios)
            +-- interview/
                |-- interview.context.jsx   # Interview state (report, reports, loading)
                |-- hooks/
                |   +-- useInterview.js    # All interview actions (generate, fetch, PDF)
                |-- pages/
                |   |-- Home.jsx           # Upload resume + enter job description
                |   +-- interview.jsx      # View full interview report
                |-- services/
                |   +-- interview.api.js   # Interview API calls (axios)
                +-- style/                 # Feature-specific styles
```

---

## :arrows_counterclockwise: How It Works

### 1. Authentication Flow

```
User --> Register/Login --> JWT stored in HTTP-only cookie
                        --> Protected routes checked via auth middleware on every request
```

### 2. Report Generation Flow

```
User uploads PDF resume + enters Job Description
        |
        v
pdf-parse extracts raw text from the uploaded PDF
        |
        v
Text + Job Description + Self Description --> sent to Google Gemini AI
        |
        v
Gemini returns structured JSON (enforced via raw Google JSON Schema):
  {
    title, matchScore,
    technicalQuestions [{ question, intention, answer }],
    behavioralQuestions [{ question, intention, answer }],
    skillGaps          [{ skill, severity }],
    preparationPlan    [{ day, focus, tasks[] }]
  }
        |
        v
Report saved to MongoDB with user reference
        |
        v
Frontend navigates to /interview/:id and displays full report
```

### 3. AI Resume PDF Flow

```
User clicks "Download Resume"
        |
        v
Backend fetches stored resume text + job description from MongoDB
        |
        v
Gemini generates a tailored, ATS-friendly resume as an HTML string
        |
        v
Puppeteer launches headless Chromium, renders the HTML, exports PDF
        |
        v
PDF buffer streamed back to browser as a file download
```

---

## :wrench: Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **Google Gemini AI** (@google/genai) | AI report generation & resume creation |
| **pdf-parse** | Extract text from uploaded PDF resumes |
| **Puppeteer** | Convert AI-generated HTML resume to PDF |
| **JWT + bcryptjs** | Authentication & password hashing |
| **Multer** | Multipart file upload handling |
| **cookie-parser** | HTTP-only cookie support |

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP requests to backend |
| **SASS** | Styling |
| **Context API** | Global state (auth, interview reports) |

---

## :rocket: Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API Key ([Get one here](https://ai.google.dev/))

### 1. Clone the repository

```bash
git clone https://github.com/aryaan022/Ai-resume-analyzer.git
cd "Ai Resume Analyzer"
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a .env file inside the Backend/ folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

Start the backend:

```bash
nodemon server.js
# Runs on http://localhost:3000
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## :satellite: API Reference

### Auth -- /api/auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Login and receive JWT cookie |
| POST | /api/auth/logout | Yes | Logout and blacklist the token |

### Interview -- /api/interview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/interview/ | Yes | Generate a new interview report (multipart/form-data with resume PDF) |
| GET | /api/interview/ | Yes | Get all reports for the logged-in user |
| GET | /api/interview/report/:interviewId | Yes | Get a specific report by ID |
| POST | /api/interview/resume/pdf/:interviewReportId | Yes | Generate & download AI resume PDF |

---

## :card_file_box: Database Schema

### InterviewReport

```js
{
  title              : String   // required - Job title extracted by AI
  jobDescription     : String   // required - Original job description input
  resume             : String   // Extracted text from uploaded PDF
  selfDescription    : String   // User self-description (optional)
  matchScore         : Number   // 0-100 match score from AI
  technicalQuestions : [{ question, intention, answer }]
  behavioralQuestions: [{ question, intention, answer }]
  skillGaps          : [{ skill, severity: "low" | "medium" | "high" }]
  preparationPlan    : [{ day: Number, focus: String, tasks: [String] }]
  user               : ObjectId // ref: User
  createdAt          : Date
  updatedAt          : Date
}
```

---

## :lock: Environment Variables

| Variable | Description |
|---|---|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for signing JWT tokens |
| GOOGLE_GENAI_API_KEY | Google Gemini AI API key from Google AI Studio |

---

## :bulb: Key Technical Decisions

- **Raw JSON Schema over zodToJsonSchema** -- Google Gemini's 
esponseSchema does not support JSON Schema draft-07 $ref references generated by zodToJsonSchema. A plain inline schema object is used instead to ensure nested array items (questions, skill gaps, etc.) are returned as proper objects.
- **pdf-parse v2.x** -- The package uses ESM exports. In a CommonJS project, the function is accessed via 
equire("pdf-parse").default.
- **JWT Blacklisting** -- On logout, tokens are stored in a MongoDB blacklist collection so they cannot be reused even before expiry.
- **Puppeteer in-memory** -- Resume PDFs are generated in memory and streamed directly to the client without saving to disk.

---

## :technologist: Author

**Aryan Khokhar**
[GitHub](https://github.com/aryaan022) · Built with :heart: using Google Gemini AI
