import { UnlistenFn } from "@tauri-apps/api/event";
import { WindowWrapper } from "../../lib/Window/Window";
import { IWindowState, WindowStateConfig } from "./types";
import { Opacity } from "../../decorators/Window/style/opacity";
import { WidthPercentage } from "../../decorators/Window/layout/size";

export class FixedState implements IWindowState {
    protected config: WindowStateConfig;
    protected window?: WindowWrapper;
    private fixedPosUnlistener?: UnlistenFn;

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
        this.setWindowPosition(posX, posY);
        //await this.fixWindowToPositionWithListener(posX, posY);
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

    private async fixWindowToPositionWithListener(posX: number, posY: number): Promise<void> {
        this.assertWindowIsSet();

        this.setWindowPosition(posX, posY);
        const unlisten = await this.window.onMoved(event => {
            this.setWindowPosition(posX, posY)
        });

        if (this.fixedPosUnlistener !== undefined) {
            this.fixedPosUnlistener();
        }

        this.fixedPosUnlistener = unlisten;
    }

    private setWindowPosition(posX: number, posY: number): void {
        this.assertWindowIsSet();
        this.window.setPosition(posX, posY);
    }

    cleanUp(): void {
        if (this.fixedPosUnlistener !== undefined) {
            this.fixedPosUnlistener();
        }
    }
}