import { appWindow } from "./common/lib/Window";

bootstrap();

async function bootstrap() {
    await appWindow.show();
}