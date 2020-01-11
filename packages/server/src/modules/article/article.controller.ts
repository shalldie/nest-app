import { Controller, Get } from '@nestjs/common';

@Controller('article')
export class ArticleController {
    @Get()
    index() {
        return {
            message: 'this is /article'
        };
    }
}
