const currencyFormat = (num) => {
    if (!Boolean(num)) {
        return 0;
    }
    let amount = parseFloat(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return num !== 0 ? (num < 0 ? `${amount}` : amount) : 0;
};
export default currencyFormat;