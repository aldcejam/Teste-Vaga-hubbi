import { RetailerRepository } from "@/domain/ratailer/RetailerRepository";
import { CreateRatailerDTO } from "@/dtos/retailer/CreateRetailerDTO";  

class CreateRatailerUseCase {

  constructor(private retailerRepository: RetailerRepository) {}

  async execute({ name }: CreateRatailerDTO): Promise<void> {  
    await this.retailerRepository.create(name);
  }
}

export { CreateRatailerUseCase };