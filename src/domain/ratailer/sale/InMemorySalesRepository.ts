import { Sale } from "@prisma/client";
import { SaleRepository } from "./SaleRepository";
import { CreateSaleDTO } from "@dtos/sale/CreateSaleDTO";
import { v4 as uuidV4 } from "uuid";
import { FindByRetailerIdAndAffiliateIdDTO } from "@dtos/sale/FindByRetailerIdAndAffiliateIdDTO";
import { FindByDateRetailerIdAndAffiliateIdDTO } from "@dtos/sale/FindByDateRetailerIdAndAffiliateIdDTO";

class InMemorySaleRepository implements SaleRepository {
    private sales: Sale[];

    constructor() {
        this.sales = []
    }

    async create({ date,affiliateId,retailerId, price,product,seller,transactionType }: CreateSaleDTO): Promise<Sale> {
        const sale: Sale = {
            id: uuidV4(),
            date,
            affiliateId,
            retailerId,
            price,
            product,
            seller,
            transactionType
        }

        this.sales.push(sale)

        return sale
    }

    async findById(id: string): Promise<Sale> {
        return this.sales.find(sale => sale.id === id)
    }
    async findbyRetailerId(id: string): Promise<Sale[]> {
        return this.sales.filter(sale => sale.retailerId === id)  
    }
    async findbyAffiliateId(id: string): Promise<Sale[]> {
        return this.sales.filter(sale => sale.affiliateId === id)  
    }
    async findByRetailerIdAndAffiliateId({affiliateId,retailerId}: FindByRetailerIdAndAffiliateIdDTO): Promise<Sale[]> {
        return this.sales.filter(sale => sale.affiliateId === affiliateId && sale.retailerId === retailerId)  
    }
    async findByDateAndRetailerIdAndAffiliateId({affiliateId,retailerId,date}: FindByDateRetailerIdAndAffiliateIdDTO): Promise<Sale[]> {
        return this.sales.filter(sale => sale.affiliateId === affiliateId && sale.retailerId === retailerId && sale.date === date)  
    }

}

export { InMemorySaleRepository }