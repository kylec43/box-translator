import { appWindow } from "./common/lib/Window/Window";
import { MoveableState } from "./common/state/Window/MoveableState";

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