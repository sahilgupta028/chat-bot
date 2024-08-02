// Home.tsx
"use client";
import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const topics = [
  { 
    id: 1, 
    title: 'Membership Process', 
    response: 'Membership is free. To join, submit a request by paying a ₹500 registration fee, which is refundable. Your registration fee will be refunded upon completion of a Social Internship or participation in events and conferences.' 
  },
  { 
    id: 2, 
    title: 'Benefits of Membership', 
    response: 'Access to over ₹2 lakh worth of premium resources at no cost. Internships through CAF. Free access to major events, competitions, and conferences. Certification for every activity and participation, with opportunities for international certification through conferences. Free access to the Help Desk for any resources or assistance. And many more benefits!' 
  },
  { 
    id: 3, 
    title: 'Refund Process', 
    response: 'Complete a Social Internship and participate in events or conferences to apply for a refund through the "Participation Certificate."' 
  },
  { 
    id: 4, 
    title: 'Premium Access Error', 
    response: 'If you encounter errors accessing premium resources or links, please reach out to the Help Desk. Your issue will be resolved within 2-3 working days.' 
  },
  { 
    id: 5, 
    title: 'Payment Problem', 
    response: 'For any payment issues, contact the Help Desk or our WhatsApp support immediately. Your query will be resolved promptly.' 
  },
  { 
    id: 6, 
    title: 'Other Doubts', 
    response: 'Visit our FAQ page for more information.' 
  },
  { 
    id: 7, 
    title: 'Premium Access Problem', 
    response: 'If you encounter any errors accessing premium resources through the portal, please visit the Help Desk. We will ensure the premium content is sent to you via email.' 
  }
];


export default function Home() {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const handleTopicSelection = (topic: string) => {
    const newMessage: Message = {
      role: 'user',
      content: topic,
    };
    setChatHistory((prevChat) => [...prevChat, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const response = topics.find(t => t.title === topic)?.response || 'Sorry, I didn\'t understand that.';
      const newAssistantMessage: Message = {
        role: 'assistant',
        content: response,
      };
      setChatHistory((prevChat) => [...prevChat, newAssistantMessage]);
    }, 1000);
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    const newUserMessage: Message = { role: 'user', content: userInput };
    const updatedChatHistory = [...chatHistory, newUserMessage];

    setChatHistory(updatedChatHistory);
    setUserInput('');

    // Simulate bot response
    setTimeout(() => {
      const newAssistantMessage: Message = {
        role: 'assistant',
        content: 'This is a bot response.',
      };
      setChatHistory((prevChat) => [...prevChat, newAssistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  if (isClosed) return null;

  return (
    <div className={`fixed bottom-4 right-4 w-full max-w-sm ${isMinimized ? 'h-12' : 'h-[calc(100vh-2rem)]'} transition-all duration-300`}>
      <div className={`bg-white p-4 rounded-lg shadow-lg ${isMinimized ? 'h-full' : 'h-[calc(100vh-2rem)]'} overflow-hidden`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className={`text-2xl font-bold text-blue-500 ${isMinimized ? 'text-base' : ''}`}>{isMinimized ? 'Chatbot' : 'Chatbot'}</h1>
          <div>
            <button 
              onClick={() => setIsMinimized(!isMinimized)} 
              className="text-gray-500 hover:text-gray-700 mr-2"
              aria-label={isMinimized ? 'Maximize' : 'Minimize'}
            >
              <FontAwesomeIcon icon={isMinimized ? faChevronUp : faChevronDown} />
            </button>
            <button 
              onClick={() => setIsClosed(true)} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="mb-4 h-3/4 overflow-y-auto border border-gray-300 p-2 rounded-lg bg-gray-50">
              <div className="flex items-center flex-col mb-2">
                <div className="mb-4">
                  <h2 className="text-xs max-w-md rounded-xl bg-green-500 text-white p-2">Welcome! I'm here to help you with any queries you have about our membership, resources, events, and social internships.</h2>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full text-xs">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelection(topic.title)}
                      className="bg-white text-blue-500 border border-blue-500 p-2 text-xs rounded-3xl hover:bg-blue-500 hover:text-white"
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              </div>

              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className={`max-w-md rounded-xl p-2 text-xs ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Type a message"
                value={userInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l-lg"
              />
              {isLoading ? (
                <div className="bg-blue-500 text-gray-100 p-2 rounded-r-lg animate-pulse">
                  wait...
                </div>
              ) : (
                <button onClick={handleUserInput} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              )}
            </div>

            <div className="flex mb-2 justify-between gap-2">
              <a
                href="#"
                className="bg-white text-blue-500 border border-blue-500 p-2 text-xs rounded-lg hover:bg-blue-500 hover:text-white text-center w-full"
              >
                Helpdesk
              </a>
              <a
                href="#"
                className="bg-white text-blue-500 border border-blue-500 p-2 text-xs rounded-lg hover:bg-blue-500 hover:text-white text-center w-full"
              >
                Complaint & Support
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
