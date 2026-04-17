export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  sold: number;
  income: number;
}

export interface Country {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
}

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

const buildUrl = (...paths: string[]) =>
  `https://${process.env.API_TOKEN}.mockapi.io/api/v1/${paths.join('/')}`;

const stringifyQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
};

export const getSummaryStats = (init?: RequestInit) => {
  return sendRequest<SummaryStats>(buildUrl('summary-stats', '1'), init);
};

export const getSummarySales = (init?: RequestInit) => {
  return sendRequest<SummarySales[]>(buildUrl('summary-sales'), init);
};

export const getCountries = (init?: RequestInit) => {
  return sendRequest<Country[]>(buildUrl('countries'), init);
};

export const getCategories = (init?: RequestInit) => {
  return sendRequest<Category[]>(buildUrl('categories'), init);
};

const PAGE_SIZE = 10;

export { PAGE_SIZE };

export const getCompanies = (
  {
    search,
    page,
    limit,
    ...params
  }: {
    search?: string;
    page?: number;
    limit?: number;
  } & Record<string, any> = {},
  init?: RequestInit,
) => {
  const queryParams: Record<string, string> = { ...params };
  if (search) queryParams.search = search;
  if (page) queryParams.page = String(page);
  if (limit) queryParams.limit = String(limit);

  return sendRequest<Company[]>(
    `${buildUrl('companies')}?${stringifyQueryParams(queryParams)}`,
    init,
  );
};

export const getCompany = (id: string, init?: RequestInit) => {
  return sendRequest<Company>(buildUrl('companies', id), init);
};

export const getPromotions = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  return sendRequest<Promotion[]>(
    `${buildUrl('promotions')}?${stringifyQueryParams(params)}`,
    init,
  );
};

export const createCompany = async (
  data: Omit<Company, 'id' | 'hasPromotions'>,
  init?: RequestInit,
) => {
  return sendRequest<Company>(buildUrl('companies'), {
    ...init,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};

export const createPromotion = async (
  data: Omit<Promotion, 'id'>,
  init?: RequestInit,
) => {
  return sendRequest<Promotion>(buildUrl('promotions'), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};
