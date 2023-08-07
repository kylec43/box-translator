import { 
    PhysicalPosition,
    PhysicalSize, 
    WebviewWindow, 
    appWindow as tauriAppWindow
} from "@tauri-apps/api/window";

import { EventCallback, Event, UnlistenFn } from "@tauri-apps/api/event";
import { IWindowDecoration } from "../../decorators/Window/types";
import { IWindowState } from "../../state/Window/types";
import { FixedState } from "../../state/Window/FixedState";

export class WindowWrapper {
    private appWindow: WebviewWindow;
    private state?: IWindowState;

    constructor(appWindow: WebviewWindow, state: IWindowState) {
        this.appWindow = appWindow;
        this.setState(state);
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

    async setAlwaysOnTop(flag: boolean): Promise<WindowWrapper> {
        await this.appWindow.setAlwaysOnTop(flag);
        return this;
    }

    async setDecorations(value: boolean): Promise<WindowWrapper> {
        await this.appWindow.setDecorations(value);
        return this;
    }

    async setResizeable(flag: boolean): Promise<WindowWrapper> {
        await this.appWindow.setResizable(flag);
        return this;
    }

    async getSize(): Promise<PhysicalSize> {
        return this.appWindow.innerSize();
    }

    async getPosition(): Promise<PhysicalPosition> {
        return this.appWindow.innerPosition();
    }

    getOpacity(): number | null {
        const computedStyle = window.getComputedStyle(document.body);
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

    async show(): Promise<void> {
        return this.appWindow.show();
    }

    async listen<T>(event: string, handler: EventCallback<Event<T>>): Promise<UnlistenFn> {
        return this.appWindow.listen<Event<T>>(event, handler);
    }

    decorateWith(...decorations: IWindowDecoration[]): Promise<void[]> {
        return Promise.all(decorations.map(decoration => decoration.apply(this)));
    }

    onMoved(callback: EventCallback<PhysicalPosition>): Promise<UnlistenFn> {
        return this.appWindow.onMoved(callback)
    }

    async setState(state: IWindowState): Promise<void> {
        this.state?.cleanUp();
        this.state = state;
        this.state.setContext(this);
        this.state.transformContext();
    }
}


export const appWindow = new WindowWrapper(tauriAppWindow, new FixedState());