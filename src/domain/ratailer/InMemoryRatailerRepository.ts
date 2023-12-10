import { Retailer } from "@prisma/client";
import { RetailerRepository } from "./RetailerRepository";
import { v4 as uuidV4 } from "uuid";

class InMemoryRatailerRepository implements RetailerRepository {

    private retailers: Retailer[];

    constructor() {
        this.retailers = [];
    }

    async create(name: string): Promise<Retailer> {
        const retailer = {
            id: uuidV4(),
            name
        };
        this.retailers.push(retailer);
        return retailer;
    }

    async findByName(name) {
        return this.retailers.find(retailer => retailer.name === name);
    }

}

export { InMemoryRatailerRepository };