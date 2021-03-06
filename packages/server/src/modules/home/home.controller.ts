import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Controller()
export class HomeController {
    private readonly config: ConfigService;

    constructor(config: ConfigService) {
        this.config = config;
    }

    @Get()
    @Render('index')
    root() {
        return {
            title: 'this is title',
            message: `this is message, PORT:${this.config.PORT}`
        };
    }
}
