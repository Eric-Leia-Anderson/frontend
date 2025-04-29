import React, { useRef, FormEvent } from 'react';


interface Chat {
    role: "model" | "user"; 
    text: string;
    
}


interface ChatformProps {
    chatHistory: Chat[];
    setChatHistory: React.Dispatch<React.SetStateAction<Chat[]>>;
    generateBotResponse: (history: Chat[]) => void; 
}

const Chatform: React.FC<ChatformProps> = ({ chatHistory, setChatHistory, generateBotResponse }) => {


    const inputRef = useRef<HTMLInputElement>(null);


    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        const userMessage = inputRef.current?.value.trim();


        if (!userMessage) return;


        if (inputRef.current) {
            inputRef.current.value = "";
        }


        setChatHistory(history => [...history, { role: "user", text: userMessage }]);


        setTimeout(() => {

            setChatHistory(history => [...history, { role: "model", text: "Thinking..." }]);
            generateBotResponse([...chatHistory, { role: "user", text: `Use the information about the user to answer the question: ${userMessage}` }]);

        }, 600);
    }

    return (
        <form action='#' className='chat-form' onSubmit={handleFormSubmit}>

            <input ref={inputRef} type='text' placeholder='Message...' className='message-input'/>

            <button type="submit" className="material-symbols-outlined">arrow_upward</button>
        </form>
    );
}

export default Chatform;