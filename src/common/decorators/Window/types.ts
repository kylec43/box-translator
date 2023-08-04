import { WindowWrapper } from "../../lib/Window";

export interface IWindowDecoration {
    apply(window: WindowWrapper): Promise<void>;
}