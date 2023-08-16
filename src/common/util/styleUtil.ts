export function getOpacityOfElement(element: HTMLElement): number | null {
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;
    const rgbaValues = bgColor.match(/\d+\.?\d*/g);
    if (!rgbaValues) {
        return null;
    }

    const a = rgbaValues[3];
    if (isNaN(Number(a))) {
        return null
    }

    return parseFloat(a);
}