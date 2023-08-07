import { getScreenSize } from "../../../ipc/invoke";
import { WindowWrapper } from "../../../lib/Window";
import { IWindowDecoration } from "../types";


export class FullScreenWidth implements IWindowDecoration {
    async apply(window: WindowWrapper): Promise<void> {
        const screenSize = await getScreenSize();
        const currentSize = await window.getSize();
        window.setSize(screenSize.width, currentSize.height);
    }
}