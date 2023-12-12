import { SaleRepository } from '@domain/sale/SaleRepository';
import { RetailerRepository } from '@domain/ratailer/RetailerRepository';
import { AffiliateRepository } from '@domain/affiliate/AffiliateRepository';
import { CreateSaleDTO } from '@dtos/sale/CreateSaleDTO';
import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateSaleUseCase } from '@usecases/sale/createSale/CreateSaleUseCase';
import { FindAffiliateByRetailerUseCase } from '@usecases/affiliate/findAffiliateByRetailer/FindAffiliateByRetailerUseCase';
import { FindAffiliateByRetailerDTO } from '@dtos/affiliate/FindAffiliateByRetailerDTO';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { ImportSalesDTO } from '@dtos/sale/ImportSalesDTO';
import { ImportSalesUseCase } from '@usecases/sale/importSales/ImportSalesUseCase';
import { TotalAmountUseCase } from '@usecases/sale/totalAmount/TotalAmount';
import { TotalAmountDTO } from '@dtos/sale/TotalAmountDTO';
import { FindSalesUseCase } from '@usecases/sale/findSales/FindSalesUseCase';
import { FindSalesDTO } from '@dtos/sale/FindSalesDTO';

@Controller("vendas")
export class SaleController {

    constructor(
        private saleRepository: SaleRepository,
        private retailerRepository: RetailerRepository,
        private affiliateRepository: AffiliateRepository
    ) { }

    @Post("/")
    async createSaleController(@Body() body: CreateSaleDTO) {
        const { date, price, product, retailerId, seller, transactionType, affiliateId } = body;
        const createSaleUseCase = new CreateSaleUseCase(this.saleRepository, this.retailerRepository, this.affiliateRepository);

        const sale = await createSaleUseCase.execute({
            affiliateId,
            retailerId,
            date,
            price,
            product,
            seller,
            transactionType,
        });

        return sale;
    }
    @Get("/")
    async findSaleController(@Query() { retailerId,affiliateId }: FindSalesDTO) {
        const findSalesUseCase = new FindSalesUseCase(this.saleRepository);
        const affiliate = await findSalesUseCase.execute({
            retailerId,
            affiliateId
        });

        return affiliate;
    } 

    @Post('/import')
    @UseInterceptors(FileInterceptor('sales'))
    async uploadFile(
        @UploadedFile() sales : Express.Multer.File,
        @Query() { retailerId, affiliateId }: ImportSalesDTO
    ) { 
        console.log(sales);
    
        
        const importSalesUseCase = new ImportSalesUseCase(this.saleRepository, this.retailerRepository, this.affiliateRepository);
        const salesimported = await importSalesUseCase.execute({ sales, retailerId, affiliateId });

        return salesimported;

    } 

    @Get('/totalAmount')
    async totalAmountController(@Query() { retailerId, affiliateId }: TotalAmountDTO) {
        const totalAmountUseCase = new TotalAmountUseCase(this.saleRepository, this.retailerRepository, this.affiliateRepository);
        const totalAmount = await totalAmountUseCase.execute({ retailerId, affiliateId });
        return totalAmount;
    }
}
