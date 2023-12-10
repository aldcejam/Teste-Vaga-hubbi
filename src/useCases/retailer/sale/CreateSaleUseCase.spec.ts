import { InMemoryRatailerRepository } from '@domain/ratailer/InMemoryRatailerRepository';
import { InMemorySaleRepository } from "@domain/ratailer/sale/InMemorySaleRepository"
import { CreateSaleUseCase } from "./CreateSaleUseCase"
import { InMemoryAffiliateRepository } from '@domain/ratailer/affiliate/InMemoryAffiliateRepository';

let inMemoryRatailerRepository: InMemoryRatailerRepository
let inMemoryAffiliateRepository: InMemoryAffiliateRepository
let inMememorySaleRepository: InMemorySaleRepository
let createSaleUseCase: CreateSaleUseCase


describe('Create Sale', () => { 
    beforeEach(() => {
        inMemoryRatailerRepository = new InMemoryRatailerRepository()
        inMemoryAffiliateRepository = new InMemoryAffiliateRepository()
        inMememorySaleRepository = new InMemorySaleRepository()
        createSaleUseCase = new CreateSaleUseCase(inMememorySaleRepository,inMemoryRatailerRepository ,inMemoryAffiliateRepository, )
    })

    it('should be able to create a new sale', async () => {
        const retailerCreated = await inMemoryRatailerRepository.create({name: 'Retailer Test'})
        const affiliateCreated = await inMemoryAffiliateRepository.create({name: 'Affiliate Test', retailerId: retailerCreated.id})

        const sale = await createSaleUseCase.execute({
            affiliateId: affiliateCreated.id,
            retailerId: retailerCreated.id,
            date: new Date(),
            price: 100,
            product: 'Product Test',
            seller: 'Seller Test',
            transactionType: 1
        })

        expect(sale).toHaveProperty('id')
    })

    it('should be able to create a new sale without affiliate', async () => {
        const retailerCreated = await inMemoryRatailerRepository.create({name: 'Retailer Test'})
        
        const sale = await createSaleUseCase.execute({
            retailerId: retailerCreated.id,
            date: new Date(),
            price: 100,
            product: 'Product Test',
            seller: 'Seller Test',
            transactionType: 1,
        })

        expect(sale).toHaveProperty('id')
    })

    it('should not be able to create a new sale if sale already exists', async () => {
        const retailerCreated = await inMemoryRatailerRepository.create({name: 'Retailer Test'})
        const affiliateCreated = await inMemoryAffiliateRepository.create({name: 'Affiliate Test', retailerId: retailerCreated.id})

        let saleWithSameData = {
            affiliateId: affiliateCreated.id,
            retailerId: retailerCreated.id,
            date: new Date(), 
        }
        
        expect(async () => {
            await createSaleUseCase.execute({
                ...saleWithSameData,
                price: 100,
                product: 'Product Test',
                seller: 'Seller Test',
                transactionType: 1
            })
            await createSaleUseCase.execute({
                ...saleWithSameData,
                price: 100,
                product: 'Product Test',
                seller: 'Seller Test',
                transactionType: 1
        })}).rejects.toThrow("Venda já cadastrada")
    })
})