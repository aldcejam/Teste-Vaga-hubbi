import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { FindRetailerDTO } from "@dtos/retailer/FindRetailerDTO";
import { HttpException } from "@nestjs/common";
import { Retailer } from "@prisma/client";

class FindAllRetailerUseCase {
    constructor(
        private retailerRepository: RetailerRepository
    ) {}
    
    async execute({id}:FindRetailerDTO): Promise<Retailer[] | Retailer> {

        if(id) {
            try{
                const retailer = await this.retailerRepository.findById(id);
                return retailer;
            }
            catch(err){
                throw new HttpException("varejista não existe", 404);
            }
        }

        const retailers = await this.retailerRepository.listAll();
        return retailers;
    }
}

export { FindAllRetailerUseCase }