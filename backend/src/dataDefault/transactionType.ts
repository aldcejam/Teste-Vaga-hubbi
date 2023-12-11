export const TransactionType = (type: number) => {
    switch (type) {
        case 1:
        return {
            type: 1,
            category: 'entrada',
            description: 'venda de produto',
            sign: '+'
        }
        case 2:
        return {
            type: 2,
            category: 'entrada',
            description: 'venda afiliado',
            sign: '+'
        }
        case 3:
        return {
            type: 3,
            category: 'saida',
            description: 'comissao paga',
            sign: '-'
        }
        case 4:
        return {
            type: 4,
            category: 'entrada',
            description: 'comissão recebida',
            sign: '+'
        }
    }
}