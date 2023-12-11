import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { FindRetailerDTO } from "@dtos/retailer/FindRetailerDTO";
import { HttpException } from "@nestjs/common";
import { Retailer } from "@prisma/client";

class FindAllRetailerUseCase {
    constructor(
        private retailerRepository: RetailerRepository
    ) {}
    
    async execute(): Promise<Retailer[] | Retailer> {

        try{
            const retailers = await this.retailerRepository.listAll();
            return retailers;
        }
        catch(err) {
            throw new HttpException("não há varejista", 400);
        }
    }
}

export { FindAllRetailerUseCase }