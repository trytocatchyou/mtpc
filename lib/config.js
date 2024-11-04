// lib/config.js
const os = require('os');
const path = require('path');
const fs = require('fs/promises');

// 配置文件目录和路径
const CONFIG_DIR = path.join(os.homedir(), '.mtpc');
const CONFIG_PATH = path.join(CONFIG_DIR, 'template-config.json');

/**
 * 确保配置目录存在
 */
async function ensureConfigDir() {
  try {
    await fs.access(CONFIG_DIR);
  } catch {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
  }
}

/**
 * 读取模板配置
 */
async function readConfig() {
  try {
    await ensureConfigDir();
    const content = await fs.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    // 如果文件不存在或解析失败，返回空对象
    return {};
  }
}

/**
 * 写入模板配置
 */
async function writeConfig(config) {
  await ensureConfigDir();
  await fs.writeFile(
    CONFIG_PATH,
    JSON.stringify(config, null, 2),
    'utf8'
  );
}

module.exports = {
  CONFIG_PATH,
  readConfig,
  writeConfig
};