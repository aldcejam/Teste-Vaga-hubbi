import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface RetailerProps {
    id: string;
    name: string;
}

export interface AffiliateProps {
    id: string;
    name: string;
    retailerId: string;
}

interface ChildrenProps {
    children: ReactNode; 
    retailers: RetailerProps[];
}

interface ApiDataContextProps { 
    retailers: RetailerProps[]; 
    retailerSelected: {
        state: string | undefined;
        setState: React.Dispatch<React.SetStateAction<string | undefined>>;
    };
}

const ApiDataContext = createContext<ApiDataContextProps | undefined>(undefined);

export const ApiDataContextProvider: React.FC<ChildrenProps> = ({
    children, 
    retailers,
}) => { 
    const [retailer, setRetailer] = useState<string | undefined>();

    return (
        <ApiDataContext.Provider
            value={{ 
                retailers, 
                retailerSelected: {
                    state: retailer,
                    setState: setRetailer,
                },
            }}
        >
            {children}
        </ApiDataContext.Provider>
    );
};

export const useApiDataStateContext = (): ApiDataContextProps => {
    const context = useContext(ApiDataContext);
    if (!context) {
        throw new Error('useApiDataStateContext must be used within a ApiDataContextProvider');
    }
    return context;
};
