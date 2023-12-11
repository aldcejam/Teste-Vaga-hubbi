import { CreateSaleDTO } from "@dtos/sale/CreateSaleDTO";
import { FindByDateRetailerIdAndAffiliateIdRequest, SaleRepository } from "./SaleRepository";
import { PrismaService } from "@infra/database/prisma.service";
import { v4 as uuidV4 } from 'uuid';
import { Sale } from "@prisma/client";
import { FindByRetailerIdAndAffiliateIdDTO } from "@dtos/sale/FindByRetailerIdAndAffiliateIdDTO";
import { FormatStructureCurrency } from "src/utils/FormatStructureCurrency";
import { Injectable } from "@nestjs/common";

@Injectable()
class PrismaSaleRepository implements SaleRepository { 
    constructor(private prisma: PrismaService){}

    async create({date,price,product,retailerId,seller, transactionType,affiliateId}: CreateSaleDTO): Promise<any> {
        const princeFormatted = FormatStructureCurrency(price);
        
        return await this.prisma.sale.create({data:{
            id: uuidV4(), 
            date,
            price: princeFormatted,
            product,
            retailerId,
            seller,
            transactionType,
            affiliateId,
        }});
    }

    async findById(id: string): Promise<Sale> {
        return await this.prisma.sale.findUnique({where:{id}})
    }
    async findByRetailerIdAndAffiliateId({ affiliateId, retailerId }: FindByRetailerIdAndAffiliateIdDTO): Promise<Sale[]> {
        return await this.prisma.sale.findMany({where:{retailerId,affiliateId}})
    }
    async findByRetailerId(retailerId: string): Promise<Sale[]> {
        return await this.prisma.sale.findMany({where:{retailerId}})
    } 
    async findbyAffiliateId(id: string): Promise<Sale[]> {
        return await this.prisma.sale.findMany({where:{affiliateId:id}})
    }
    async findbyRetailerId(id: string): Promise<Sale[]> {
        return await this.prisma.sale.findMany({where:{retailerId:id}})
    }
    async findByDateAndRetailerIdAndAffiliateIdByTransactionType({ affiliateId, retailerId, date,transactionType }: FindByDateRetailerIdAndAffiliateIdRequest): Promise<Sale> {
        return await this.prisma.sale.findFirst({where:{retailerId,affiliateId,date,transactionType}})
    }

}

export { PrismaSaleRepository }