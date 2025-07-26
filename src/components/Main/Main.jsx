import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showresult,
    loading,
    resultData,
    input,
    setinput,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p className="logo">Netzy !! </p>
        <img className="user-icon" src={assets.user_icon} alt="User Profile" />
      </div>

      <div className="main-container">
        {!showresult ? (
          <div>
            <div className="greet">
              <p className="greet-heading">
                <span className="hello">Hello,</span>&nbsp;
                <span className="name">Dev.</span>
              </p>
              <p className="greet-sub">How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest scenic places to visit on a road trip.</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div className="card">
                <p>Summarize the concept of Urban Planning in simple terms.</p>
                <img src={assets.bulb_icon} alt="Idea Bulb" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our retreat.</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Enhance the readability of this code snippet.</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(event) => setinput(event.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  onSent();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img
                  onClick={() => {
                    if (input.trim() !== "") {
                      onSent();
                    }
                  }}
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Netzy may occasionally generate inaccurate or incomplete responses.
            Please verify important information before relying on it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
