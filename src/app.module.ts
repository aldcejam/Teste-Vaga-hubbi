import { Module } from '@nestjs/common';
import { RetailerController } from './infra/http/RetailerController'; 
import { PrismaService } from './infra/database/prisma.service';
import { CreateRatailerUseCase } from './useCases/retailer/createRetailer/CreateRatailerUseCase'; 
import { RetailerRepository } from './domain/ratailer/RetailerRepository';
import { PrismaRetailerRepository } from './domain/ratailer/PrismaRetailerRepository';
import ProductRepository from '@domain/ratailer/product/ProductRepository';
import { PrismaProductRepository } from '@domain/ratailer/product/PrismaProductRepository';
import { ProductController } from '@infra/http/ProductController';

@Module({
  imports: [],
  controllers: [RetailerController,ProductController],
  providers: [PrismaService,
    {
      provide: RetailerRepository,
      useClass: PrismaRetailerRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    }
  ],
})
export class AppModule {}
