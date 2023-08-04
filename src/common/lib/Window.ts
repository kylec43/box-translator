import { 
    PhysicalPosition,
    PhysicalSize, 
    WebviewWindow, 
    appWindow as tauriAppWindow
} from "@tauri-apps/api/window";

import { EventCallback, Event, UnlistenFn } from "@tauri-apps/api/event";
import { IWindowDecoration } from "../decorators/Window/types";

export class WindowWrapper {
    private appWindow: WebviewWindow;

    constructor(appWindow: WebviewWindow) {
        this.appWindow = appWindow;
    }

    setSize(width: number, height: number): WindowWrapper {
        this.appWindow.setSize(new PhysicalSize(width, height));
        return this;
    }

    setMinSize(width: number, height: number): WindowWrapper {
        this.appWindow.setMinSize(new PhysicalSize(width, height));
        return this;
    }

    setPosition(x: number, y: number): WindowWrapper {
        this.appWindow.setPosition(new PhysicalPosition(x, y));
        return this;
    }

    async setDecorations(value: boolean): Promise<WindowWrapper> {
        await this.appWindow.setDecorations(value);
        return this;
    }

    async getSize(): Promise<PhysicalSize> {
        return await this.appWindow.innerSize();
    }

    async show(): Promise<void> {
        return await this.appWindow.show();
    }

    async listen<T>(event: string, handler: EventCallback<Event<T>>): Promise<UnlistenFn> {
        return await this.appWindow.listen<Event<T>>(event, handler);
    }

    applyDecoration(decoration: IWindowDecoration): Promise<void>;
    applyDecoration(decoration: IWindowDecoration): Promise<void> {
        return decoration.apply(this);
    }
}


export const appWindow = new WindowWrapper(tauriAppWindow);