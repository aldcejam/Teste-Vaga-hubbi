import { Retailer } from "@prisma/client";

abstract class RetailerRepository {
    abstract create(name:string): Promise<Retailer>;
    abstract findByName(name:string): Promise<Retailer | null>;
}

export { RetailerRepository }