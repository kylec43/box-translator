import { invoke } from "@tauri-apps/api";
import { appWindow } from "./common/lib/Window";
import { with_window_opacity } from "./common/decorators/Window/style";

bootstrap();

async function bootstrap() {
    const screenSize = JSON.parse(await invoke('get_physical_screen_size'));
    if (isTypeOfScreenSize(screenSize)) {
        const currentSize = await appWindow.getInnerSize();
        
        with_window_opacity(0.4);
        
        appWindow
            .setPosition(0, 0)
            .setSize(screenSize.width, currentSize.height)
            .setMinSize(screenSize.width, 300);
        
        await appWindow.setDecorations(false);
        await appWindow.show();
    }
}

function isTypeOfScreenSize(value: any): value is { width: number, height: number } {
    return value.width !== undefined && value.height !== undefined;
}