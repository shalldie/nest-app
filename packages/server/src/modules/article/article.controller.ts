import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
    private readonly articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    @Get()
    index() {
        return {
            message: 'this is article'
        };
    }

    @Get('info')
    info() {
        return {
            message: this.articleService.getArticlesInfo()
        };
    }
}
