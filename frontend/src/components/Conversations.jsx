import { useEffect, useState } from "react";
import "../components/Conversations.css";
import Conversation from "./Conversation";

const Conversations = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/users", {
          credentials: "include", //  VERY IMPORTANT (JWT cookie bhejne ke liye)
        });

        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);

      } catch (err) {
        console.error("Failed to load users:", err.message);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔄 Loading state
  if (loading) {
    return <div className="convobox">Loading users...</div>;
  }

  // ❌ Error state
  if (error) {
    return <div className="convobox">{error}</div>;
  }

  return (
    <div className="convobox">
      {users.length === 0 ? (
        <p style={{ color: "#aaa", padding: "10px" }}>
          No users found
        </p>
      ) : (
        users.map((user) => (
          <Conversation
            key={user._id}              // 👈 MongoDB id
            user={user}                 // 👈 full user object
            selectedUser={selectedUser} // 👈 active user
            setSelectedUser={setSelectedUser}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
