'use client';
import { useState } from 'react';
import { getFirestore, collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
//import { firestore as db } from '../../firebaseApp';
import { FaEnvelope } from 'react-icons/fa';

type Chat = {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
  };

  
const MessagePage = () => {
  // State for chat history and messages
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    { id: 1, name: "John Doe", lastMessage: "How much is this product?", time: "2m ago" },
    { id: 2, name: "Jane Smith", lastMessage: "Can you ship to Rwanda?", time: "5m ago" },
    // More dummy data or fetched data
  ]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null); // Active chat details
  const [newMessage, setNewMessage] = useState<string>(""); // State for new message input

  // Function to handle sending a message
  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // You can add the logic to send the message here using Firebase, e.g.
    // await addDoc(collection(db, 'messages'), { message: newMessage, chatId: activeChat.id });
    console.log("Message sent:", newMessage);
    setNewMessage("");
  };

  // Handle selecting a chat from chat history
  const selectChat = (chat: any) => {
    setActiveChat(chat);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section - Chat History */}
      <div className="w-1/3 bg-white p-4 border-r overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Chat History</h3>
        <ul className="space-y-2">
          {chatHistory.map((chat) => (
            <li
              key={chat.id}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-100 ${activeChat?.id === chat.id && 'bg-gray-200'}`}
              onClick={() => selectChat(chat)}
            >
              <div className="flex justify-between">
                <span className="font-medium">{chat.name}</span>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600">{chat.lastMessage}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Chat Messaging */}
      <div className="w-2/3 bg-white p-4 flex flex-col justify-between">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="border-b pb-4">
              <h4 className="text-lg font-semibold">{activeChat.name}</h4>
            </div>

            {/* Chat Messages (You can map over messages and display them here) */}
            <div className="flex-grow overflow-y-auto p-4 space-y-2">
              <p className="bg-gray-100 p-2 rounded-lg text-sm">User: {activeChat.lastMessage}</p>
              <p className="bg-blue-500 text-white p-2 rounded-lg text-sm self-end">You: This is a reply message</p>
              {/* More chat messages */}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-lg"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">Select a chat to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
