/**
 * .env 的配置
 *
 * @export
 * @class EnvConfig
 */
export class EnvConfig {
    /**
     * 开发环境
     *
     * @type {('development' | 'production')}
     * @memberof EnvConfig
     */
    public NODE_ENV: 'development' | 'production' = 'development';

    /**
     * server 监听的端口
     *
     * @type {number}
     * @memberof EnvConfig
     */
    public PORT: number = 3000;

    /**
     * markdown 文章所在目录
     *
     * @type {string}
     * @memberof EnvConfig
     */
    public MD_DIR: string = process.cwd();
}
