import { toast } from "react-toastify";

interface SendSaleFileProps {
    file: any;
    retailerId: string | undefined;
    affiliateId: string | undefined;
    setState: React.Dispatch<React.SetStateAction<any>>;
}

export const SendSaleFile = async ({file,affiliateId,retailerId,setState}:SendSaleFileProps) => {
    
    if(retailerId === undefined){
        toast.error("Selecione um varejista");
        return;
    }
    if(affiliateId === undefined){
        toast.error("Selecione um afiliado");
        return;
    }
    
    const formData = new FormData();
    formData.append("sales", file); 

    const res = await fetch(`/api/vendas/import?retailerId=${retailerId}&affiliateId=${affiliateId}`, {
        method: 'POST',
        
        body: formData,
    });
    
    if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        console.log(message);
    }

    const data = await res.json();
    setState(data);
}