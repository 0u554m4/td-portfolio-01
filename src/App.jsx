import { HashRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Skills, Works, StarsCanvas } from "./components";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
// AI Assistant - Re-enable by commenting back in:
// import AIAssistant from "./components/AI/AIAssistant";

const Portfolio = () => (
  <div className='relative z-0'>
    <div className='relative z-0'>
      <Hero />
    </div>
    <About />
    <Experience />
    <Skills />
    <Works />
    <div className='relative z-0'>
      <Contact />
    </div>
  </div>
);

const App = () => {
  return (
    <HashRouter>
      <div className='relative z-0'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <StarsCanvas />
        {/* AI Assistant - Re-enable by commenting back in: */}
        {/* <AIAssistant /> */}
      </div>
    </HashRouter>
  );
};

export default App;
