# Lesson Planner

An AI-powered lesson planner that generates plans based on user inputs using the Google Gemini API.

## Features

- **Dummy Login Page** (Frontend-only, hardcoded credentials: `demouser/demopass`)
- **Lesson Planner Form** (User inputs: Topic, Grade, Main Concept, Materials, Objectives, Lesson Outline)
- **AI Integration** (Fetch structured lesson content from Google Gemini API)
- **Editable AI-generated lesson** (displayed inside ShadCN `Card` component)
- **PDF Export** (Download lesson plan using `react-to-print`)
- **Deployment** (Hosted on Vercel)

### Optional Features I've added

- **Dark mode** (TailwindCSS/ShadCN)
- **Local storage** (Retains the last generated lesson plan on refresh)

---

## Tech Stack

- **Frontend**: ReactJs (Vite), TailwindCSS, ShadCN UI
- **Backend/API**: Google Gemini API
- **State Management**: React State
- **PDF Handling**: react-to-print

---

## Getting Started

### Prerequisites

The following shall be installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Setup Instructions

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/lesson-planner.git
   cd lesson-planner
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Create a `.env` file in the root directory**

   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Run the development server**

   ```sh
   npm run dev
   ```

   The app should now be running on `http://localhost:5173/` (for Vite)

---

## API Integration (Google Gemini API)

### Steps to Integrate Google Gemini API

1. **Generate an API Key**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Google Gemini API
   - Generate an API key and store it in the `.env` file as `VITE_GEMINI_API_KEY`

2. **Set Up API Request in Code**
   - Create a function to send a request to the API.

3. **Send User Inputs to API**
   - Format the user-provided data into a structured prompt.

4. **Handle API Response**
   - Extract the lesson plan details from the API response.

---

## Deployment

### Deployed on Vercel: https://lesson-planner-steel.vercel.app
---

## Contributing

Feel free to fork this repository and submit pull requests for improvements!

---

## License

This project is open-source and available under the MIT License.

