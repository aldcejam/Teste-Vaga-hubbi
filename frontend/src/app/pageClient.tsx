"use client"
import { RetailerMenu } from "@/components/retailerMenu/retailerMenu";
import { AffiliatesGroups } from "@/components/affiliatesGroups/affiliatesGroup"; 
import { AffiliateProps, DataContextProvider, RetailerProps } from "@/context/dataContext";

interface PageClientProps {
    retailers: RetailerProps[];
    affiliates: AffiliateProps[];
} 

export const PageClient = ({ retailers, affiliates }: PageClientProps) => {  

    return (
        <DataContextProvider
            affiliates={affiliates}
            retailers={retailers}
        >
            <div className="relative mt-10 w-[90vw] max-x-[800px] inset-x-0 m-auto">
                <RetailerMenu />
                <AffiliatesGroups />
            </div>
        </DataContextProvider>
    );
}