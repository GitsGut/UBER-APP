import React , {createContext} from 'react'
import {useState} from 'react'

export const CaptainDataContext = createContext();
const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const UpdateCaptain = (captainData) => {
    setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        UpdateCaptain,
        isLoading,
        setIsLoading,
        error,
        setError
    };
    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;