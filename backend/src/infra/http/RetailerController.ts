import { Body, Controller, Get, Post } from '@nestjs/common'; 
import { CreateRatailerDTO } from '@dtos/retailer/CreateRetailerDTO';  
import { RetailerRepository } from '@domain/ratailer/RetailerRepository';
import { CreateRatailerUseCase } from '@usecases/retailer/createRetailer/CreateRatailerUseCase';
import { FindRetailerDTO } from '@dtos/retailer/FindRetailerDTO';
import { FindAllRetailerUseCase } from '@usecases/retailer/findRetailer/FindRetailerUseCase';

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

  @Get("/")
  async findRetailerController(@Body() body) { 
    const findRetailerUseCase = new FindAllRetailerUseCase(this.retailerRepository);
    const retailers = await findRetailerUseCase.execute();
 
    return retailers;
  }
}
