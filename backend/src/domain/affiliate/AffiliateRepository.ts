import { CreateAffiliateDTO } from "@dtos/affiliate/CreateAffiliateDTO";
import { Affiliate } from "@prisma/client";

abstract class AffiliateRepository {

    abstract create({name}: CreateAffiliateDTO): Promise<Affiliate> 
    abstract findByName(name: string): Promise<Affiliate>
    abstract findById(id: string): Promise<Affiliate>
    abstract findByRetailerId(retailerId: string): Promise<Affiliate[]>
    abstract listAll(): Promise<Affiliate[]>
}

export { AffiliateRepository };