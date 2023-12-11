import { AffiliateRepository } from '@domain/ratailer/affiliate/AffiliateRepository';
import { RetailerRepository } from '@domain/ratailer/RetailerRepository'; 
import { CreateAffiliateDTO } from '@dtos/affiliate/CreateAffiliateDTO'; 
import { Body, Controller, Get, Post, Query } from '@nestjs/common'; 
import { CreateAffiliateUseCase } from '@usecases/retailer/affiliate/createAffiliate/CreateAffiliateUseCase';
import { ListAllAffiliates } from '@usecases/retailer/affiliate/listAllAffiliates/ListAllAffiliates';

@Controller("afiliado")
export class AffiateController {

    constructor(
        private afiliateRepository: AffiliateRepository,
        private retailerRepository: RetailerRepository
    ) { }

    @Post("/")
    async createAffiliateController(@Body() body: CreateAffiliateDTO) {
        const { name, retailerId } = body;
        const createAffiliateUseCase = new CreateAffiliateUseCase(this.afiliateRepository, this.retailerRepository);
        const retailerCreated = await createAffiliateUseCase.execute({
            name, retailerId
        });

        return retailerCreated;
    }

    @Get("/")
    async findRetailerController(@Query() body: CreateAffiliateDTO) {
        const { name, retailerId } = body;
        const createAffiliateUseCase = new CreateAffiliateUseCase(this.afiliateRepository, this.retailerRepository);
        const retailerCreated = await createAffiliateUseCase.execute({
            name, retailerId
        });

        return retailerCreated;
    }

    @Get("/listar")
    async listAllAffiliatesController() {
        const createAffiliateUseCase = new ListAllAffiliates(this.afiliateRepository);
        const affiliates = await createAffiliateUseCase.execute();

        return affiliates;
    }
}
