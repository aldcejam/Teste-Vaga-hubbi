import { CreateSaleDTO } from "@dtos/sale/CreateSaleDTO";
import { FindByRetailerIdAndAffiliateIdDTO } from "@dtos/sale/FindByRetailerIdAndAffiliateIdDTO";
import { FindByDateRetailerIdAndAffiliateIdDTO } from "@dtos/sale/FindByDateRetailerIdAndAffiliateIdDTO";
import { Sale } from "@prisma/client";

abstract class SaleRepository{
    abstract create({}: CreateSaleDTO): Promise<Sale>
    abstract findById(id: string): Promise<Sale>
    abstract findbyRetailerId(id: string): Promise<Sale[]>
    abstract findbyAffiliateId(id: string): Promise<Sale[]>
    abstract findByRetailerIdAndAffiliateId({affiliateId,retailerId}: FindByRetailerIdAndAffiliateIdDTO): Promise<Sale[]>
    abstract findByDateAndRetailerIdAndAffiliateId({affiliateId,retailerId,date}: FindByDateRetailerIdAndAffiliateIdDTO): Promise<Sale>
}

export { SaleRepository }