"use client"
import { CreateRetailer as CreateRetailerFetch } from "@/app/api/CreateRetailer"
import { TextField, styled } from "@mui/material"
import { useEffect, useState } from "react"
import styledd from "./styled.module.scss"


const CssTextField = styled(TextField)({
    '& label': {
        color: '#ffffff',
    },
    '& label.Mui-focused': {
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


export const CreateRetailer = () => {

    const [retailerName, setRetailerName] = useState<string | undefined>()
    const [createRetailer, setCreateRetailer] = useState<boolean>(false)

    useEffect(() => {
        if (createRetailer) {
            CreateRetailerFetch({ name: retailerName })
            setCreateRetailer(false)
        }
    }, [createRetailer])

 
    return (
        <div className={styledd.createretailer}>
            <h2>
                Cadastrar varejista
            </h2>
            <div>

                <CssTextField
                    id="outlined-basic"
                    label="Nome do varejista"
                    variant="outlined"
                    value={retailerName}
                    onChange={e => setRetailerName(e.target.value)}
                />
                <button
                    className={styledd["button-send"]}
                    onClick={() => setCreateRetailer(true)}
                >
                    Criar varejista
                </button>
            </div>
        </div>
    )
}