import { Module } from '@nestjs/common';
import { RetailerController } from './infra/http/RetailerController'; 
import { PrismaService } from './infra/database/prisma.service';
import { RetailerRepository } from './domain/ratailer/RetailerRepository';
import { PrismaRetailerRepository } from './domain/ratailer/PrismaRetailerRepository'; 
import { AffiliateRepository } from '@domain/affiliate/AffiliateRepository';
import { PrismaAffiliateRepository } from '@domain/affiliate/PrismaAffiliateRepository';
import { AffiateController } from '@infra/http/AffiliateController';
import { SaleController } from '@infra/http/SaleController';
import { SaleRepository } from '@domain/sale/SaleRepository';
import { PrismaSaleRepository } from '@domain/sale/PrismaSaleRepository';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController,RetailerController,AffiateController,SaleController],
  providers: [PrismaService,
    {
      provide: RetailerRepository,
      useClass: PrismaRetailerRepository,
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
