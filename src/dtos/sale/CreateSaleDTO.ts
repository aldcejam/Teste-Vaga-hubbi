import { IsNotEmpty } from "class-validator"

abstract class CreateSaleDTO {
    @IsNotEmpty({
        message: 'retailerId, identificador do varejista é obrigatório'
    })
    retailerId: string
    affiliateId?: string
    @IsNotEmpty({
        message: 'date, Data da venda é obrigatório'
    })
    date: Date
    @IsNotEmpty({
        message: 'price, Preço da venda é obrigatório'
    })
    price: number
    @IsNotEmpty({
        message: 'product, nome do Produto é obrigatório'
    })
    product: string
    @IsNotEmpty({
        message: 'seller, Nome do vendedor é obrigatório'
    })
    seller: string
    @IsNotEmpty({
        message: 'transactionType, Tipo de transação é obrigatório'
    })
    transactionType: number
}

export { CreateSaleDTO }