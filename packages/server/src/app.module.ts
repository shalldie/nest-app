import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { RouteModules } from './modules';

@Module({
    imports: [ConfigModule, ...RouteModules],
    controllers: [],
    providers: []
})
export class AppModule {}
