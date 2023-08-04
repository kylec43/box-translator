import { appWindow } from "./common/lib/Window";
import { ConsoleDecoration } from "./common/decorators/Window/advanced";

bootstrap();

async function bootstrap() {
    await appWindow.applyDecoration(new ConsoleDecoration());
    await appWindow.show();
}