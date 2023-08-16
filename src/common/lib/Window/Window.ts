import { 
    PhysicalPosition,
    PhysicalSize, 
    WebviewWindow, 
    appWindow as tauriAppWindow
} from "@tauri-apps/api/window";

import { IWindowDecoration } from "../../decorators/window/types";
import { IWindowState } from "../../state/window/types";
import { FixedState } from "../../state/window/fixedState";
import { getOpacityOfElement } from "../../util/styleUtil";

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
        return getOpacityOfElement(document.body);
    }

    async show(): Promise<void> {
        return this.appWindow.show();
    }

    decorateWith(...decorations: IWindowDecoration[]): Promise<void[]> {
        return Promise.all(decorations.map(decoration => decoration.apply(this)));
    }

    async setState(state: IWindowState): Promise<void> {
        this.state?.cleanUp();
        this.state = state;
        this.state.setContext(this);
        this.state.transformContext();
    }
}


export const appWindow = new WindowWrapper(tauriAppWindow, new FixedState());