abstract class CreateProductDTO {
    abstract name: string;
    abstract affiliatePercent: number;
    abstract retailerId: string;
    abstract affiliateId?: string;
}

export { CreateProductDTO };