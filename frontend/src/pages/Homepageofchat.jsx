import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";

const Homepageofchat = () => {
  // 🔥 SINGLE SOURCE OF TRUTH
  const [selectedUser, setSelectedUser] = useState(null);

  // 🔎 DEBUG (temporary)
  console.log("Homepage selectedUser:", selectedUser);

  return (
    <div className="container">
      {/* LEFT SIDEBAR */}
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      {/* RIGHT CHAT AREA */}
      <MessageContainer selectedUser={selectedUser} />
    </div>
  );
};

export default Homepageofchat;
