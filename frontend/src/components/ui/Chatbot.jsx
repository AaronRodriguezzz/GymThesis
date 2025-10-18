import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Zap } from 'lucide-react';
import { postData } from  '../../api/apis';

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm your AI assistant. Ready to help you out! 🔥",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const getBotResponse = async (userInput) => {
    const response = await postData('/api/ai/chat', { message: userInput })
    return response.response
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-2 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[400px] h-[500px] md:h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 p-4 flex items-center justify-between relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-8 h-8  bg-opacity-20 rounded-full flex items-center justify-center ring-2 ring-white ring-opacity-30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-red-100 text-xs">Active</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-all duration-200 hover:rotate-90 relative z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-black-600 ring-blue-400 ring-opacity-50' 
                    : 'bg-gradient-to-br from-gray-700 to-gray-600 ring-gray-500 ring-opacity-50'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-xs ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm shadow-lg'
                      : 'bg-gray-800 text-gray-100 rounded-bl-sm shadow-lg border border-gray-700'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-gray-500 ring-opacity-50">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-sm shadow-lg border border-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-850">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white p-3 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-red-500/25 hover:scale-105 disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-gray-700 hover:bg-gray-600 shadow-gray-900/50' 
            : 'bg-gradient-to-br from-blue-600 via-blue-500 to-black-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 shadow-blue-500/25'
        }`}
      >
        <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      </button>}
    </div>
  );
}