import { Opacity } from "../../decorators/Window/style/opacity";
import { WindowWrapper } from "../../lib/Window";
import { IWindowState, WindowStateConfig } from "./types";

export class MoveableState implements IWindowState {
    protected config: WindowStateConfig;
    protected window?: WindowWrapper;

    constructor(config?: WindowStateConfig) {
        this.config = {
            ...(config ?? {})
        };
    }

    protected assertWindowIsSet(): asserts this is { window: WindowWrapper } {
        if (this.window === undefined) {
            throw new TypeError('Window is undefined');
        }
    }

    setContext(window: WindowWrapper): void {
        this.window = window;
    } 

    async act(): Promise<void> {
        this.assertWindowIsSet();

        const alwaysOnTop = this.config.alwaysOnTop ?? false;
        const opacity = this.config.opacity ?? 0.5;
        const currentPosition = await this.window.getPosition(); 
        const posX = this.config.position?.x ?? currentPosition.x;
        const posY = this.config.position?.y ?? currentPosition.y;
        const currentSize = await this.window.getSize();
        const width = this.config.size?.width ?? currentSize.width;
        const height = this.config.size?.height ?? currentSize.height;
        const minWidth = this.config.minSize?.width ?? 400;
        const minHeight = this.config.minSize?.height ?? 50;

        await this.window.setDecorations(true);
        await this.window.setAlwaysOnTop(alwaysOnTop);
        await this.window.decorateWith(new Opacity(opacity));
        this.window.setPosition(posX, posY);
        this.window.setSize(width, height);
        this.window.setMinSize(minWidth, minHeight);  
    }

    cleanUp(): void {
        
    }
}