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
        state: RetailerProps | undefined;
        setState: React.Dispatch<React.SetStateAction<RetailerProps | undefined>>;
    };
    affiliateSelected: {
        state: AffiliateProps | undefined;
        setState: React.Dispatch<React.SetStateAction<AffiliateProps | undefined>>;
    };
    retailerTOCREATEaffiliate:{
        state: RetailerProps | undefined;
        setState: React.Dispatch<React.SetStateAction<RetailerProps | undefined>>;
    };
}

const ApiDataContext = createContext<ApiDataContextProps | undefined>(undefined);

export const ApiDataContextProvider: React.FC<ChildrenProps> = ({
    children, 
    retailers,
}) => { 
    const [retailer, setRetailer] = useState<RetailerProps | undefined>(undefined);
    const [affiliateSelected, setAffiliateSelected] = useState<AffiliateProps | undefined>(undefined);
    const [retailerTOCREATEaffiliate, setRetailerTOCREATEaffiliate] = useState<RetailerProps | undefined>(undefined);
    
    return (
        <ApiDataContext.Provider
            value={{ 
                retailers , 
                retailerSelected: {
                    state: retailer,
                    setState: setRetailer,
                },
                affiliateSelected: {
                    state: affiliateSelected,
                    setState: setAffiliateSelected,
                },
                retailerTOCREATEaffiliate:{
                    state: retailerTOCREATEaffiliate,
                    setState: setRetailerTOCREATEaffiliate,
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
