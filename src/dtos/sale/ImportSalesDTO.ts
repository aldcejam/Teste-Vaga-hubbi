import { IsNotEmpty } from "class-validator";

abstract class ImportSalesDTO{
    abstract file: string[];
    abstract retailerId: string;
    abstract affiliateId?: string;
}
 




export { ImportSalesDTO,};