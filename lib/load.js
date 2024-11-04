// lib/load.js
const chalk = require("chalk");
const ora = require("ora");
const { readConfig, writeConfig } = require('./config');

async function load(options) {
  try {
    // 验证必要参数
    if (!options.name || !options.repo || !options.key) {
      throw new Error("请提供完整的参数：-n(名称) -r(仓库) -k(键名)");
    }

    const spinner = ora("正在加载模板...").start();
    
    // 读取现有配置
    const config = await readConfig();

    // 构建新模板配置
    const newTemplate = {
      name: options.name,
      repo: options.repo,
      branch: options.branch
    };

    // 合并配置
    config[options.key] = newTemplate;
    
    // 写入配置文件
    await writeConfig(config);
    
    spinner.succeed(chalk.green("新增模板成功！"));
    
    // 打印当前配置信息
    console.log("\n当前模板配置：");
    console.log(chalk.cyan(JSON.stringify(config, null, 2)));

  } catch (error) {
    console.error(chalk.red("\n错误：" + error.message));
    process.exit(1);
  }
}

module.exports = load;