import { IsNotEmpty, IsOptional } from "class-validator";

abstract class ImportSalesDTO{
    abstract file: string[];
    @IsNotEmpty({
        message: 'retailerId, Varejista é obrigatório'
    })
    abstract retailerId: string;
    @IsOptional()  
    @IsNotEmpty({
        message: 'affiliateId não pode ser uma string vazia'
    })

    abstract affiliateId?: string;
}
  
export { ImportSalesDTO,};