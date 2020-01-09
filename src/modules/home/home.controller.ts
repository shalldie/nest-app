import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {

    @Get()
    @Render('index')
    root(): any {
        return {
            title: 'this is title',
            message: 'this is message'
        };
    }

}
