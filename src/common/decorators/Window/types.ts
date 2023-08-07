import { WindowWrapper } from "../../lib/Window/Window";

export interface IWindowDecoration {
    apply(window: WindowWrapper): Promise<void>;
}