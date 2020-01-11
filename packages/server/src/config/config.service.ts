import fs from 'fs';
import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import { EnvConfig } from './config.dto';
import Joi from '@hapi/joi';

@Injectable()
export class ConfigService extends EnvConfig {
    constructor(filePath: string) {
        super();
        this.initialize(dotenv.parse(fs.readFileSync(filePath)));
    }

    private initialize(envConfig: Record<string, string>): void {
        const defEnv = new EnvConfig();
        const envVarsSchema = Joi.object<EnvConfig>({
            NODE_ENV: Joi.string()
                .valid('development', 'production')
                .default(defEnv.NODE_ENV),
            PORT: Joi.number().default(defEnv.PORT),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        for (const key in validatedEnvConfig) {
            this[key] = validatedEnvConfig[key];
        }
    }
}
