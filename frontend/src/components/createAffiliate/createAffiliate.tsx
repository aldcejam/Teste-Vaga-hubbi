import { TextField, styled } from "@mui/material";
import { use, useEffect, useState } from "react";
import styledd from "./styled.module.scss";
import { motion, Variants } from "framer-motion";
import { useApiDataStateContext } from "@/context/apiDataContext";
import { CreateAffiliate as CreateAffiliateFetch } from "@/app/api/CreateAffiliate";

const itemVariants: Variants = {
    open: {
        opacity: 1,
        display: "block",
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, display: "none", y: 20, transition: { duration: 0.2 } }

};

const CssTextField = styled(TextField)({
    '& label': {
        color: '#ffffff',
    },
    '& label.Mui-focused': {
        color: '#ffffff',
    },
    '& MuiInputBase-input ': {
        color: '#ffffff',
    },
    '& MuiOutlinedInput-input ': {
        color: '#ffffff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
});

export const CreateAffiliate = () => {

    const [affiliateName, setAffiliateName] = useState<string | undefined>()
    const [isOpen, setIsOpen] = useState(false);
    const [createAffiliate, setCreateAffiliate] = useState<boolean>(false)
    const { retailerTOCREATEaffiliate, retailers } = useApiDataStateContext() 

    useEffect(() => {
        if(createAffiliate){
            if (createAffiliate) {
                CreateAffiliateFetch({ name: affiliateName, retailerId: retailerTOCREATEaffiliate.state?.id })
                setCreateAffiliate(false)
            }
            setCreateAffiliate(false)
        }

    },[createAffiliate])


    return (
        <div className={styledd.createaffiliate}>
            <h2>Criar afiliado</h2>
            <div>


                <CssTextField
                    id="outlined-basic"
                    label="Nome do varejista"
                    variant="outlined"
                    value={affiliateName}
                    onChange={e => setAffiliateName(e.target.value)}
                />
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className={styledd.menu}
                >
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {retailerTOCREATEaffiliate.state ? `Varejista: ${retailerTOCREATEaffiliate.state.name}` : "Selecionar varejista"}
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
                                data-active={retailerTOCREATEaffiliate.state?.id == item.id}
                                onClick={() => retailerTOCREATEaffiliate.setState(item)}
                            >
                                {item.name}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.nav>
                <button
                    className={styledd["button-send"]}
                    onClick={() => setCreateAffiliate(true)}
                >
                    Criar afiliado
                </button>
            </div>
        </div>
    )
}