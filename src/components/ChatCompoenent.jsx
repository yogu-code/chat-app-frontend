"use client"
import React from 'react';
import { useState } from 'react';
import { Search, Mic, Paperclip, Send, MoreVertical, Edit2, Trash2, Circle, X, Check } from 'lucide-react';
function ChatCompoenent() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [editingText, setEditingText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", sender: "John", timestamp: "10:30 AM" },
    { id: 2, text: "I'm good, thanks!", sender: "me", timestamp: "10:31 AM" },
  ]);

  const users = [
    { id: 1, name: "John Doe", online: true, lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", online: false, lastMessage: "See you tomorrow!" },
    { id: 3, name: "Mike Johnson", online: true, lastMessage: "Thanks!" },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const startEditing = (message) => {
    setMessages(messages.map(msg => ({
      ...msg,
      isEditing: msg.id === message.id ? true : false
    })));
    setEditingText(message.text);
  };

  const cancelEditing = () => {
    setMessages(messages.map(msg => ({
      ...msg,
      isEditing: false
    })));
    setEditingText('');
  };

  const saveEdit = (messageId) => {
    if (editingText.trim()) {
      setMessages(messages.map(msg => 
        msg.id === messageId
          ? { ...msg, text: editingText, isEditing: false }
          : msg
      ));
      setEditingText('');
    }
  };

  const deleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-88px)]">
          {users.map(user => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${selectedUser?.id === user.id ? 'bg-gray-50' : ''}`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">{user.name[0]}</span>
                </div>
                <Circle
                  className={`absolute bottom-0 right-0 w-3 h-3 ${user.online ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`}
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b border-gray-200 flex items-center">
            <div className="flex items-center flex-1">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">{selectedUser.name[0]}</span>
                </div>
                <Circle
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${selectedUser.online ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`}
                />
              </div>
              <div className="ml-3">
                <h2 className="font-semibold">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500">{selectedUser.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg relative group ${
                    message.sender === 'me'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {message.isEditing ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full p-1 rounded bg-white text-gray-900 focus:outline-none"
                        autoFocus
                      />
                      <div className="flex space-x-1">
                        <button
                          onClick={() => saveEdit(message.id)}
                          className="p-1 hover:bg-blue-600 rounded"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-1 hover:bg-blue-600 rounded"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>{message.text}</p>
                      <span className="text-xs mt-1 block opacity-70">{message.timestamp}</span>
                      
                      {message.sender === 'me' && (
                        <div className="absolute top-2 -left-16 hidden group-hover:flex items-center space-x-1 bg-white rounded-lg shadow-md p-1">
                          <button
                            onClick={() => startEditing(message)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Mic className="w-5 h-5 text-gray-500" />
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}

export default ChatCompoenent;