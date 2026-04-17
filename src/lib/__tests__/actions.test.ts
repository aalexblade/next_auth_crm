import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { deleteCompany } from '../actions';
import { auth } from '@auth';
import { revalidatePath } from 'next/cache';

// Mocking dependencies
vi.mock('@auth', () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mocking global fetch
global.fetch = vi.fn();

describe('deleteCompany', () => {
  const mockId = '123';
  const mockApiToken = 'test-token';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.API_TOKEN = mockApiToken;
  });

  describe('Unauthorized Scenario', () => {
    it('should prevent deletion and return unauthorized error if session is missing', async () => {
      // Arrange
      (auth as Mock).mockResolvedValue(null);

      // Act
      const result = await deleteCompany(mockId);

      // Assert
      expect(auth).toHaveBeenCalledTimes(1);
      expect(fetch).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
      expect(result).toEqual({ success: false, error: 'Unauthorized' });
    });
  });

  describe('Success Scenario', () => {
    it('should correctly call fetch and revalidatePath when session exists', async () => {
      // Arrange
      (auth as Mock).mockResolvedValue({ user: { id: 'user-1' } });
      (fetch as Mock).mockResolvedValue({
        ok: true,
      });

      // Act
      const result = await deleteCompany(mockId);

      // Assert
      expect(auth).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://${mockApiToken}.mockapi.io/api/v1/companies/${mockId}`,
        { method: 'DELETE' }
      );
      expect(revalidatePath).toHaveBeenCalledWith('/companies');
      expect(result).toEqual({ success: true });
    });
  });

  describe('Error Scenarios', () => {
    it('should return error if fetch fails (response not ok)', async () => {
      // Arrange
      (auth as Mock).mockResolvedValue({ user: { id: 'user-1' } });
      (fetch as Mock).mockResolvedValue({
        ok: false,
      });

      // Act
      const result = await deleteCompany(mockId);

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'Failed to delete company',
      });
      expect(revalidatePath).not.toHaveBeenCalled();
    });

    it('should return error if an unexpected exception occurs', async () => {
      // Arrange
      (auth as Mock).mockRejectedValue(new Error('Unexpected error'));

      // Act
      const result = await deleteCompany(mockId);

      // Assert
      expect(result).toEqual({
        success: false,
        error: 'Unexpected error',
      });
    });
  });
});
