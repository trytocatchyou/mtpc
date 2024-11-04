#!/usr/bin/env node
const program = require('commander');
const init = require('../lib/init.js');
const load = require('../lib/load.js');

program
  .version(require('../package.json').version)
  .command('init')
  .description('创建新项目')
  .action(init)

program
  .version(require('../package.json').version)
  .command("load")
  .description("添加项目模板配置")
  .option("-k, --key <key>", "模板键名")
  .option("-n, --name <name>", "项目名称")
  .option("-r, --repo <repo>", "项目仓库地址")
  .option("-b, --branch <branch>", "项目分支", "main")
  .action(load);

program.parse(process.argv);