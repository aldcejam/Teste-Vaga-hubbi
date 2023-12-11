import { Module } from '@nestjs/common';
import { RetailerController } from './infra/http/RetailerController'; 
import { PrismaService } from './infra/database/prisma.service';
import { RetailerRepository } from './domain/ratailer/RetailerRepository';
import { PrismaRetailerRepository } from './domain/ratailer/PrismaRetailerRepository';
import ProductRepository from '@domain/ratailer/product/ProductRepository';
import { PrismaProductRepository } from '@domain/ratailer/product/PrismaProductRepository';
import { ProductController } from '@infra/http/ProductController';
import { AffiliateRepository } from '@domain/ratailer/affiliate/AffiliateRepository';
import { PrismaAffiliateRepository } from '@domain/ratailer/affiliate/PrismaAffiliateRepository';
import { AffiateController } from '@infra/http/AffiliateController';
import { SaleController } from '@infra/http/SaleController';
import { SaleRepository } from '@domain/ratailer/sale/SaleRepository';
import { PrismaSaleRepository } from '@domain/ratailer/sale/PrismaSaleRepository';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController,RetailerController,ProductController,AffiateController,SaleController],
  providers: [PrismaService,
    {
      provide: RetailerRepository,
      useClass: PrismaRetailerRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: AffiliateRepository,
      useClass: PrismaAffiliateRepository
    },
    {
      provide: SaleRepository,
      useClass: PrismaSaleRepository
    }
  ],
})
export class AppModule {}