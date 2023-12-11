"use client"
import styled from "./styled.module.scss"
import { motion } from "framer-motion"

interface AffiliateItemProps {
    name: string;
    isActive: boolean;
}

export const AffiliateItem = ({name, isActive}:AffiliateItemProps) => {
     
    return ( 
        <motion.button 
        data-active={isActive}
        className={styled.AffiliateItem} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} >
            {name}
        </motion.button> 
    );
}
