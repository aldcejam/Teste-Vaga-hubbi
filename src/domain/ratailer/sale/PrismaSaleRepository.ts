import { CreateSaleDTO } from "@dtos/sale/CreateSaleDTO";
import { SaleRepository } from "./SaleRepository";
import { PrismaService } from "@infra/database/prisma.service";
import { v4 as uuidV4 } from 'uuid';
import { Sale } from "@prisma/client";
import { FindByRetailerIdAndAffiliateIdDTO } from "@dtos/sale/FindByRetailerIdAndAffiliateIdDTO";
import { FindByDateRetailerIdAndAffiliateIdDTO } from "@dtos/sale/FindByDateRetailerIdAndAffiliateIdDTO";
import { Injectable } from "@nestjs/common";

@Injectable()
class PrismaSaleRepository implements SaleRepository { 
    constructor(private prisma: PrismaService){}

    async create({date,price,product,retailerId,seller, transactionType,affiliateId}: CreateSaleDTO): Promise<any> {
        return await this.prisma.sale.create({data:{
            id: uuidV4(), 
            date,
            price,
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
    async findByDateAndRetailerIdAndAffiliateId({ affiliateId, retailerId, date }: FindByDateRetailerIdAndAffiliateIdDTO): Promise<Sale[]> {
        return await this.prisma.sale.findMany({where:{retailerId,affiliateId,date}})
    }
    async findbyAffiliateId(id: string): Promise<Sale[]> {
        return await this.prisma.sale.findMany({where:{affiliateId:id}})
    }
    async findbyRetailerId(id: string): Promise<Sale[]> {
        return await this.prisma.sale.findMany({where:{retailerId:id}})
    }

}

export { PrismaSaleRepository }