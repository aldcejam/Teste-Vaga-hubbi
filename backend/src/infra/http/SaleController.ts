import { SaleRepository } from '@domain/ratailer/sale/SaleRepository';
import { RetailerRepository } from '@domain/ratailer/RetailerRepository';
import { AffiliateRepository } from '@domain/ratailer/affiliate/AffiliateRepository';
import { CreateSaleDTO } from '@dtos/sale/CreateSaleDTO';
import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateSaleUseCase } from '@usecases/retailer/sale/createSale/CreateSaleUseCase';
import { FindAffiliateByRetailerUseCase } from '@usecases/retailer/affiliate/findAffiliateByRetailer/FindAffiliateByRetailerUseCase';
import { FindAffiliateByRetailerDTO } from '@dtos/affiliate/FindAffiliateByRetailerDTO';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { ImportSalesDTO } from '@dtos/sale/ImportSalesDTO';
import { ImportSalesUseCase } from '@usecases/retailer/sale/importSales/ImportSalesUseCase';
import { TotalAmountUseCase } from '@usecases/retailer/sale/totalAmount/TotalAmount';
import { TotalAmountDTO } from '@dtos/sale/TotalAmountDTO';

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
    async findSaleController(@Query() { retailerId }: FindAffiliateByRetailerDTO) {
        const findAffiliateByRetailerUseCase = new FindAffiliateByRetailerUseCase(this.affiliateRepository);
        const affiliate = await findAffiliateByRetailerUseCase.execute(retailerId);
        return affiliate;
    } 

    @Post('/import')
    @UseInterceptors(FileInterceptor('sales'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query() { retailerId, affiliateId }: ImportSalesDTO
    ) { 
        const fileContent = file.buffer.toString('utf8').split('\n'); 
        const removeEmptyLines = fileContent.filter((line) => line !== ''); 
        
        const importSalesUseCase = new ImportSalesUseCase(this.saleRepository, this.retailerRepository, this.affiliateRepository);
        const salesimported = await importSalesUseCase.execute({ file: removeEmptyLines, retailerId, affiliateId });

        return salesimported;

    } 

    @Get('/totalAmount')
    async totalAmountController(@Query() { retailerId, affiliateId }: TotalAmountDTO) {
        const totalAmountUseCase = new TotalAmountUseCase(this.saleRepository, this.retailerRepository, this.affiliateRepository);
        const totalAmount = await totalAmountUseCase.execute({ retailerId, affiliateId });
        return totalAmount;
    }
}
