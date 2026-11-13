import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LoginView } from './components/auth/LoginView';
import { SessionInvalidModal } from './components/auth/SessionInvalidModal';
import { StudentPortal } from './components/student/StudentPortal';
import { StaffPortal } from './components/staff/StaffPortal';
import { ManagerPortal } from './components/manager/ManagerPortal';
import { AdminPortal } from './components/admin/AdminPortal';

const AppContent: React.FC = () => {
  const { currentUser, sessionInvalid } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#f0f6fa] flex flex-col justify-between">
        <LoginView />
        <Footer />
        {sessionInvalid && <SessionInvalidModal />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f6fa] flex flex-col text-slate-900 font-sans">
      {/* Shared Header with Bell Notifications & Role Switcher */}
      <Header />

      {/* Main Portals based on User Role */}
      <main className="grow">
        {currentUser.role === 'student' && <StudentPortal />}
        {currentUser.role === 'staff' && <StaffPortal />}
        {currentUser.role === 'manager' && <ManagerPortal />}
        {currentUser.role === 'admin' && <AdminPortal />}
      </main>

      {/* Session Invalidation Modal (Kick-out simulation) */}
      {sessionInvalid && <SessionInvalidModal />}

      {/* Full Institutional Helpdesk Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AppProvider>
  );
}

