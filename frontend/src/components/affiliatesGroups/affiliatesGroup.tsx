"use client"
import { AffiliateProps, useApiDataStateContext } from "@/context/apiDataContext";
import { AffiliateItem } from "../affiliateItem/AffiliateItem"
import styled from "./styled.module.scss"
import { use, useEffect, useState } from "react"; 

export const AffiliatesGroups = () => {

    const { retailerSelected } = useApiDataStateContext();
    const [affiliates, setAffiliates] = useState<AffiliateProps[]>([]);
    
    useEffect(() => { 
            async function GetAffiliateByRetailer() {
                const res = await fetch(`/api/afiliado/?retailerId=${retailerSelected.state}`)
                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    console.log(message);
                }
            
                const data = await res.json(); 
                setAffiliates(data);
            }
            GetAffiliateByRetailer();
             
    }, [retailerSelected.state])
    
    console.log(affiliates);
    
    if(!retailerSelected.state) return (
        <div className={styled.affiliatesGroups}>
           <h2>Selecione um Varejista</h2>
        </div>
    )
   /*  if(retailerSelected.state && affiliates) return (
        <div className={styled.affiliatesGroups}>
            {
                affiliates.map(affiliate => (
                    <AffiliateItem 
                        key={affiliate.id}
                        name={affiliate.name}
                        isActive={affiliate.id === retailerSelected.state?.id}
                    />
                ))
            }
        </div>
    ) */
    
}