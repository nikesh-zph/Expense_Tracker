// components/Header.jsx
import NotificationBell from '../pages/Notification.jsx';
import Setting from '../pages/Setting';

const Header = () => {
    return (
        <div className="flex justify-end items-start relative">
            <div className="flex flex-col items-end gap-2">
                <Setting />
                <NotificationBell />
            </div>
        </div>
    );
};

export default Header;
