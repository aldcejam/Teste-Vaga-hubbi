import { Injectable } from "@nestjs/common";
import ProductRepository from "./ProductRepository";
import { PrismaService } from "@infra/database/prisma.service";
import { v4 as uuidV4 } from 'uuid';

@Injectable()
class PrismaProductRepository implements ProductRepository{
    constructor(private prisma: PrismaService) { }

    async create({name,affiliatePercent,retailerId,affiliateId}): Promise<any> {
        const product = await this.prisma.product.create({
            data: {
                id: uuidV4(),
                name,
                affiliatePercent,
                retailerId,
                affiliateId, 
            }
        });
        return product;
    }
    async findByName(name: string): Promise<any> {
        const product = await this.prisma.product.findFirst({
            where: {
                name
            }
        });
        return product;
    }
    async listAll(): Promise<any[]> {
        const products = await this.prisma.product.findMany();
        return products;
    }

}


export { PrismaProductRepository };