import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { AffiliateRepository } from "@domain/ratailer/affiliate/AffiliateRepository";
import { SaleRepository } from "@domain/ratailer/sale/SaleRepository";
import { TotalAmountDTO } from "@dtos/sale/TotalAmountDTO";
import { HttpException } from "@nestjs/common";
import { Sale } from "@prisma/client";
import { TransactionType } from "src/dataDefault/transactionType";

class TotalAmountUseCase {
    constructor(
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository,
    ) {}

    async execute({ retailerId, affiliateId }: TotalAmountDTO) {
        this.validateRetailerExists(retailerId);

        let sales = 0;

        if (affiliateId) {
            this.validateAffiliate(affiliateId, retailerId);
            const salesList = await this.saleRepository.findByRetailerIdAndAffiliateId({ retailerId, affiliateId });
            sales = this.calculateTotalSales(salesList);
        } else {
            const salesList = await this.saleRepository.findbyRetailerId(retailerId);
            sales = this.calculateTotalSales(salesList);
        }

        return sales;
    }

    private async validateRetailerExists(retailerId: string) {
        try {
            await this.retailerRepository.findById(retailerId);
        } catch (err) {
            throw new HttpException('Varejista não existe', 404);
        }
    }

    private async validateAffiliate(affiliateId: string, retailerId: string) {
        try {
            const affiliateExists = await this.affiliateRepository.findById(affiliateId);

            if (affiliateExists.retailerId !== retailerId) {
                throw new HttpException('Afiliado não pertence a este varejista', 404);
            }
        } catch (err) {
            throw new HttpException('Afiliado não existe', 404);
        }
    }

    private calculateTotalSales(salesList: Sale[]) {
        return salesList.reduce((acc, sale) => {
            const saleValue = Number(sale.price);
            return TransactionType(sale.transactionType).sign === '-' ? acc - saleValue : acc + saleValue;
        }, 0);
    }
}

export { TotalAmountUseCase };