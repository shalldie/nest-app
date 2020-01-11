import {
    Controller,
    Get,
    Render,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
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
            message: `this is message, PORT:${this.config.PORT}`,
        };
    }
}

// 4期，33号楼101室，周一8:30 ～ 11:00  ，1:30 ～ 4：00
