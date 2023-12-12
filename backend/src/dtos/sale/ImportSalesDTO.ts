import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

abstract class ImportSalesDTO{ 
    abstract sales: Express.Multer.File;
    @IsNotEmpty({
        message: 'retailerId, Varejista é obrigatório'
    })
    abstract retailerId: string; 
    @IsNotEmpty({
        message: 'affiliateId não pode ser uma string vazia'
    })

    abstract affiliateId?: string;
}
  
export { ImportSalesDTO,};