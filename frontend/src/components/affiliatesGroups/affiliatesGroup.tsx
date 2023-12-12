"use client"
import { AffiliateProps, useApiDataStateContext } from "@/context/apiDataContext";
import { AffiliateItem } from "../affiliateItem/AffiliateItem"
import styled from "./styled.module.scss"
import { useEffect, useState } from "react"; 
import { GetAffiliateByRetailer } from "@/app/api/GetAffiliateByRetailer";

export const AffiliatesGroups = () => {

    const { retailerSelected, affiliateSelected } = useApiDataStateContext();
    const [affiliates, setAffiliates] = useState<AffiliateProps[]>([]);
    
    useEffect(() => {
        if(retailerSelected.state){  
            GetAffiliateByRetailer({
                setState: setAffiliates,
                retailerID: retailerSelected.state.id
            });
        }   
    }, [retailerSelected.state]) 
    
    if(!retailerSelected.state) return (
        <div className={styled.affiliatesGroups}>
           <h2>Selecione um Varejista</h2>
        </div>
    )
    if(retailerSelected.state && affiliates) return (
        <div className={styled.affiliatesGroups}>
            {
                affiliates.map(affiliate => (
                    <AffiliateItem 
                        key={affiliate.id}
                        name={affiliate.name}
                        isActive={affiliate.id === affiliateSelected.state?.id}
                        onClick={()=> affiliateSelected.setState({id:affiliate.id, name:affiliate.name, retailerId:affiliate.retailerId})}
                    />
                ))
            }
        </div>
    )
    
}