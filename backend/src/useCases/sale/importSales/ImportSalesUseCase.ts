import { Sale } from "@prisma/client";
import { AffiliateRepository } from '@domain/affiliate/AffiliateRepository';
import { RetailerRepository } from "@domain/ratailer/RetailerRepository"; 
import { SaleRepository } from "@domain/sale/SaleRepository";
import { ImportSalesDTO } from "@dtos/sale/ImportSalesDTO";
import { GetDateToSales } from "src/utils/GetDateToSales";
import { HttpException } from '@nestjs/common'; 

class ImportSalesUseCase {
    constructor(
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository
    ) {}
    
    async execute({file, retailerId, affiliateId}: ImportSalesDTO): Promise<{ saleCadastrated: Sale[], saleAlreadyCadastrated: Sale[] }> { 
        const sales = GetDateToSales(file);        
        const saleCadastrated: Sale[] = [];
        const saleAlreadyCadastrated = [];

        try{
            await this.retailerRepository.findById(retailerId);
        }
        catch(err){
            throw new HttpException('Varejista não existe', 404);
        } 
        
        if(affiliateId) {
            try{
                const affiliateExists = await this.affiliateRepository.findById(affiliateId);

                if (affiliateExists.retailerId != retailerId) {
                    throw new HttpException('Afiliado não pertence a este varejista', 404);
                }
            }
            catch(err){
                throw new HttpException('Afiliado não existe', 404);
            }
 
        }

        const promises = sales.map(async sale => {

            const saleAlreadyCadastred = await this.saleRepository.findByDateAndRetailerIdAndAffiliateIdByTransactionType({
                affiliateId,
                retailerId,
                date: sale.transactionDate,
                transactionType: sale.transactionType
            });

            if (!saleAlreadyCadastred) {
                const createdSale = await this.saleRepository.create({
                    date: sale.transactionDate,
                    price: sale.price,
                    product: sale.product,
                    retailerId,
                    seller: sale.saller,
                    transactionType: sale.transactionType,
                    affiliateId: affiliateId ? affiliateId : null,
                });
                saleCadastrated.push(createdSale);
            } else {
                saleAlreadyCadastrated.push({
                    product: sale.product,
                    date: sale.transactionDate,
                    price: sale.price,
                    seller: sale.saller,
                    transactionType: sale.transactionType,
                });
            }
        });

        await Promise.all(promises);

        return { saleCadastrated, saleAlreadyCadastrated };
    }
}

export { ImportSalesUseCase };
