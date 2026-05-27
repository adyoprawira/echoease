import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import WellbeingLandingPage from "./pages/WellbeingLandingPage";
import ChatPage from "./pages/ChatPage";
import ProfessionalSelectionPage from "./pages/ProfessionalSelectionPage";
import CommunityPage from "./pages/CommunityPage";
import ResourcesPage from "./pages/ResourcesPage";
import QueuePage from "./pages/QueuePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<WellbeingLandingPage />} />
        <Route path="chat" element={<ProfessionalSelectionPage />} />
        <Route path="queue/:guideId" element={<QueuePage />} />
        <Route path="chat-session/:guideId" element={<ChatPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="resources" element={<ResourcesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
