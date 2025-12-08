import { authService } from '../app/api/authService';

global.fetch = jest.fn();

describe('useUserProfile API', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should call correct API endpoint', async () => {
    const mockProfile = { id: 1, name: 'John', email: 'john@test.com' };
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => mockProfile,
    });

    const result = await authService.getUserProfile('123');
    
    expect(global.fetch).toHaveBeenCalledWith('https://responserift.dev/api/users/123');
    expect(result).toEqual(mockProfile);
  });

  it('should handle different user IDs', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ id: 2 }),
    });

    await authService.getUserProfile('456');
    
    expect(global.fetch).toHaveBeenCalledWith('https://responserift.dev/api/users/456');
  });
});
