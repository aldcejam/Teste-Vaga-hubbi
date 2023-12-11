import { InMemorySaleRepository } from '@domain/ratailer/sale/InMemorySaleRepository';
import ImportSalesUseCase from "./ImportSalesUseCase";
import { InMemoryRatailerRepository } from '@domain/ratailer/InMemoryRatailerRepository';
import { InMemoryAffiliateRepository } from '@domain/ratailer/affiliate/InMemoryAffiliateRepository';
import { salesLinesSimulate } from "./salesLinesSimulate"

let inMemorySaleRepository: InMemorySaleRepository;
let inMemoryRetailerRepository: InMemoryRatailerRepository;
let inMemoryAffiliateRepository: InMemoryAffiliateRepository
let importSalesUseCase: ImportSalesUseCase;

describe("ImportSalesUseCase", () => {

    beforeEach(() => {
        inMemorySaleRepository = new InMemorySaleRepository();
        inMemoryRetailerRepository = new InMemoryRatailerRepository();
        inMemoryAffiliateRepository = new InMemoryAffiliateRepository();
        importSalesUseCase = new ImportSalesUseCase(inMemorySaleRepository, inMemoryRetailerRepository, inMemoryAffiliateRepository);
    }); 

    it('should not be able to import sales with invalid retailer', async () => {
        await expect(importSalesUseCase.execute({file: salesLinesSimulate, retailerId: "invalid"})).rejects.toThrow("Varejista não existe");
    })

    it('shoud be able to import sales if affiliateId is valid', async () => {
        const retailerCreated = await inMemoryRetailerRepository.create({name: 'Retailer Test'})
        const retailerCreated2 = await inMemoryRetailerRepository.create({name: 'Retailer Test'})

        const affiliateCreated = await inMemoryAffiliateRepository.create({name: 'Affiliate Test', retailerId: retailerCreated2.id})
         
        expect(async () => {
            await importSalesUseCase.execute({
                retailerId: retailerCreated.id, 
                affiliateId: affiliateCreated.id,
                file: salesLinesSimulate
            })
        }).rejects.toThrow("Afiliado não pertence a este varejista")
    })
        
})