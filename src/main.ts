import path from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';
import nunjucks from 'nunjucks';
import consola from 'consola';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);

    const envNjk = nunjucks.configure(
        path.join(__dirname, './views'),
        {
            autoescape: true,
            express: app,
            watch: true
        }
    );

    app.engine('html', envNjk.render);
    app.setViewEngine('html');

    await app.listen(config.PORT, () => {
        consola.start({
            badge: true,
            message: `serve on http://127.0.0.1:${config.PORT}`
        });
    });
}
bootstrap();
