"use client"
import { RetailerMenu } from "@/components/retailerMenu/retailerMenu";
import { AffiliatesGroups } from "@/components/affiliatesGroups/affiliatesGroup"; 
import { ApiDataContextProvider, RetailerProps } from "@/context/apiDataContext"; 

interface PageClientProps {
    retailers: RetailerProps[]; 
} 

export const PageClient = ({ retailers }: PageClientProps) => {   

    return (
        <ApiDataContextProvider 
            retailers={retailers}
        >
            <div className="relative mt-10 w-[90vw] max-x-[800px] inset-x-0 m-auto">
                <RetailerMenu />
                <AffiliatesGroups />
            </div>
        </ApiDataContextProvider>
    );
}