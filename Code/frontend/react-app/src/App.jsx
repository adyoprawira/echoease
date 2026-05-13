import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import WellbeingLandingPage from "./pages/WellbeingLandingPage";
import CoursesPage from "./pages/CoursesPage";
import ChatPage from "./pages/ChatPage";
import ProfessionalSelectionPage from "./pages/ProfessionalSelectionPage";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<WellbeingLandingPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="chat" element={<ProfessionalSelectionPage />} />
        <Route path="chat-session" element={<ChatPage />} />
        <Route path="community" element={<PlaceholderPage title="Community" />} />
        <Route path="resources" element={<PlaceholderPage title="Resources" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
