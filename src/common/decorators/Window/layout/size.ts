import { getScreenSize } from "../../../ipc/invoke";
import { WindowWrapper } from "../../../lib/window/window";
import { IWindowDecoration } from "../types";


export class WidthPercentage implements IWindowDecoration {
    private percentage: number;

    constructor(percentage: number) {
        if (percentage > 1 || percentage < 0) {
            throw new RangeError('Screen Width Percentage must be between 0 and 1');
        } 
        this.percentage = percentage;
    }

    async apply(window: WindowWrapper): Promise<void> {
        const screenSize = await getScreenSize();
        const currentSize = await window.getSize();
        window.setSize(screenSize.width * this.percentage, currentSize.height);
    }
}

export class HeightPercentage implements IWindowDecoration {
    private percentage: number;

    constructor(percentage: number) {
        if (percentage > 1 || percentage < 0) {
            throw new RangeError('Screen Height Percentage must be between 0 and 1');
        } 
        this.percentage = percentage;
    }

    async apply(window: WindowWrapper): Promise<void> {
        const screenSize = await getScreenSize();
        const currentSize = await window.getSize();
        window.setSize(currentSize.width, screenSize.height * this.percentage);
    }
}