abstract class CreateSaleDTO {
    retailerId: string
    affiliateId?: string
    date: Date
    price: number
    product: string
    seller: string
    transactionType: number
}

export { CreateSaleDTO }