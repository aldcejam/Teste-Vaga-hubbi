import { IsNotEmpty, IsNumber } from "class-validator";

abstract class CreateProductDTO {
    @IsNotEmpty({
        message: 'name é necessário'
    })
    abstract name: string;
    @IsNotEmpty({
        message: 'affiliatePercent de afiliado é necessário'
    })
    @IsNumber({},{message: 'percentual do afiliado deve ser um número'})
    abstract affiliatePercent: number;
    @IsNotEmpty({
        message: 'retailerId de Varejista é necessário'
    })
    abstract retailerId: string;
    abstract affiliateId?: string;
}

export { CreateProductDTO };