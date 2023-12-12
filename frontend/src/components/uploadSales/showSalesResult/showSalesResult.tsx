"use client"
import { Box, Modal } from "@mui/material";

interface ShowSalesResultProps {
    modal: {
        state: boolean;
        setState: React.Dispatch<React.SetStateAction<boolean>>;
    };
}

export const ShowSalesResult = ({ modal }: ShowSalesResultProps) => {
    return (
        <Modal
            open={modal.state}
            onClose={() => modal.setState(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <h1>Teste</h1>
            </Box>
        </Modal>
    )
}