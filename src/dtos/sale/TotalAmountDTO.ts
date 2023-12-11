import { IsNotEmpty, IsOptional } from "class-validator";

abstract class TotalAmountDTO {
    @IsNotEmpty({
        message: 'retailerId, Varejista é obrigatório'
    })
    abstract retailerId: string;

    @IsOptional()
    @IsNotEmpty({
        message: 'affiliateId, referencial de Afiliado não pode ser vazio'
    })
    abstract affiliateId?: string;
}

export { TotalAmountDTO }