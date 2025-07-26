import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompt, setprevPrompt] = useState([]);
  const [showresult, setshowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = ()=>{
    setloading(false)
    setshowresult(false)
  }

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowresult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setrecentPrompt(prompt);
    } else {
      setrecentPrompt(input);
      setinput("");
      setprevPrompt((prev) => [...prev, input]);
      response = await runChat(input);
    }

    // Split the response into parts separated by '**'
    let responseArray = response.split("**");
    let newResponse = "";

    // Loop through the parts to apply bold formatting
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newResponse += responseArray[i]; // Regular text
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>"; // Bold text
      }
    }

    // Replace single '*' with <br /> line breaks
    let newResponse2 = newResponse.replaceAll("*", "<br />");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setloading(false);
  };
  const contextValue = {
    prevPrompt,
    setprevPrompt,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showresult,
    loading,
    resultData,
    input,
    setinput,
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
