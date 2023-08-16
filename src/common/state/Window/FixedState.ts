import { WindowWrapper } from "../../lib/window/window";
import { IWindowState, WindowStateConfig } from "./types";
import { Opacity } from "../../decorators/window/style/opacity";
import { WidthPercentage } from "../../decorators/window/layout/size";

export class FixedState implements IWindowState {
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

        const alwaysOnTop = this.config.alwaysOnTop ?? true;
        const opacity = this.config.opacity ?? this.window.getOpacity() ?? 0.5;
        const posX = this.config.position?.x ?? 0;
        const posY = this.config.position?.y ?? 0;

        await this.window.setDecorations(false);
        await this.window.setAlwaysOnTop(alwaysOnTop);
        await this.window.decorateWith(new Opacity(opacity));
        await this.setWindowSize();
        this.window.setPosition(posX, posY);
        await this.window.setResizeable(false);

        const currentSize = await this.window.getSize();
        const minWidth = this.config.minSize?.width ?? currentSize.width;
        const minHeight = this.config.minSize?.height ?? 200;
        this.window.setMinSize(minWidth, minHeight);   
    }

    private async setWindowSize(): Promise<void> {
        this.assertWindowIsSet();

        if (this.config.size === undefined) {
            const currentSize = await this.window.getSize();
            this.window.setSize(currentSize.width, 400);
            await this.window.decorateWith(new WidthPercentage(1));
            return;
        }

        const {width, height} = this.config.size;
        this.window.setSize(width, height);
    }

    cleanUp(): void {

    }
}