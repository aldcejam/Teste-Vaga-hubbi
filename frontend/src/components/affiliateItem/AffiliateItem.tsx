"use client"
import styled from "./styled.module.scss" 

interface AffiliateItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    name: string;
    isActive: boolean;
}

export const AffiliateItem = ({ name, isActive, ...props }: AffiliateItemProps) => {

    return (
        <button
            {...props}
            data-active={isActive}
            className={styled.AffiliateItem}
            role="button"
        >
            {name}
        </button>
    );
}
