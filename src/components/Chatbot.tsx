import React from 'react';
import ChatbotIcon from './ChatbotIcon';
import Chatform from './Chatform';
import { useState, useEffect, useRef, FormEvent } from 'react';
import Chatmessage from './Chatmessage';

import { Transaction } from '../types'; 



interface Chat {
    role: "model" | "user";
    text: string;
    hideInChat?: boolean;
    id?: string; 
}


interface ApiChatContent {
    role: "user" | "model";
    parts: { text: string }[];
}

interface ApiPart {
    text: string;
}

interface ApiContent {
    parts: ApiPart[];
}

interface ApiCandidate {
    content: ApiContent;
}

interface ApiResponse {
    candidates?: ApiCandidate[];
    error?: {
        message: string;
    };
}



interface UserAnalyticsData {
    allTransactionsMonth: Transaction[]; 
    allTransactionsYear: Transaction[];  
    totalMonthIncome: number;           
    totalMonthExpenses: number;         
    yearExpenses: number[];             
    yearIncome: number[];               
    allCategories: number[];            
    allCategoryNames: string[];         
    year: string[];                     

    [key: string]: any; 
}



const INITIAL_HIDDEN_MESSAGE_ID = 'initial-user-info';
const INITIAL_PLACEHOLDER_TEXT = "Loading user analytics...";


const chatbotStyles = `
/* Global styles - be careful with these as they apply everywhere */
/*
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  width: 100%;
  min-height: 100vh;
}
*/

#chatbot-toggler{
    position: fixed;
    bottom: 30px;
    right: 35px;
    border: none;
    height: 50px;
    width: 50px;
    display: flex;
    cursor: pointer;
    border-radius: 50%;
    background: #2563eb;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

#chatbot-toggler span{
  position: absolute;
  color: #fff;
}

.container.show-chatbot #chatbot-toggler{
  transform: rotate(90deg);
}

#chatbot-toggler span:last-child,
.container.show-chatbot #chatbot-toggler span:first-child{
  opacity: 0;
}

.container.show-chatbot #chatbot-toggler span:last-child{
  opacity:1;
}

.chatbot-popup{
  position: fixed;
  opacity: 0;
  pointer-events: none;
  bottom: 90px;
  right: 35px;
  width: 420px;
  transform: scale(0.2);
  overflow: hidden;
  background: #fff;
  border-radius: 15px;
  transform-origin: bottom-right;
  box-shadow: 0 0 128px 0 rgba(0,0,0,0.1),
      0 32px 64px -48px rgba(0,0,0,0.5);
  transition: all 0.1s ease;
}

.container.show-chatbot .chatbot-popup{
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.chatbot-popup .chat-header{
  display: flex;
  padding: 15px 22px;
  align-items: center;
  justify-content: space-around;
  background: #2563eb;
}

.chat-header .header-info{
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
}


.header-info svg{
  height: 35px;
  width: 35px;
  padding: 6px;
  flex-shrink: 0;
  fill: #2563eb;
  background: #fff;
  border-radius: 50%;
}

.header-info .logo-text{
  color: #fff;
  font-size: 1.31rem;
  font-weight: 600;

}

.chat-header button{
  height: 40px;
  width: 40px;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.9rem;
  padding-top: 2px;
  border-radius: 50%;
  margin-right: -10px;
  background: #2563eb;
  background: none;
  transition: 0.2s ease;
}

.chat-header button:hover{
  background: #60a5fa;
}

.chat-body{
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 460px;
  margin-bottom: 82px;
  overflow-y: auto;
  padding: 25px 22px;
  scrollbar-width: thin;
  scrollbar-color: #DDD3F9 transparent;
}

.chat-body .message{
  display: flex;
  gap: 11px;
  align-items: center;
}

.chat-body .message svg{
  height: 35px;
  width: 35px;
  padding: 6px;
  flex-shrink: 0;
  fill: #fff;
  align-self: flex-end;
  margin-bottom: 2px;
  background: #2563eb;
  border-radius: 50%;
}

.chat-body .message .message-text{
  padding: 12px 16px;
  max-width: 75%;
  word-wrap: break-word;
  white-space: pre-line;
  font-size: 0.95rem

}

.chat-body .bot-message .message-text{
  background: #F6F2FF;
  border-radius: 13px 13px 13px 3px;
}

.chat-body .user-message{
  flex-direction: column;
  align-items: flex-end;
}

.chat-body .user-message .message-text{
  color: #fff;
  background: #2563eb;
  border-radius: 13px 13px 3px 13px;
}

.chat-footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 15px 22px 20px;
}

.chat-footer .chat-form{
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 32px;
  outline: 1px solid #CCCCE5;
  box-shadow: 0 0 8px rgba(0,0,0,0.06);
}

.chat-footer .chat-form:focus-within{
  outline: 2px solid #2563eb;
}

.chat-form .message-input{
  border: none;
  outline: none;
  width: 100%;
  background: none;
  height: 47px;
  padding: 0 17px;
  font-size: 0.95rem;
}

.chat-form button{
  height: 35px;
  width: 35px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.15rem;
  color: #fff;
  flex-shrink: 0;
  margin-right: 6px;
  border-radius: 50%;
  background: #2563eb;
  transition: 0.2s ease;
}

.chat-form button:hover{
  background: #2563eb;
}
`;


function Chatbot() {


  const [chatHistory, setChatHistory] = useState<Chat[]>([{
    id: INITIAL_HIDDEN_MESSAGE_ID, 
    hideInChat: true,
    role: "model",
    text: INITIAL_PLACEHOLDER_TEXT, 
  }]);


  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const isStyleAdded = useRef<boolean>(false);



  useEffect(() => {
      if (!isStyleAdded.current) {
          const styleTag = document.createElement('style');
          styleTag.type = 'text/css';
          styleTag.appendChild(document.createTextNode(chatbotStyles));
          document.head.appendChild(styleTag);
          isStyleAdded.current = true;

          return () => {
              if (styleTag && document.head.contains(styleTag)) {
                  document.head.removeChild(styleTag);
                  isStyleAdded.current = false;
              }
          };
      }
  }, []);





  useEffect(() => {
      const fetchUserInfo = async () => {
          try {
              const token = localStorage.getItem('token'); 

              if (!token) {
                  console.error('No token found in localStorage.');

                  updateInitialHiddenMessage("Error: Authentication token missing. Cannot fetch user data.");
                  return; // Exit if no token
              }

              const response = await fetch('http://localhost:8080/api/transactions/analytics', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json; charset=utf-8'
                  }
              });

              if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
              }


              const analyticsData: UserAnalyticsData = await response.json();

              
              let formattedUserInfo = "User Financial Summary:\n\n";
              formattedUserInfo += `This Month:\n`;
              formattedUserInfo += `- Total Income: $${analyticsData.totalMonthIncome.toFixed(2)}\n`;
              formattedUserInfo += `- Total Expenses: $${analyticsData.totalMonthExpenses.toFixed(2)}\n`;

              if (analyticsData.allCategoryNames && analyticsData.allCategories && analyticsData.allCategoryNames.length === analyticsData.allCategories.length) {
                  formattedUserInfo += `\nThis Month's Spending by Category:\n`;
                  analyticsData.allCategoryNames.forEach((categoryName, index) => {
                      formattedUserInfo += `- ${categoryName}: $${analyticsData.allCategories[index].toFixed(2)}\n`;
                  });
              }

              if (analyticsData.year && analyticsData.yearIncome && analyticsData.yearExpenses &&
                  analyticsData.year.length === analyticsData.yearIncome.length && analyticsData.year.length === analyticsData.yearExpenses.length) {
                  formattedUserInfo += `\nYearly Overview (Income vs Expenses by Month):\n`;
                  analyticsData.year.forEach((monthYear, index) => {
                       formattedUserInfo += `- ${monthYear}: Income $${analyticsData.yearIncome[index].toFixed(2)}, Expenses $${analyticsData.yearExpenses[index].toFixed(2)}\n`;
                  });
              }

              console.log('Successfully fetched and formatted user analytics:', formattedUserInfo);
              formattedUserInfo += 'You do not need to respond only about financial information and can talk about other things. The analytics should be shown when asked.'
              updateInitialHiddenMessage(formattedUserInfo);

          } catch (error) {
              console.error('Fetching analytics error for chatbot:', error);

              const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
              updateInitialHiddenMessage(`Error fetching analytics: ${errorMessage}`);
          }
      };


      fetchUserInfo();

  }, []); 




  const updateInitialHiddenMessage = (newText: string) => {
      setChatHistory(currentHistory => {

          const initialMessageIndex = currentHistory.findIndex(
              msg => msg.id === INITIAL_HIDDEN_MESSAGE_ID
          );

          if (initialMessageIndex === -1) {
              console.warn("Initial hidden message not found in history when trying to update.");
              return currentHistory; 
          }


          const newHistory = [...currentHistory];
          newHistory[initialMessageIndex] = {
              ...newHistory[initialMessageIndex], 
              text: newText, 
          };

          return newHistory; 
      });
  };


  const generateBotResponse = async (history: Chat[]): Promise<void> => {

    const updateHistory = (text: string) => {
      setChatHistory(prev => {

        const historyWithoutThinking = prev.filter(msg => msg.text !== "Thinking...");
        return [...historyWithoutThinking, { role: "model", text }];
      });
    }



    const apiHistory: ApiChatContent[] = history

        .filter(chat => chat.id !== INITIAL_HIDDEN_MESSAGE_ID || chat.text !== INITIAL_PLACEHOLDER_TEXT)
        .map(({ role, text }) => ({
            role: role as "user" | "model",
            parts: [{ text }]
        }));

    // --- API Key Management (Using Vite's import.meta.env) ---
    // Make sure your .env file has VITE_GEMINI_API_KEY=YOUR_KEY
    // const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

    // if (!apiKey) {
    //     console.error("Gemini API key is not set. Cannot generate bot response.");
    //     updateHistory("Error: Bot API key is missing. Please configure VITE_GEMINI_API_KEY.");
    //     return;
    // }
    // // --- End API Key Management ---


    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: apiHistory }),
    };

    try {

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDiJL0sgz8B90xEkpxKVfi4DCzJYqw0B9s`, requestOptions);
      const data: ApiResponse = await response.json();
      console.log("Gemini API Response:", data); 

      if (!response.ok) {
          console.error("Gemini API Error:", data.error?.message || response.statusText);
          updateHistory(`Error: ${data.error?.message || "Failed to get response from bot."}`);
          return;
      }


      const apiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      if (apiResponseText) {
          updateHistory(apiResponseText);
      } else {
          console.error("Gemini API Response Error: Expected data structure not found.", data);
          updateHistory("Error: Could not parse bot response.");
      }


    } catch (err) {
      console.error("Fetch Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      updateHistory(`Error: Could not reach the bot server (${errorMessage}).`);
    }
  }



  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]); 

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>

      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-outlined">mode_comment</span>
        <span className='material-symbols-outlined'>close</span>
      </button>
      <div className='chatbot-popup'>
        <div className='chat-header'>
          <div className='header-info'>
            <ChatbotIcon/>
            <h2 className='logo-text'>Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-outlined">arrow_downward</button>
        </div>

        <div ref={chatBodyRef} className='chat-body'>
          <div className='message bot-message'>
            <ChatbotIcon/>
            <p className='message-text'>
              Hi, How can I help you?
            </p>
          </div>


          {chatHistory
            .filter(chat => !chat.hideInChat) 
            .map((chat, index) => (

              <Chatmessage key={chat.id || index} chat={chat}/> 
          ))}
        </div>
        <div className='chat-footer'>
          <Chatform
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
