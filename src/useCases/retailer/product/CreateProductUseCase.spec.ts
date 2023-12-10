import InMemoryProductRepository from "@domain/ratailer/product/InMemoryProductRepository";
import CreateProductUseCase from "./CreateProductUseCase";
import { InMemoryRatailerRepository } from "@domain/ratailer/InMemoryRatailerRepository";

let inMemoryProductRepository: InMemoryProductRepository;
let InMemoryRetailerRepository: InMemoryRatailerRepository 
let createProductUseCase: CreateProductUseCase;

describe('Create Product', () => { 
    beforeEach(() => {
        inMemoryProductRepository = new InMemoryProductRepository();
        InMemoryRetailerRepository = new InMemoryRatailerRepository();
        createProductUseCase = new CreateProductUseCase(inMemoryProductRepository, InMemoryRetailerRepository);
    })

    let productToTest = {
        name: 'Product Test',
        affiliatePercent: 10,
        retailerId: '1',
        affiliateId: '1'
    }  

    it('should be able to create a new product', async () => {
        const retailerCreated =  await InMemoryRetailerRepository.create({name: productToTest.name});
        const productCreated = await createProductUseCase.execute({...productToTest, retailerId: retailerCreated.id});

        const product = await inMemoryProductRepository.findByName(productToTest.name);

        expect(productCreated).toBe(product);   
    })
 
    it('should not be able to create a new product with invalid retailerId', async () => {

        await InMemoryRetailerRepository.create({name: 'Retailer Test'});
        await InMemoryRetailerRepository.create({name: 'Retailer Tes2'});
        
        expect(async () => {
            await createProductUseCase.execute({...productToTest, retailerId: '3'});
        }
        ).rejects.toThrow("Id de Varejista está inválido");

    })
 
    it('should be able to create a new product with affiliateId', async () => {
        const retailerCreated =  await InMemoryRetailerRepository.create({name: productToTest.name});
        const productCreated = await createProductUseCase.execute({...productToTest, retailerId: retailerCreated.id});

        const product = await inMemoryProductRepository.findByName(productToTest.name);

        expect(productCreated).toBe(product);
        expect(productCreated.affiliateId).toBe(product.affiliateId);   
    })
  
 
    it('should not be able to create a new product with affiliatePercent less than 1 and greater than 100', async () => {
        const retailerCreated =  await InMemoryRetailerRepository.create({name: productToTest.name}); 
        expect(async () => {
            await createProductUseCase.execute({...productToTest, affiliatePercent: 0, retailerId: retailerCreated.id});
        }
        ).rejects.toThrow("Percentual de afiliado não pode ser menor que 1");

        expect(async () => {
            await createProductUseCase.execute({...productToTest, affiliatePercent: 101, retailerId: retailerCreated.id});
        }
        ).rejects.toThrow("Percentual de afiliado não pode ser maior que 100");
    })


    it('should not be able to create a new product with same name from another', async () => {
        const retailerCreated =  await InMemoryRetailerRepository.create({name: productToTest.name});
         await createProductUseCase.execute({...productToTest, retailerId: retailerCreated.id});
        expect(async () => {
            await createProductUseCase.execute({...productToTest, retailerId: retailerCreated.id});
            await createProductUseCase.execute({...productToTest, retailerId: retailerCreated.id});
        }
        ).rejects.toThrow("Produto já existe");

    })
})