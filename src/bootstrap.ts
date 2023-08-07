import { appWindow } from "./common/lib/Window";
import { MoveableState } from "./common/state/Window/MoveableState";

bootstrap();

async function bootstrap() {
    await appWindow.show();
}
window.onload = () => {
    window.onclick = () => {
        appWindow.setState(new MoveableState());
    };
};