import { useDataStateContext } from "@/context/dataContext";
import { AffiliateItem } from "../affiliateItem/AffiliateItem"
import styled from "./styled.module.scss"

export const AffiliatesGroups = () => {

    const {retailer,affiliates } = useDataStateContext();

    const affiliatesFiltered = affiliates.filter(affiliate => affiliate.retailerId === retailer.state?.id)
    
    if(!retailer.state) return (
        <div className={styled.affiliatesGroups}>
           <h2>Nenhum Afiliado disponível</h2>
        </div>
    )
    if(affiliatesFiltered.length) return (
        <div className={styled.affiliatesGroups}>
            {
                affiliatesFiltered.map(affiliate => (
                    <AffiliateItem 
                        key={affiliate.id}
                        name={affiliate.name}
                        isActive={affiliate.id === retailer.state?.id}
                    />
                ))
            }
        </div>
    )
    
}