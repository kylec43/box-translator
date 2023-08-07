import { WindowWrapper } from "../../lib/Window";

export interface IWindowState {
    setContext(window: WindowWrapper): void;
    transformContext(): Promise<void>;
    cleanUp(): void;
}

export type Size = {
    width: number,
    height: number
};

export type Position = {
    x: number,
    y: number
};

export type WindowStateConfig = {
    alwaysOnTop?: boolean,
    opacity?: number,
    size?: Size,
    position?: Position,
    minSize?: Size
};