import { AffiliatesGroups } from "../affiliatesGroups/affiliatesGroup"
import { RetailerMenu } from "../retailerMenu/retailerMenu"
import { UploadSales } from "../uploadSales/uploadSales"

export const ImportSales = () => {
    return (
        <div>
            <h2
                className="text-3xl text-center text-font font-bold my-10"
            >Enviar vendas por arquivo</h2>
            <RetailerMenu />
            <AffiliatesGroups />
            <UploadSales />
        </div>
    )
}