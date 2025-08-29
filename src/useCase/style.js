export function pxToRem(pixelValue) {
    return `${pixelValue / 10}rem`
}

export function getClampValue(
    minValue,
    maxValue,
    minBreakpoint = 1023,
    maxBreakpoint = 1440,
) {
    const valuesAreNegative =
        Math.sign(minValue) + Math.sign(maxValue) === -2 ? true : false;
    const minValueRem = minValue / 10;
    const maxValueRem = maxValue / 10;
    const minBreakpointRem = minBreakpoint / 10;
    const maxBreakpointRem = maxBreakpoint / 10;
    const slope =
        (maxValueRem - minValueRem) / (maxBreakpointRem - minBreakpointRem);
    const yAxisIntersection = -minBreakpointRem * slope + minValueRem;
    const preferredValue = `${yAxisIntersection.toFixed(4) * 0.625}rem + ${(
        slope * 100
    ).toFixed(4)}vw`;

    return `clamp(${
        valuesAreNegative ? maxValueRem * 0.625 : minValueRem * 0.625
    }rem, ${preferredValue}, ${
        valuesAreNegative ? minValueRem * 0.625 : maxValueRem * 0.625
    }rem)`;
}