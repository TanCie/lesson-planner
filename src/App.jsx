import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/custom/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
