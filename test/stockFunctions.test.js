// Import the functions you want to test
const {
    calculateMin,
    calculateMax,
    calculateMean,
    calculateStdDev,
    calculateMedian,
    calculateMovingAverage,
    analyzePrices
} = require('../model/stockFunctions.js');


const samplePrices = [100, 150, 130, 170, 190, 145];

describe('calculateMean', () => {
    test('should return the average', () => {
        expect(calculateMean(samplePrices)).toBe(147.5);
    });

    // Additional tests for calculateMean can be added here
});

describe('calculateStdDev', () => {
    test('should return the standard deviation', () => {
        expect(calculateStdDev(samplePrices)).toBeCloseTo(28.54, 2);
    });

    // Additional tests for calculateStdDev can be added here
});

describe('calculateMovingAverage', () => {
    test('should return the moving average for a window size of 3', () => {
        expect(calculateMovingAverage(samplePrices, 3)).toEqual([126.66666666666667, 150, 163.33333333333334, 168.33333333333334]);
    });

    // edge/extreme cases
    test('calculateMovingAverage with windowSize of 1', () => {
        const prices = [100, 105, 110];
        expect(calculateMovingAverage(prices, 1)).toEqual([100, 105, 110]);
    });

    test('calculateMovingAverage with windowSize equal to array length', () => {
        const prices = [100, 105, 110];
        expect(calculateMovingAverage(prices, prices.length)).toEqual([105]);
    });
    test('calculateMovingAverage with windowSize larger than array length', () => {
        const prices = [100, 105, 110];
        expect(calculateMovingAverage(prices, 5)).toEqual([]);
    });

    test('calculateMovingAverage with windowSize of 0', () => {
        const prices = [100, 105, 110];
        expect(() => calculateMovingAverage(prices, 0)).toThrow();
    });

    test('calculateMovingAverage with negative windowSize', () => {
        const prices = [100, 105, 110];
        expect(() => calculateMovingAverage(prices, -2)).toThrow();
    });
});

describe('calculateMin', () => {
    test('should return the minimum price', () => {
        expect(calculateMin(samplePrices)).toBe(100);
    });

    // Additional tests for calculateMin can be added here
});

describe('calculateMax', () => {
    test('should return the maximum price', () => {
        expect(calculateMax(samplePrices)).toBe(190);
    });

    // Additional tests for calculateMax can be added here
});


describe('calculateMedian', () => {
    test('should return the median for an array with an odd number of elements', () => {
        const prices = [150, 100, 130];
        expect(calculateMedian(prices)).toBe(130);
    });

    test('should return the median for an array with an even number of elements', () => {
        const prices = [150, 100, 130, 170];
        expect(calculateMedian(prices)).toBe(140); // because (130 + 150) / 2 = 140
    });

    test('should handle an array with a single element', () => {
        const prices = [150];
        expect(calculateMedian(prices)).toBe(150);
    });

    test('should handle an empty array', () => {
        const prices = [];
        expect(calculateMedian(prices)).toBeUndefined();
    });
});

describe('analyzePrices', () => {
    test('should detect rising prices', () => {
        const prices = [100, 101, 102];
        expect(analyzePrices(prices)).toBe('Rising');
    });

    test('should detect falling prices', () => {
        const prices = [102, 101, 100];
        expect(analyzePrices(prices)).toBe('Falling');
    });

    test('should detect stable prices when there’s no clear trend', () => {
        const prices = [100, 102, 101];
        expect(analyzePrices(prices)).toBe('Stable');
    });

    test('should return "Insufficient Data" for less than 3 prices', () => {
        const prices = [100, 101];
        expect(analyzePrices(prices)).toBe('Insufficient Data');
    });
});



describe('Invalid input Tests', () => {
    test('should handle empty array input', () => {
        const emptyArray = [];
        expect(calculateMean(emptyArray)).toBeNaN();
        expect(calculateStdDev(emptyArray)).toBeNaN();
        expect(calculateMovingAverage(emptyArray, 3)).toEqual([]);
        expect(calculateMin(emptyArray)).toBeInfinity();
        expect(calculateMax(emptyArray)).toBe(-Infinity);
        expect(calculateMedian(emptyArray)).toBeUndefined();
        expect(analyzePrices(emptyArray)).toBe('Insufficient Data');
    });

    test('should handle non-numeric values in array', () => {
        const invalidArray = [100, "abc", {}, null, undefined];
        expect(() => calculateMean(invalidArray)).toThrow();
        expect(() => calculateStdDev(invalidArray)).toThrow();
        expect(() => calculateMovingAverage(invalidArray, 3)).toThrow();
        expect(() => calculateMin(invalidArray)).toThrow();
        expect(() => calculateMax(invalidArray)).toThrow();
        expect(() => calculateMedian(invalidArray)).toThrow();
        expect(() => analyzePrices(invalidArray)).toThrow();
    });

});

