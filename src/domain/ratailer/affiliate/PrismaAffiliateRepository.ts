import { Injectable } from "@nestjs/common";
import { AffiliateRepository } from "./AffiliateRepository";
import { CreateAffiliateDTO } from "@dtos/affiliate/CreateAffiliateDTO";
import { Affiliate } from "@prisma/client";
import { PrismaService } from "@infra/database/prisma.service";
import { v4 as uuidV4 } from 'uuid';

@Injectable()
class PrismaAffiliateRepository implements AffiliateRepository {

    constructor(private prisma: PrismaService) {}

    async create({ name, retailerId }: CreateAffiliateDTO): Promise<Affiliate> {
        const affiliate = await this.prisma.affiliate.create({
            data: {
                id: uuidV4(),
                name,
                retailerId
            }
        });

        return affiliate;
    }

    async findByName(name: string): Promise<Affiliate> {
        const affiliate = await this.prisma.affiliate.findFirst({
            where: {
                name
            }
        });

        return affiliate;
    }

    async listAll(): Promise<Affiliate[]> {
        const affiliates = await this.prisma.affiliate.findMany();
        return affiliates;
    }

    async findById(id: string): Promise<Affiliate> {
        const affiliate = await this.prisma.affiliate.findFirst({
            where: {
                id
            }
        });
        return affiliate;
    }

    async findByRetailerId(retailerId: string): Promise<Affiliate[]> {
        const affiliates = await this.prisma.affiliate.findMany({
            where: {
                retailerId
            }
        });
        return affiliates;
    }
}

export { PrismaAffiliateRepository }