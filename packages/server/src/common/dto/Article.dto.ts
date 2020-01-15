/**
 * 博客文章类
 *
 * @export
 * @class Article
 */
export class Article {
    /**
     * 名称(英文)
     * @type {string}
     * @memberof Article
     */
    name: string = '';

    /**
     * 标题
     * @type {string}
     * @memberof Article
     */
    title: string = '';

    /**
     * 封面
     *
     * @type {string}
     * @memberof Article
     */
    cover: string = '';

    /**
     * 发布时间
     * @type {number}
     * @memberof Article
     */
    publishTime: number = 0;

    /**
     * 标签
     *
     * @type {string[]}
     * @memberof Article
     */
    labels: string[] = [];

    /**
     * 内容
     * @type {string}
     * @memberof Article
     */
    content: string = '';

    /**
     * 文件路径
     * @type {string}
     * @memberof Article
     */
    filePath: string = '';
}
