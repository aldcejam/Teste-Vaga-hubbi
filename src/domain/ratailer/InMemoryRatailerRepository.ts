import { Retailer } from "@prisma/client";
import { RetailerRepository } from "./RetailerRepository";
import { v4 as uuidV4 } from "uuid";
import { CreateRatailerDTO } from "@dtos/retailer/CreateRetailerDTO";

class InMemoryRatailerRepository implements RetailerRepository {

    private retailers: Retailer[];

    constructor() {
        this.retailers = [];
    }

    async create({name}:CreateRatailerDTO): Promise<Retailer> {
        const retailer = {
            id: uuidV4(),
            name
        };
        this.retailers.push(retailer);
        return retailer;
    }

    async findByName(name: string): Promise<Retailer> {
        const retailer = this.retailers.find(retailer => retailer.name === name);
        return retailer;
    }

    async listAll(): Promise<Retailer[]> {
        return this.retailers;
    }

}

export { InMemoryRatailerRepository };