import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import * as api from '../api';

// Mocking global fetch
global.fetch = vi.fn();

describe('api.ts (Data Fetching Functions)', () => {
  const mockApiToken = 'test-token';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.API_TOKEN = mockApiToken;
  });

  describe('getCompanies', () => {
    const mockCompanies: api.Company[] = [
      {
        id: '1',
        title: 'Company One',
        description: 'Desc 1',
        status: api.CompanyStatus.Active,
        joinedDate: '2023-01-01',
        hasPromotions: false,
        categoryId: 'cat-1',
        categoryTitle: 'Cat Title',
        countryId: 'country-1',
        countryTitle: 'Country Title',
      },
    ];

    it('should fetch companies successfully with default parameters', async () => {
      // Arrange
      (fetch as Mock).mockResolvedValue({
        ok: true,
        json: async () => mockCompanies,
      });

      // Act
      const result = await api.getCompanies();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        `https://${mockApiToken}.mockapi.io/api/v1/companies?`,
        undefined
      );
      expect(result).toEqual(mockCompanies);
    });

    it('should fetch companies with search and page parameters', async () => {
      // Arrange
      (fetch as Mock).mockResolvedValue({
        ok: true,
        json: async () => mockCompanies,
      });

      // Act
      await api.getCompanies({ search: 'query', page: 2, limit: 15 });

      // Assert
      const url = (fetch as Mock).mock.calls[0][0];
      expect(url).toContain('search=query');
      expect(url).toContain('page=2');
      expect(url).toContain('limit=15');
    });

    it('should throw an error when the backend API returns a non-ok status', async () => {
      // Arrange
      const errorMsg = 'Bad Request';
      (fetch as Mock).mockResolvedValue({
        ok: false,
        text: async () => errorMsg,
      });

      // Act & Assert
      await expect(api.getCompanies()).rejects.toThrow(errorMsg);
    });

    it('should handle network errors (fetch rejection)', async () => {
      // Arrange
      (fetch as Mock).mockRejectedValue(new Error('Network Error'));

      // Act & Assert
      await expect(api.getCompanies()).rejects.toThrow('Network Error');
    });
  });

  describe('getSummaryStats', () => {
    const mockStats: api.SummaryStats = {
      promotions: 5,
      categories: 3,
      newCompanies: 2,
      activeCompanies: 8,
    };

    it('should fetch summary stats successfully', async () => {
      // Arrange
      (fetch as Mock).mockResolvedValue({
        ok: true,
        json: async () => mockStats,
      });

      // Act
      const result = await api.getSummaryStats();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        `https://${mockApiToken}.mockapi.io/api/v1/summary-stats/1`,
        undefined
      );
      expect(result).toEqual(mockStats);
    });
  });
});
