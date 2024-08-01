// Home.tsx
"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const topics = [
  { id: 1, title: 'Membership Information', response: 'Our membership program provides access to valuable resources, courses, internships, and events. The fee ensures that members fully engage with these opportunities.' },
  { id: 2, title: 'Refund Policy', response: 'Yes, the membership fee is refundable! You can earn it back by participating in our social internships, events, and conferences.' },
  { id: 3, title: '200+ Premium Courses', response: 'We offer over 200 premium courses in various domains to boost your skills and knowledge.' },
  { id: 4, title: 'Uni AI', response: 'Uni AI is our advanced AI tool designed to help you excel academically and professionally.' },
  { id: 5, title: '5000+ Digital Premiums', response: 'Our digital library includes over 5000 resources, from eBooks to design assets.' },
  { id: 6, title: 'Premium Notes', response: 'Access expertly crafted notes for all domains to aid your studies.' },
  { id: 7, title: 'Career Track', response: 'Our career track guides you step by step to become job-ready with essential skills.' },
  { id: 8, title: 'AI Tools for XGrowth', response: 'Use our top AI tools to accelerate your growth in your career and projects.' },
  { id: 9, title: 'TRU Magazine - Eco-Management Pitch Event', response: 'Join our pitch event focused on eco-management and showcase your sustainable practices.' },
  { id: 10, title: 'Eco-Friendly Innovations Pitch', response: 'Present your eco-friendly ideas at our upcoming pitch event.' },
  { id: 11, title: 'Startup & Innovation Summit', response: 'Pitch your startup or innovation to experts and investors at our summit.' },
  { id: 12, title: 'Prevent Animal Cruelty Campaign', response: 'Join us in raising awareness and taking action against animal cruelty.' },
  { id: 13, title: 'Clothes and Food Donation Drive', response: 'Contribute to our drive by donating clothes and food to those in need.' },
  { id: 14, title: 'Social Campaign for Awareness', response: 'Participate in our campaigns to spread awareness about critical societal issues.' },
  { id: 15, title: 'Video Creation', response: 'Create a 3-minute video on an important social issue and share your insights.' },
  { id: 16, title: 'Video Summarization', response: 'Watch 5 videos, summarize the life lessons, and connect them with your experiences.' },
  { id: 17, title: 'Old Clothes Donation', response: 'Donate old clothes, record your experience, and inspire others to do the same.' },
  { id: 18, title: 'Environmental Initiatives', response: 'Collect and send empty milk packets and seeds to support our environmental initiatives.' },
  { id: 19, title: 'Life Lessons Explanation', response: 'Read life lesson chapters by Osho and explain them in your own words.' },
  { id: 20, title: 'Membership Fee', response: 'Why do I have to pay a membership fee? - The fee ensures that students value and utilize the resources effectively.' },
  { id: 21, title: 'Membership Benefits', response: 'What benefits do I get with the membership? - Access to premium courses, internships, events, and more.' },
  { id: 22, title: 'Certification', response: 'Can we get certification for attending events and internships? - Yes, you will receive certifications for participation.' },
  { id: 23, title: 'Partner Support', response: 'How do your partnered organizations help us? - They provide resources, mentorship, and networking opportunities.' },
  { id: 24, title: 'Learning Beyond School', response: 'At UN Francisco, gain practical knowledge and skills that transform your life.' },
  { id: 25, title: 'Skill Development', response: 'Become skilled at what matters and prepare yourself for the real world.' }
];


export default function Home() {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
    <div className={`fixed bottom-4 right-4 w-full max-w-xs ${isMinimized ? 'h-12' : 'h-[calc(100vh-2rem)]'} transition-all duration-300`}>
      <div className={`bg-white p-4 rounded-lg shadow-lg ${isMinimized ? 'h-full' : 'h-[calc(100vh-2rem)]'} overflow-hidden`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className={`text-2xl font-bold text-blue-500 ${isMinimized ? 'text-base' : ''}`}>{isMinimized ? 'Chatbot' : 'Chatbot'}</h1>
          <div>
            <button 
              onClick={() => setIsMinimized(!isMinimized)} 
              className="text-gray-500 hover:text-gray-700 mr-2"
              aria-label={isMinimized ? '' : 'Minimize'}
            >
              {isMinimized ? '🔼' : '🔽'}
            </button>
            <button 
              onClick={() => setIsClosed(true)} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ❌
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="mb-4 h-3/4 overflow-y-auto border border-gray-300 p-2 rounded-lg bg-gray-50">
              <div className="flex items-center flex-col mb-2">
              <div className="mb-4">
              <h2 className="text-sm max-w-md rounded-xl bg-green-500 text-white p-2">Welcome! I'm here to help you with any queries you have about our membership, resources, events, and social internships.</h2>
              </div>
                <div className="w-full flex justify-center mb-2">
                  <Select onValueChange={(value) => handleTopicSelection(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.title}>
                          {topic.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className={`max-w-md rounded-xl p-2 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
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
                  Send
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
