export const FormatStructureCurrency = (value: string) => {
    const numeroSemZeros = value.replace(/^0+/, '');

    const parteInteira = numeroSemZeros.slice(0, -2) || '0';
    const parteDecimal = numeroSemZeros.slice(-2);

    const numeroFormatado = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '.' + parteDecimal;

    return numeroFormatado;  
}