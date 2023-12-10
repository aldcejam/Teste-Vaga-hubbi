import { InMemoryAffiliateRepository } from "@domain/ratailer/affiliate/InMemoryAffiliateRepository"
import { CreateAffiliateUseCase } from "./CreateAffiliateUseCase"
import { InMemoryRatailerRepository } from "@domain/ratailer/InMemoryRatailerRepository"

let inMemoryAffiliateRepository: InMemoryAffiliateRepository
let inMemoryRetailerRepository: InMemoryRatailerRepository
let createAffiliateUseCase: CreateAffiliateUseCase

describe('Create Affiliate', () => {

    beforeEach(() => {
        inMemoryAffiliateRepository = new InMemoryAffiliateRepository()
        inMemoryRetailerRepository = new InMemoryRatailerRepository()
        createAffiliateUseCase = new CreateAffiliateUseCase(inMemoryAffiliateRepository,inMemoryRetailerRepository)
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

    it('should not be able to create a new affiliate with invalid retailerId', async () => {
        await inMemoryRetailerRepository.create({
            name: 'RetailerName',
        })
        
        expect(async () => {
            await createAffiliateUseCase.execute({
                name: 'Affiliate Name',
                retailerId: 'invalidId'
            })
        }).rejects.toThrow("Id de Varejista está inválido")
    })

    it('should not be able to create a new affiliate if affiliate name already exists', async () => {
        const retailerCreated = await inMemoryRetailerRepository.create({
            name: 'RetailerName',
        })
        
        await createAffiliateUseCase.execute({
            name: 'Affiliate Name',
            retailerId: retailerCreated.id
        })

        expect(async () => {
            await createAffiliateUseCase.execute({
                name: 'Affiliate Name',
                retailerId: retailerCreated.id
            })
        }).rejects.toThrow("Afiliado já existe")
    })
})