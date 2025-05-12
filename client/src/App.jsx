
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import RegisterPage from '../src/pages/RegisterPage';
import Dashboard from '../src/pages/Dashboard';
import AssessmentCreationPage from '../src/pages/AssessmentCreationPage';
import QuestionCreationPage from '../src/pages/QuestionCreationPage';
import {ResultsPage} from '../src/pages/ResultsPage';
import TestPage from '../src/pages/TestPage';
import Home from './pages/Home';
import ContentCreatorDashboard from './pages/ContentCreatorDashboard';
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // Import protected route




function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes for End Users */}
        <Route element={<ProtectedRoute allowedRoles={['end_user']} />}>
          <Route path="/user-dashboard" element={<Dashboard />} />
          <Route path="/test/:assessmentId" element={<TestPage />} />
          <Route path="/results/:resultId" element={<ResultsPage />} />
        </Route>

        {/* Protected Routes for Content Creators */}
        <Route element={<ProtectedRoute allowedRoles={['content_creator']} />}>
          <Route path="/cc-dashboard" element={<ContentCreatorDashboard />} />
          <Route path="/assessments" element={<AssessmentCreationPage />} />
          <Route path="/questions" element={<QuestionCreationPage />} />
        </Route>

      </Routes>
   </BrowserRouter>
  );
}

export default App;