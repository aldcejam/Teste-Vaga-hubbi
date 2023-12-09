import { CreateRatailerUseCase } from './CreateRatailerUseCase'
import { InMemoryRatailerRepository } from '@domain/ratailer/InMemoryRatailerRepository'

let createRetailerUseCase: CreateRatailerUseCase
let inMemoryRatailerRepository: InMemoryRatailerRepository

describe('Create Retailer', () => {

    beforeEach(() => {
        inMemoryRatailerRepository = new InMemoryRatailerRepository()
        createRetailerUseCase = new CreateRatailerUseCase(inMemoryRatailerRepository)
    })

    let retailer = {
        name: 'Teste'
    }
    it('should be able to create a new retailer', async () => {

        const retailerCreated = await createRetailerUseCase.execute(retailer)
        expect(retailerCreated).toHaveProperty('id')
    })

    it('should not be able to create a new retailer with same name', async () => { 
        expect(async () => {
            await createRetailerUseCase.execute(retailer) 
            await createRetailerUseCase.execute(retailer) 
        }
        ).rejects.toThrow("Já existe um varejista com esse nome.")
        
    })
});