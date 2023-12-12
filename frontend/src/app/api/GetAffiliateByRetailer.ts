"use client"
import { AffiliateProps } from "@/context/apiDataContext";

 

interface GetAffiliateByRetailerProps { 
    retailerID: string;
    setState: React.Dispatch<React.SetStateAction<AffiliateProps[]>>;
}

async function GetAffiliateByRetailer({retailerID,setState}:GetAffiliateByRetailerProps) {
    const res = await fetch(`/api/afiliado/?retailerId=${retailerID}`)
    if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        console.log(message);
    }

    const data = await res.json(); 
    setState(data);
}


export { GetAffiliateByRetailer }