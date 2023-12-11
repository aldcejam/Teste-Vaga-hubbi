import { RetailerRepository } from "@domain/ratailer/RetailerRepository";
import { CreateRatailerDTO } from "@dtos/retailer/CreateRetailerDTO";  
import { ConflictException } from "@nestjs/common";
import { Retailer } from "@prisma/client";

class CreateRatailerUseCase {

  constructor(private retailerRepository: RetailerRepository) {}

  async execute({ name }: CreateRatailerDTO): Promise<Retailer> {  

    const retailerAlreadyExists = await this.retailerRepository.findByName(name); 
       
    if(retailerAlreadyExists) {
      throw new ConflictException("Já existe um varejista com esse nome.");
    }

    const retailer = await this.retailerRepository.create({name});
    return retailer;
  }
}

export { CreateRatailerUseCase };