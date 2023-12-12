import { toast } from "react-toastify";

interface CreateRetailerProps {
    name: string | undefined;
}

async function CreateRetailer({ name }: CreateRetailerProps) {
    if (!name) {
        toast.error("Nome do varejista não pode ser vazio");
        return;
    }

    const res = await fetch(`/api/retailer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });

    if (!res.ok) {
        try {
            const errorData = await res.json(); // Parse the JSON response body
            toast.error(errorData.message || "Erro desconhecido");
            console.error(errorData);
        } catch (error) {
            toast.error("Erro ao processar a resposta do servidor");
            console.error(error);
        }
        return;
    }

    toast.success("Varejista criado com sucesso!");
    window.location.reload();
}

export { CreateRetailer };
