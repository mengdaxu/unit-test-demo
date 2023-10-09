function calculateMean(prices) {
    const sum = prices.reduce((a, b) => a + b, 0);
    return sum / prices.length;
}


function calculateStdDev(prices) {
    const mean = calculateMean(prices);
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    return Math.sqrt(variance);
}

function calculateMovingAverage(prices, windowSize) {
    let result = [];
    for (let i = 0; i <= prices.length - windowSize; i++) {
        const windowPrices = prices.slice(i, i + windowSize);
        result.push(calculateMean(windowPrices));
    }
    return result;
}

function calculateMin(prices) {
    return Math.min(...prices);
}

function calculateMax(prices) {
    return Math.max(...prices);
}

function calculateMedian(prices) {
    const sortedPrices = [...prices].sort((a, b) => a - b);
    const mid = Math.floor(sortedPrices.length / 2);

    // Check if the length of prices is odd
    if (sortedPrices.length % 2 !== 0) {
        return sortedPrices[mid];
    }

    // If even, return the average of the two middle numbers
    return (sortedPrices[mid - 1] + sortedPrices[mid]) / 2;
}

function analyzePrices(prices) {
    if (prices.length < 3) return 'Insufficient Data';
    const [lastPrice, secondLastPrice, thirdLastPrice] = prices.slice(-3);
    if (lastPrice > secondLastPrice && secondLastPrice > thirdLastPrice) {
        return 'Rising';
    } else if (lastPrice < secondLastPrice && secondLastPrice < thirdLastPrice) {
        return 'Falling';
    }
    return 'Stable';
}


module.exports = {
    calculateMean,
    calculateStdDev,
    calculateMovingAverage,
    calculateMin,
    calculateMax,
    calculateMedian,
    analyzePrices
};