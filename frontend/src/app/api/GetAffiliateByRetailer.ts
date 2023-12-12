"use client"
import { AffiliateProps } from "@/context/apiDataContext";
import { useEffect } from "react";

interface GetAffiliateByRetailerProps { 
    retailerID: string;
}

async function GetAffiliateByRetailer({ retailerID }: GetAffiliateByRetailerProps) {
    const res = await fetch(`/api/afiliado/?retailerId=${retailerID}`)
    if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        console.log(message);
    }

    const data = await res.json(); 
    return data as AffiliateProps[];
}


export { GetAffiliateByRetailer }