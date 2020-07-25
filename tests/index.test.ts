import { mainTest } from '../src';

describe('Tests', () => {
	test('should pass', () => {
		expect(mainTest()).toBe('this builds and pushes');
	});
});
