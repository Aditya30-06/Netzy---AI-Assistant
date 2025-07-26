import React, { useCallback, useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
const SideBar = () => {
  const [extended, setextended] = useState(false);
  const { onSent, prevPrompt, setrecentPrompt,newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setrecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className={`sidebar ${extended ? "expanded" : ""}`}>
      <div className="top">
        <img
          onClick={() => setextended((prev) => !prev)}
          className="menu-icon"
          src={assets.menu_icon}
          alt="Menu"
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="Start new chat" />
          {extended ? <p>Start a New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recents">
            <p className="recent-title">Recent Chats</p>
            {prevPrompt.map((item, index) => {
              return (
                <div
                  key={index}
                  className="recent-entry"
                  onClick={() => loadPrompt(item)} // ✅ Move it here
                >
                  <img src={assets.message_icon} alt="Chat" />
                  <p>{item.slice(0, 20)}...</p>{" "}
                  {/* Optional: limit preview length */}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended ? <p>Help & Support</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Log" />
          {extended ? <p>Chat History</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
