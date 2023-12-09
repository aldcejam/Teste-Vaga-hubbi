// app.controller.ts

import { Body, Controller, Post } from '@nestjs/common'; 
import { CreateRatailerDTO } from '@/dtos/retailer/CreateRetailerDTO';  
import { RetailerRepository } from '@/domain/ratailer/RetailerRepository';
import { CreateRatailerUseCase } from '@/useCases/retailer/createRetailer/CreateRatailerUseCase';

@Controller()
export class RetailerController { 

  constructor(private retailerRepository: RetailerRepository) {}

  @Post("/")
  async createRetailerController(@Body() body: CreateRatailerDTO) {
    const { name } = body;  
    const createRatailerUseCase = new CreateRatailerUseCase(await this.retailerRepository);
    const retailerCreated = await createRatailerUseCase.execute({ name });
 
    return retailerCreated;
  }
}
