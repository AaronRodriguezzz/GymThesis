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

    const response = await getBotResponse(inputMessage)
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
  };

  const getBotResponse = async (userInput) => {
    const response = await postData('/api/ai/chat', { message: userInput })

    if(response?.success){
      return response.response
    }

    return response.message
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-2 z-50">

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[400px] h-[500px] md:h-[600px] 
          bg-gray-900 rounded-2xl shadow-2xl
          flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">

          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between relative">
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white/30">
                <Zap className="w-4 h-4 text-white" />
              </div>

              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white/80 text-xs">Active</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200 hover:rotate-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white 
            scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 ring-blue-400/50'
                    : 'bg-blue-700 ring-blue-500/40'
                }`}>
                  {message.sender === 'user'
                    ? <User className="w-4 h-4 text-white" />
                    : <Bot className="w-4 h-4 text-white" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-xs ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-2 rounded-2xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-blue-800 text-white rounded-bl-sm border border-blue-700'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center ring-2 ring-blue-500/40">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 px-4 py-3 rounded-2xl border border-gray-700 shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t-1 border-gray-500/30">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white  border border-gray-600 rounded-full 
                   placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 
                  text-white p-3 rounded-full transition-all duration-200 
                  shadow-lg hover:scale-105 disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center 
            bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-110"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </button>
      )}

    </div>
  );
}