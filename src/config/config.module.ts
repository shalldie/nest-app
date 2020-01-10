import path from 'path';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
    providers: [{
        provide: ConfigService,
        useValue: new ConfigService(
            path.join(__dirname, `../../env/${process.env.NODE_ENV || 'development'}.env`)
        )
    }],
    exports: [ConfigService]
})
export class ConfigModule { }
