"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("./swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: 'https://midterm-project-webnc.vercel.app',
        credentials: true,
    });
    (0, swagger_1.setupSwagger)(app);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map