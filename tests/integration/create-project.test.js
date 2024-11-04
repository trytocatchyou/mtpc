const path = require('path');
const mockFs = require('mock-fs');
const nock = require('nock');
const { execSync } = require('child_process');
const templates = require('../template-config.test.json', 'utf-8');
const testKey = Object.keys(templates)[0];

describe('Project Creation Integration', () => {
  const testDir = path.join(process.cwd(), 'test-project');

  beforeAll(() => {
    // Mock filesystem
    mockFs({
      [testDir]: {}
    });

    // Mock GitHub API
    nock('https://github.com')
      .get('/vuejs/vue.git')
      .reply(200, 'mock template content');
  });

  afterAll(() => {
    mockFs.restore();
    nock.cleanAll();
  });

  test('should create complete project structure', async () => {
    // Simulate CLI execution
    const cli = path.join(__dirname, '../../bin/mtpc.js');
    
    // Mock user input
    const input = testKey;
    
    try {
      execSync(`node ${cli} init`, { 
        input: Buffer.from(input),
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Verify project structure
      expect(fs.existsSync(path.join(testDir, 'package.json'))).toBe(true);
      expect(fs.existsSync(path.join(testDir, '.git'))).toBe(true);
      expect(fs.existsSync(path.join(testDir, 'node_modules'))).toBe(true);
    } catch (error) {
      throw error;
    }
  });
});