"use client"
import styled from "./styled.module.scss";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { RetailerProps, useApiDataStateContext } from "@/context/apiDataContext";

const itemVariants: Variants = {
    open: {
        opacity: 1,
        display:"block",
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, display:"none", y: 20, transition: { duration: 0.2 } }
    
}; 

export const RetailerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { retailers, retailerSelected, affiliateSelected } = useApiDataStateContext();
    const SelectRetailer = (retailer: RetailerProps) => {
        retailerSelected.setState({id: retailer.id, name: retailer.name});
        affiliateSelected.setState(undefined);
        setIsOpen(false);
    }

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className={styled.menu}
        >
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {retailerSelected.state? `Varejista: ${retailerSelected.state.name}`: "Selecionar varejista"}  
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </motion.div>
            </motion.button>
            <motion.ul
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >

                {retailers.map((item) => (
                    <motion.li 
                        variants={itemVariants} 
                        key={item.id}  
                        data-active={retailerSelected.state?.id == item.id}
                        onClick={() => SelectRetailer(item)}
                        >
                        {item.name}
                    </motion.li>
                ))} 
            </motion.ul>
        </motion.nav>
    )
}