import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [myReservations, setMyReservations] = useState([]);

  return (
    <AppContext.Provider value={{ myReservations, setMyReservations }}>
      {children}
    </AppContext.Provider>
  );
};