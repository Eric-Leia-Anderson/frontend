import React from 'react';
import ChatbotIcon from './ChatbotIcon';


interface Chat {
    role: "model" | "user"; 
    text: string;
    hideInChat?: boolean;
}


interface ChatMessageProps {
    chat: Chat;
}

const Chatmessage: React.FC<ChatMessageProps> = ({ chat }) => {
    return (
        !chat.hideInChat && (
        <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
            {chat.role === "model" && <ChatbotIcon/>}
            <p className='message-text'>{chat.text}</p>
        </div>
    )
    );
}

export default Chatmessage;