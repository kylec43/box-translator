export function with_window_opacity(value: number) {
    const computedStyle = window.getComputedStyle(document.body);
    const bgColor = computedStyle.backgroundColor;
    const rgbaValues = bgColor.match(/\d+\.?\d*/g);
    if (rgbaValues) {
        const [r, g, b] = rgbaValues;
        document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${value.toString()})`;
    } else {
        console.error('Unable to make window transparent');
    }
}