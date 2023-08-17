import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext(null);

export function MyContextProvider({ children }) {
   const [projectName, setProjectName] = useState('');
   const [projectDescription, setProjectDescription] = useState('');
   const [client, setClient] = useState('');
   const [contractor, setContractor] = useState('');
   const [csvFile, setCsvFile] = useState(null);

   const [maxX, setMaxX] = useState('');
   const [minX, setMinX] = useState('');
   const [maxY, setMaxY] = useState('');
   const [minY, setMinY] = useState('');
   const [maxZ, setMaxZ] = useState('');
   const [minZ, setMinZ] = useState('');

   const [userInput_maxX, setUserInput_MaxX] = useState('');
   const [userInput_maxY, setUserInput_maxY] = useState('');
   const [userInput_maxZ, setUserInput_maxZ] = useState('');

   const [userInput_minX, setUserInput_minX] = useState('');
   const [userInput_minY, setUserInput_minY] = useState('');
   const [userInput_minZ, setUserInput_minZ] = useState('');


   const contextValue = {
      maxX,
      minX,
      maxY,
      minY,
      maxZ,
      minZ,
      setMaxX,
      setMinX,
      setMaxY,
      setMinY,
      setMaxZ,
      setMinZ,
      userInput_maxX,
      userInput_maxY,
      userInput_maxZ,
      userInput_minX,
      userInput_minY,
      userInput_minZ,
      setUserInput_minX,
      setUserInput_minY,
      setUserInput_minZ,
      setUserInput_MaxX,
      setUserInput_maxY,
      setUserInput_maxZ,
      projectName, setProjectName,
      projectDescription, setProjectDescription,
      client, setClient,
      contractor, setContractor,
      csvFile, setCsvFile,
   };

   return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
}

export function useMyContext() {
   return useContext(MyContext);
}