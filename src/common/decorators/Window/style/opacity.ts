import { WindowWrapper } from "../../../lib/Window";
import { IWindowDecoration } from "../types";


export class Opacity implements IWindowDecoration {
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    async apply(appWindow: WindowWrapper): Promise<void> {
        const computedStyle = window.getComputedStyle(document.body);
        const bgColor = computedStyle.backgroundColor;
        const rgbaValues = bgColor.match(/\d+\.?\d*/g);
        if (rgbaValues) {
            const [r, g, b] = rgbaValues;
            document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${this.value.toString()})`;
        } else {
            console.error('Unable to make window transparent');
        }
    }
}