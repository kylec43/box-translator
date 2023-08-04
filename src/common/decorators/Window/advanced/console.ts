import { WindowWrapper } from "../../../lib/Window";
import { FullScreenWidth } from "../basic/layout";
import { Opacity } from "../basic/style";
import { IWindowDecoration } from "../types";

export class ConsoleDecoration implements IWindowDecoration {
    async apply(window: WindowWrapper): Promise<void> {
        await window.setDecorations(false);
        await window.applyDecoration(new Opacity(0.4));
        await window.applyDecoration(new FullScreenWidth());
        
        const currentSize = await window.getSize();
        window
            .setPosition(0, 0)
            .setMinSize(currentSize.width, 300);
    }

}