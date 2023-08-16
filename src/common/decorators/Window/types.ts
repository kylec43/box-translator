import { WindowWrapper } from "../../lib/window/window";

export interface IWindowDecoration {
    apply(window: WindowWrapper): Promise<void>;
}