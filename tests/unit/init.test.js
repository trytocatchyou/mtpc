const inquirer = require('inquirer');
const download = require('download-git-repo');
const { exec } = require('child_process');
const init = require('../../lib/init');
const templates = require('../template-config.test.json', 'utf-8');
const testKey = Object.keys(templates)[0];

jest.mock('inquirer');
jest.mock('download-git-repo');
jest.mock('child_process');

describe('Project Initialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create project with valid inputs', async () => {
    inquirer.prompt.mockResolvedValueOnce({ template: testKey });
    inquirer.prompt.mockResolvedValueOnce({ projectName: 'test-project' });
    
    download.mockImplementation((repo, path, opts, callback) => callback(null));
    exec.mockImplementation((cmd, opts, callback) => callback(null));

    await init();

    expect(inquirer.prompt).toHaveBeenCalledTimes(2);
    expect(download).toHaveBeenCalledTimes(1);
    expect(exec).toHaveBeenCalledTimes(2);
  });

  test('should handle download errors', async () => {
    inquirer.prompt.mockResolvedValueOnce({ template: testKey });
    inquirer.prompt.mockResolvedValueOnce({ projectName: 'test-project' });
    
    download.mockImplementation((repo, path, opts, callback) => 
      callback(new Error('Download failed'))
    );

    await expect(init()).rejects.toThrow('Download failed');
  });
});
