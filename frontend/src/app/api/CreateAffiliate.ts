import { toast } from "react-toastify";

interface CreateAffiliateProps  {
    retailerId: string | undefined;
    name: string | undefined;
}

export const CreateAffiliate = async ({name,retailerId}: CreateAffiliateProps) => {

    if(!name){
        toast.error("Name do afiliado é necessário");
        return;
    }
    if(!retailerId){
        toast.error("Varejista é necessário");
        return;
    }

    const res = await fetch(`/api/afiliado`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            retailerId
        })
    });

    if (!res.ok) {
        try {
            const errorData = await res.json();  
            toast.error(errorData.message || "Erro desconhecido");
            console.error(errorData);
        } catch (error) {
            toast.error("Erro ao processar a resposta do servidor");
            console.error(error);
        }
        return;
    }

    toast.success("Afiliado criado com sucesso!");
    window.location.reload();
     
}