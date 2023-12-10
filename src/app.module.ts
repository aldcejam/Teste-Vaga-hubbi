import { Module } from '@nestjs/common';
import { RetailerController } from './infra/http/RetailerController'; 
import { PrismaService } from './infra/database/prisma.service';
import { CreateRatailerUseCase } from './useCases/retailer/createRetailer/CreateRatailerUseCase'; 
import { RetailerRepository } from './domain/ratailer/RetailerRepository';
import { PrismaRetailerRepository } from './domain/ratailer/PrismaRetailerRepository';

@Module({
  imports: [],
  controllers: [RetailerController],
  providers: [PrismaService,
    {
      provide: RetailerRepository,
      useClass: PrismaRetailerRepository,
    },
  ],
})
export class AppModule {}
