import "../components/Conversation.css";

const Conversation = ({ user, selectedUser, setSelectedUser }) => {
  const isActive = selectedUser?._id === user._id;

  return (
    <>
      <div
        className={`minbox ${isActive ? "active" : ""}`}
        onClick={() => setSelectedUser(user)}
      >
        <div className="avtaronline">
          <div className="avtarsize">
            <img
              src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              alt="useravatar"
            />
          </div>
        </div>

        <div className="hbox">
          <p className="name">
            {user.username || user.name}
          </p>

          {isActive && user.lastMessage && (
            <p className="lastmsg">{user.lastMessage}</p>
          )}
        </div>
      </div>

      <div className="divider"></div>
    </>
  );
};

export default Conversation;
