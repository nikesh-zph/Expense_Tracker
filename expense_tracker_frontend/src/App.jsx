// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx'; // Import this at the top

import Homepage from './pages/Homepage.jsx';
import Signup from './components/Signup.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
import Login from './components/Login.jsx';
import Sidebar from './components/SideBar.jsx';
import NewTransaction from "./pages/NewTransaction.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";
import SavedTransactionPage from "./pages/SavedTransaction.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import Report from "./pages/Report.jsx";
import Setting from "./pages/Setting.jsx";
import Notification from "./pages/Notification.jsx";
import BankingInfo from "./pages/BankingInfo.jsx";

const AppLayout = () => {
    const location = useLocation();
    const routesWithSidebar = ['/newTransaction', '/history', '/saved', '/budget', '/dashboard', '/setting'];
    const shouldShowSidebar = routesWithSidebar.includes(location.pathname);

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {shouldShowSidebar && <Sidebar />}
            <div className="flex-1 p-6">
                <Toaster position="top-center" reverseOrder={false} />

                {shouldShowSidebar && <Header />}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/details" element={<BankingInfo />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/newTransaction" element={<NewTransaction />} />
                    <Route path="/history" element={<TransactionHistory />} />
                    <Route path="/saved" element={<SavedTransactionPage />} />
                    <Route path="/budget" element={<BudgetPage />} />
                    <Route path="/dashboard" element={<Report />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/notification" element={<Notification />} />
                </Routes>
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;
