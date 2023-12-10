import fs from 'fs';

export const GetDateToSales = (file: string) => {
    const filePath = file;
    const data = fs.readFileSync(filePath, 'utf-8');

    const lines = data.split('\n');
    const results = [];

    lines.forEach(line => {
        //não vazia
        if (line === '') {
            return;
        }
        const entry = {
            transactionTypes: line[0],
            transactionDate: line.substring(1, 26),
            product: line.substring(26, line.indexOf('  ')),
            price: line.substring(line.indexOf('  '), line.indexOf('  ') + 16).trim(),
            sale: line.substring(line.indexOf('  ') + 16).trim(),
        };

        results.push(entry);

    });
}