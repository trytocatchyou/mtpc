const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
const path = require("path");
const { promisify } = require("util");
const download = require("download-git-repo");
const { exec } = require("child_process");
const { readConfig } = require("./config");
const execPromise = promisify(exec);
const execDownload = promisify(download);
const fs = require("fs");

async function init() {
  try {
    // 读取模板配置
    const templates = await readConfig();

    // 检查是否有可用模板
    if (Object.keys(templates).length === 0) {
      throw new Error("没有可用的项目模板，请先使用 load 命令添加模板");
    }

    // 选择模板
    const { template } = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "请选择项目模板:",
        choices: Object.entries(templates).map(([key, value]) => ({
          name: `${value.name} (${key})`,
          value: key,
        })),
      },
    ]);

    // 2. 输入项目名称
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称:",
        validate: (input) => {
          if (!input) {
            return "项目名称不能为空";
          }
          // 检查项目目录是否已存在
          if (fs.existsSync(path.join(process.cwd(), input))) {
            return "项目目录已存在，请选择其他名称";
          }
          return true;
        },
      },
    ]);

    // 显示加载动画
    const spinner = ora("正在下载项目模板...").start();

    // 3. 下载模板
    const { repo, branch } = templates[template];
    const targetPath = path.join(process.cwd(), projectName);
    await execDownload(`direct:${repo}#${branch}`, targetPath, { clone: true });

    // 4. 安装依赖
    spinner.text = "安装项目依赖...";
    await execPromise("npm install", { cwd: targetPath }).catch((error) => {
      console.error(chalk.red(error.message));
      spinner.fail(chalk.red("依赖安装失败"));
    });

    // 完成
    spinner.succeed(chalk.green("项目创建成功！"));
  } catch (error) {
    console.error(chalk.red("\n错误：" + error));
    process.exit(1);
  }
}

module.exports = init;
