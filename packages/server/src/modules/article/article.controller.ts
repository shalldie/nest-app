import { Controller, Get } from '@nestjs/common';

import { Nuxt, nuxtConfig } from '@blog/nuxt-client';

console.log(Nuxt);

@Controller('article')
export class ArticleController {
    @Get()
    index() {
        // const nuxtConfig = require('../../../../client/nuxt.config.js');
        return {
            message: 'this is article'
        };
    }
}
