import { IsNotEmpty } from "class-validator";

abstract class FindAffiliateByRetailerDTO {

    @IsNotEmpty({
        message: "retailerId, identificador de varejista é obrigatório"
    })
    retailerId: string;
}

export { FindAffiliateByRetailerDTO }