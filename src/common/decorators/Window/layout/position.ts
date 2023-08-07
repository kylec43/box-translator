import { WindowWrapper } from "../../../lib/Window";
import { IWindowDecoration } from "../types";

export class FixedPosition implements IWindowDecoration {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    apply(window: WindowWrapper): Promise<void> {
        throw new Error("Method not implemented.");
    }
}