import { Body, Controller, Post } from '@nestjs/common'; 
import { CreateRatailerDTO } from '@dtos/retailer/CreateRetailerDTO';  
import { RetailerRepository } from '@domain/ratailer/RetailerRepository';
import { CreateRatailerUseCase } from '@usecases/retailer/createRetailer/CreateRatailerUseCase';

@Controller("retailer")
export class RetailerController { 

  constructor(
    
    private retailerRepository: RetailerRepository
  ) {}

  @Post("/")
  async createRetailerController(@Body() body: CreateRatailerDTO) {
    const { name } = body;  
    const createRatailerUseCase = new CreateRatailerUseCase(this.retailerRepository);
    const retailerCreated = await createRatailerUseCase.execute({ name });
 
    return retailerCreated;
  }
}
