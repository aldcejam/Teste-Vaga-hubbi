import { SaleRepository } from "@domain/sale/SaleRepository";
import { FindSalesDTO } from "@dtos/sale/FindSalesDTO";
import { HttpException } from "@nestjs/common";
import { Sale } from "@prisma/client";

class FindSalesUseCase {
  constructor(
    private saleRepository: SaleRepository,
  ) {}

  async execute({retailerId,affiliateId}:FindSalesDTO): Promise<Sale[]> {
     
    if(!affiliateId){
        try{
            return await this.saleRepository.findbyRetailerId(retailerId);
        }
        catch(err){
            throw new HttpException('Não encontrado', 404);
        }
    }

    if(affiliateId && retailerId){
        try{
            return await this.saleRepository.findByRetailerIdAndAffiliateId({ retailerId, affiliateId });
        }
        catch(err){
            throw new HttpException('Afiliado não existe', 404);
        }
        
    } 
  }
}

export { FindSalesUseCase };