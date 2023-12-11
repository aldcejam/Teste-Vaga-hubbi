import { AffiliateRepository } from '@domain/affiliate/AffiliateRepository';
import { RetailerRepository } from '@domain/ratailer/RetailerRepository'; 
import { CreateAffiliateDTO } from '@dtos/affiliate/CreateAffiliateDTO'; 
import { FindAffiliateByRetailerDTO } from '@dtos/affiliate/FindAffiliateByRetailerDTO';
import { Body, Controller, Get, Post, Query } from '@nestjs/common'; 
import { CreateAffiliateUseCase } from '@usecases/affiliate/createAffiliate/CreateAffiliateUseCase';
import { FindAffiliateByRetailerUseCase } from '@usecases/affiliate/findAffiliateByRetailer/FindAffiliateByRetailerUseCase';
import { ListAllAffiliates } from '@usecases/affiliate/listAllAffiliates/ListAllAffiliates';

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
    async findAffiliateController(@Query() body: FindAffiliateByRetailerDTO) {
        const { retailerId } = body;
        const listAffiliate = new FindAffiliateByRetailerUseCase(this.afiliateRepository);
        const retailerCreated = await listAffiliate.execute({
             retailerId
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
