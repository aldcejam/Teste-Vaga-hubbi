import * as fs from 'fs';

type ISale = {
    transactionTypes: string,
    transactionDate: string,
    product: string,
    price: string,
    sale: string,

}

export const GetDateToSales = (file: string): ISale[] => {
    const filePath = file;
    const data = fs.readFileSync(filePath, 'utf-8');

    const lines = data.split('\n');
    const results = [];

    lines.forEach(line => { 
        if (line === '') {
            return;
        }
        const regex = /0\d{9}/;

        const entry = {
            transactionTypes: line[0],
            transactionDate: line.substring(1, 26),
            product: line.substring(26, line.indexOf('  ')),
            price: line.match(regex)[0],
            sale: line.substring(line.indexOf('  ') + 16),
        };

        results.push(entry);
    });

    return results;
}