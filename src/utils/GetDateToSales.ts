import * as fs from 'fs';

type ISale = {
    transactionType: number,
    transactionDate: Date,
    product: string,
    price: string,
    saller: string, 
}

export const GetDateToSales = (Items: string[]): ISale[] => { 

    const results = [];

    Items.forEach(line => { 
        if (line === '') {
            return;
        }
        const regexPrice = /0\d{9}/;
        const regexSaller =  /  \d{10}(.*)/;

        const entry = {
            transactionType: Number(line[0]),
            transactionDate: new Date(line.substring(1, 26)),
            product: line.substring(26, line.indexOf('  ')),
            price: line.match(regexPrice)[0],
            saller: line.match(regexSaller)[1],
        };

        results.push(entry);
    });

    return results;
}