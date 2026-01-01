import "../components/Sidebar.css";
import Conversations from "./Conversations.jsx";
import SearchInput from "./SearchInput.jsx";
import LogoutButton from "./LogoutButton.jsx";
import MessageContainer from "./MessageContainer.jsx";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="sidebar">
      <SearchInput />

      <div className="divider">
        <Conversations
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
