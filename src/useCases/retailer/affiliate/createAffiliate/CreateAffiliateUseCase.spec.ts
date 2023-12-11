import { InMemoryAffiliateRepository } from "@domain/ratailer/affiliate/InMemoryAffiliateRepository"
import { CreateAffiliateUseCase } from "./CreateAffiliateUseCase"
import { InMemoryRatailerRepository } from "@domain/ratailer/InMemoryRatailerRepository"
import { HttpException } from "@nestjs/common"

let inMemoryAffiliateRepository: InMemoryAffiliateRepository
let inMemoryRetailerRepository: InMemoryRatailerRepository
let createAffiliateUseCase: CreateAffiliateUseCase

describe('Create Affiliate', () => {

    beforeEach(() => {
        inMemoryAffiliateRepository = new InMemoryAffiliateRepository()
        inMemoryRetailerRepository = new InMemoryRatailerRepository()
        createAffiliateUseCase = new CreateAffiliateUseCase(inMemoryAffiliateRepository, inMemoryRetailerRepository)
    })

    it('should be able to create a new affiliate', async () => {
        const retailerCreated = await inMemoryRetailerRepository.create({
            name: 'RetailerName',
        })

        const affiliateCreated = await createAffiliateUseCase.execute({
            name: 'Affiliate Name',
            retailerId: retailerCreated.id
        })

        expect(affiliateCreated).toHaveProperty('id')
    })

    it("should not be create a affiliate if already exist affiliate with same name", async () => {
        const retailerCreated = await inMemoryRetailerRepository.create({
            name: 'RetailerName',
        })

        await createAffiliateUseCase.execute({
            name: 'Affiliate Name',
            retailerId: retailerCreated.id
        })

        try {
            await createAffiliateUseCase.execute({
                name: 'Affiliate Name',
                retailerId: retailerCreated.id
            });
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException)
            expect(error.message).toBe('Afiliado já existe')
        }

    })
    it("should not be create a affiliate if retailer not exist", async () => {
        const retailerCreated = await inMemoryRetailerRepository.create({
            name: 'RetailerName',
        })
        try {
            await createAffiliateUseCase.execute({
                name: 'Affiliate Name',
                retailerId: 'retailerId'
            });
        } catch (error) {
            expect(error.message).toBe('Varejista não existe')
        }
    })

})