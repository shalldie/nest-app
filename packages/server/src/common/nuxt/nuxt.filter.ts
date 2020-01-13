import { ExceptionFilter, HttpException, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

import { Nuxt, Builder, nuxtConfig } from '@blog/nuxt-client';
import { Response, Request } from 'express';
import { ConfigService } from 'src/config/config.service';

@Catch()
export class NuxtFilter implements ExceptionFilter {
    public static async create(config: ConfigService): Promise<NuxtFilter> {
        // 环境
        nuxtConfig.dev = config.NODE_ENV === 'development';
        const nuxt = new Nuxt(nuxtConfig);

        // 开发模式，动态编译
        if (nuxtConfig.dev) {
            await new Builder(nuxt).build();
        }
        // 生产直接用 .nuxt 中内容
        else {
            await nuxt.ready();
        }

        return new NuxtFilter(config, nuxt);
    }

    private readonly config: ConfigService;

    private readonly nuxt: Nuxt;

    constructor(config: ConfigService, nuxt: Nuxt) {
        this.config = config;
        this.nuxt = nuxt;
    }

    public async catch(exception: HttpException, host: ArgumentsHost) {
        try {
            const ctx = host.switchToHttp();

            const res = ctx.getResponse<Response>();
            const req = ctx.getRequest<Request>();

            const status = exception.getStatus();

            // 如果没有从nestjs注册的路由中找到
            // 404 && 没有发送响应头
            // 交给 nuxt 处理
            if (status === HttpStatus.NOT_FOUND && !res.headersSent) {
                await this.nuxt.render(req, res);
                return;
            }
            // 否则就真的是异常了
            res.status(status).json({
                statusCode: status,
                message: exception.message
            });
        } catch (ex) {
            // 这里不清楚还会有异常么
            console.log(ex);
        }
    }
}
