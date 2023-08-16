import { appWindow } from "./common/lib/window/window";
import { MoveableState } from "./common/state/window/moveableState";

bootstrap();

async function bootstrap() {
    await appWindow.show();
}

// For testing
window.onload = () => {
    window.onclick = () => {
        appWindow.setState(new MoveableState());
    };
};