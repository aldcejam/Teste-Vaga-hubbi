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
    affiliates: AffiliateProps[];
    retailers: RetailerProps[];
}

interface DataContextProps {
    affiliates: AffiliateProps[];
    retailers: RetailerProps[];
    affiliate: {
        state: AffiliateProps | undefined;
        setState: React.Dispatch<React.SetStateAction<AffiliateProps | undefined>>;
    };
    retailer: {
        state: RetailerProps | undefined;
        setState: React.Dispatch<React.SetStateAction<RetailerProps | undefined>>;
    };
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataContextProvider: React.FC<ChildrenProps> = ({
    children,
    affiliates,
    retailers,
}) => {
    const [affiliate, setAffiliate] = useState<AffiliateProps | undefined>();
    const [retailer, setRetailer] = useState<RetailerProps | undefined>();

    return (
        <DataContext.Provider
            value={{
                affiliates,
                retailers,
                affiliate: {
                    state: affiliate,
                    setState: setAffiliate,
                },
                retailer: {
                    state: retailer,
                    setState: setRetailer,
                },
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useDataStateContext = (): DataContextProps => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataStateContext must be used within a DataContextProvider');
    }
    return context;
};
