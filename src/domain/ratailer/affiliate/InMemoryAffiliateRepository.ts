import { Affiliate } from "@prisma/client";
import { AffiliateRepository } from "./AffiliateRepository";
import { CreateAffiliateDTO } from "@dtos/affiliate/CreateAffiliateDTO";
import { v4 as uuidV4 } from "uuid";

class InMemoryAffiliateRepository implements AffiliateRepository{
    private affiliates: Affiliate[];

    constructor(){
        this.affiliates = [];
    }

    async create({ name,retailerId }: CreateAffiliateDTO): Promise<Affiliate> {
        const affiliate = {
            id: uuidV4,
            name,
            retailerId
        };
        this.affiliates.push(affiliate);
        return affiliate;
    }

    async findById(id: string): Promise<Affiliate> {
        const affiliate = this.affiliates.find(affiliate => affiliate.id === id);
        return affiliate;
    }

    async findByName(name: string): Promise<Affiliate> {
        const affiliate = this.affiliates.find(affiliate => affiliate.name === name);
        return affiliate;
    }

    async findByRetailerId(retailerId: string): Promise<Affiliate[]> {
        const affiliates = this.affiliates.filter(affiliate => affiliate.retailerId === retailerId);
        return affiliates;
    }
    
}

export { InMemoryAffiliateRepository }