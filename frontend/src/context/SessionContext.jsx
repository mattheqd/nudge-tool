import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [scratchpadText, setScratchpadText] = useState("");
  const [messages, setMessages] = useState([]);

  const value = {
    sessionId,
    setSessionId,
    scratchpadText,
    setScratchpadText,
    messages,
    setMessages,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}; 