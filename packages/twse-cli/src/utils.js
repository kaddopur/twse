export function parseSymbolOption(symbolOption) {
    const [code, name] = symbolOption.split(' ');
    return { code, name };
}
