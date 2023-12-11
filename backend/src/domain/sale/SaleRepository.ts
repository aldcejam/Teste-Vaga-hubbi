import { CreateSaleDTO } from "@dtos/sale/CreateSaleDTO"; 
import { Sale } from "@prisma/client";

export abstract class FindByDateRetailerIdAndAffiliateIdRequest  {
    date: Date;
    retailerId: string;
    affiliateId: string;
    transactionType: number;
}

abstract class SaleRepository{
    abstract create({}: CreateSaleDTO): Promise<Sale>
    abstract findById(id: string): Promise<Sale>
    abstract findbyRetailerId(id: string): Promise<Sale[]>
    abstract findbyAffiliateId(id: string): Promise<Sale[]>
    abstract findByRetailerIdAndAffiliateId({affiliateId,retailerId}: {affiliateId:string,retailerId:string}): Promise<Sale[]>
    abstract findByDateAndRetailerIdAndAffiliateIdByTransactionType({affiliateId,retailerId,date}: FindByDateRetailerIdAndAffiliateIdRequest): Promise<Sale>
}

export { SaleRepository }