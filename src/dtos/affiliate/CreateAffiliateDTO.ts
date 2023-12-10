import { IsNotEmpty } from "class-validator";

abstract class CreateAffiliateDTO {
    @IsNotEmpty({
        message: "name do afiliado não pode ser vazio"
    })
    abstract name: string; 
    @IsNotEmpty({
        message: "retailerId do afiliado não pode ser vazio"
    })
    abstract retailerId: string;
}

export { CreateAffiliateDTO };