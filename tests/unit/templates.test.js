const templates = require('../template-config.test.json', 'utf-8');

describe('Templates Configuration', () => {
  test('should have valid template configurations', () => {
    Object.entries(templates).forEach(([key, template]) => {
      expect(template).toHaveProperty('name');
      expect(template).toHaveProperty('repo');
      expect(typeof template.name).toBe('string');
      expect(typeof template.repo).toBe('string');
      expect(template.repo).toMatch(/^direct:https:\/\/github.com\//);
    });
  });

  test('should have unique template names', () => {
    const names = Object.values(templates).map(t => t.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });
});