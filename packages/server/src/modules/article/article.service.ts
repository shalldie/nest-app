// system
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import glob from 'glob';

import { ConfigService } from 'src/config/config.service';
import { Article } from 'src/common/dto/Article.dto';

const promiseGlob = promisify(glob);

@Injectable()
export class ArticleService {
    private readonly config: ConfigService;

    constructor(config: ConfigService) {
        this.config = config;
    }

    /**
     * 获取所有文章基本信息
     *
     * @returns {Promise<Article[]>}
     * @memberof ArticleService
     */
    public async getArticlesInfo(): Promise<Article[]> {
        // 所有配置文件列表
        const pathList = await promiseGlob(path.join(this.config.MD_DIR, 'blog/**/*.blog.json'), { dot: true });

        // 所有配置文件信息
        const infoList: Article[] = pathList.map(filePath => {
            const info = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Article;
            const dirPath = path.dirname(filePath);
            info.filePath = path.relative(this.config.MD_DIR, path.join(dirPath, 'index.md'));
            return info;
        });
        infoList.sort((a, b) => b.publishTime - a.publishTime);
        return infoList;
    }

    /**
     * 获取某一页的blog信息
     *
     * @param {number} [page=1] 第几页
     * @param {number} [pageSize=20] 每页数量
     * @param {(string | string[])} [label=[]] 过滤的label
     * @returns {Promise<Article[]>}
     * @memberof ArticleService
     */
    public async getArticlesInfoByPage(
        page: number = 1,
        pageSize: number = 20,
        label: string | string[] = []
    ): Promise<Article[]> {
        let articlesInfo = await this.getArticlesInfo();

        // 如果有label过滤
        if (label.length) {
            if (typeof label === 'string') {
                label = [label];
            }
            // 取交集判断长度，找到包含所有label的项
            articlesInfo = articlesInfo.filter(n => _.intersection(n.labels, label).length === label.length);
        }

        return articlesInfo.slice((page - 1) * pageSize, page * pageSize);
    }
}
