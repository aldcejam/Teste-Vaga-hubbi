import { AffiliateRepository } from '@domain/ratailer/affiliate/AffiliateRepository';
import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import ProductRepository from "@domain/ratailer/product/ProductRepository";
import { SaleRepository } from "@domain/ratailer/sale/SaleRepository";
import { ImportSalesDTO } from "@dtos/sale/ImportSalesDTO";
import { Sale } from "@prisma/client";
import { GetDateToSales } from "src/utils/GetDateToSales";
import { HttpException } from '@nestjs/common';

class ImportSalesUseCase {
    constructor(
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository,
    ) {} 
    
    async execute({file, retailerId, affiliateId}: ImportSalesDTO): Promise<{ saleCadastrated: Sale[], saleAlreadyCadastrated: Sale[] }> { 
        const sales = GetDateToSales(file);        
        const saleCadastrated: Sale[] = [];
        const saleAlreadyCadastrated = [];

        const retailerExists = await this.retailerRepository.findById(retailerId);
        if(!retailerExists) {
            throw new HttpException('varejista não existe', 404);
        }
        if(affiliateId) {
            const affiliateExists = await this.affiliateRepository.findById(affiliateId); 
            if (affiliateId != null && affiliateExists.retailerId != retailerId) {
                throw new HttpException('Afiliado não pertence a este varejista', 404);
            }
        }

        const promises = sales.map(async sale => {
            const saleAlreadyCadastred = await this.saleRepository.findByDateAndRetailerIdAndAffiliateId({
                affiliateId,
                retailerId,
                date: sale.transactionDate
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
                });
            }
        });

        await Promise.all(promises);

        return { saleCadastrated, saleAlreadyCadastrated };
    }
}

export default ImportSalesUseCase;
