import { Module } from '@nestjs/common';
import { RouteModules } from './modules';

@Module({
    imports: [
        ...RouteModules
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
