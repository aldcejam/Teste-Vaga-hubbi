import { InMemoryAffiliateRepository } from '@domain/affiliate/InMemoryAffiliateRepository';
 
import { FindAffiliateByRetailerUseCase } from "./FindAffiliateByRetailerUseCase";

let findAffiliateByRetailerUseCase: FindAffiliateByRetailerUseCase; 
let inMemoryAffiliateRepository: InMemoryAffiliateRepository

describe("Find Affiliate By Retailer Use Case", () => {

    beforeEach(() => {
        inMemoryAffiliateRepository = new InMemoryAffiliateRepository();
        findAffiliateByRetailerUseCase = new FindAffiliateByRetailerUseCase(inMemoryAffiliateRepository);
    });

    it("should be able to find affiliates by retailer", async () => {
        const affiliate = await inMemoryAffiliateRepository.create({
            name: "Affiliate Name",
            retailerId: "retailerId"
        });

        const affiliates = await findAffiliateByRetailerUseCase.execute("retailerId");

        expect(affiliates).toEqual([affiliate]);

    })
})
