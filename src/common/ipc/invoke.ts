import { invoke } from "@tauri-apps/api";

export type ScreenSize = { width: number, height: number };

export async function getScreenSize(): Promise<ScreenSize> {
    const screenSize = JSON.parse(await invoke('get_physical_screen_size'));
    if (isTypeOfScreenSize(screenSize)) {
        return screenSize;
    }

    throw new TypeError('Bad Response: Invalid Type');
}

function isTypeOfScreenSize(value: any): value is ScreenSize {
    return value.width !== undefined && value.height !== undefined;
}