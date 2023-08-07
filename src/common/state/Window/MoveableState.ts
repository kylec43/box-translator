import { WidthPercentage } from "../../decorators/Window/layout/size";
import { Opacity } from "../../decorators/Window/style/opacity";
import { WindowWrapper } from "../../lib/Window/Window";
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

    async transformContext(): Promise<void> {
        this.assertWindowIsSet();

        const alwaysOnTop = this.config.alwaysOnTop ?? false;
        const opacity = this.config.opacity ?? this.window.getOpacity() ?? 0.5;
        const currentPosition = await this.window.getPosition(); 
        const posX = this.config.position?.x ?? currentPosition.x;
        const posY = this.config.position?.y ?? currentPosition.y;
        const minWidth = this.config.minSize?.width ?? 400;
        const minHeight = this.config.minSize?.height ?? 50;

        this.window.setPosition(posX, posY);
        await this.window.setResizeable(true);
        await this.window.setDecorations(true);
        await this.window.setAlwaysOnTop(alwaysOnTop);
        await this.window.decorateWith(new Opacity(opacity));
        await this.setWindowSize();
        this.window.setMinSize(minWidth, minHeight);  
    }

    private async setWindowSize(): Promise<void> {
        this.assertWindowIsSet();

        if (this.config.size === undefined) {
            await this.window.decorateWith(new WidthPercentage(0.6));
            const currentSize = await this.window.getSize();
            const height = Math.floor(currentSize.width * 0.5);
            this.window.setSize(currentSize.width, height);
            return;
        }

        const {width, height} = this.config.size;
        this.window.setSize(width, height);
    }

    cleanUp(): void {
        
    }
}