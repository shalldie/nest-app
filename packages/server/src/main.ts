import path from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';
import nunjucks from 'nunjucks';
import consola from 'consola';
import { NuxtFilter } from './common/nuxt/nuxt.filter';

// eslint-disable-next-line
console.log(require('fork-ts-checker-webpack-plugin'));

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('/api');

    const config = app.get(ConfigService);

    // --- njk ---
    const envNjk = nunjucks.configure(path.join(__dirname, './views'), {
        autoescape: true,
        express: app,
        watch: true
    });

    app.engine('html', envNjk.render);
    app.setViewEngine('html');

    // --- nuxt ---
    app.useGlobalFilters(await NuxtFilter.create(config));

    // --- listen ---
    await app.listen(config.PORT, () => {
        consola.start({
            badge: true,
            message: `Serve on http://127.0.0.1:${config.PORT}`
        });
    });
}
bootstrap();
