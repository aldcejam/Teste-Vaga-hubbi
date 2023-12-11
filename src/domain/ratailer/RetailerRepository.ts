import { CreateRatailerDTO } from "@dtos/retailer/CreateRetailerDTO";
import { Retailer } from "@prisma/client";

abstract class RetailerRepository {
    abstract create({name}:CreateRatailerDTO): Promise<Retailer>;
    abstract findByName(name:string): Promise<Retailer>;
    abstract listAll(): Promise<Retailer[]>;
    abstract findById(id:string): Promise<Retailer>; 
}

export { RetailerRepository }