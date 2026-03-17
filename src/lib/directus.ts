const DIRECTUS_URL = import.meta.env.DIRECTUS_URL || 'https://strapi.tetramatrix.com.cy';
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN;

interface DirectusResponse<T> {
  data: T;
}

async function fetchDirectus<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (DIRECTUS_TOKEN) {
    headers['Authorization'] = `Bearer ${DIRECTUS_TOKEN}`;
  }

  const response = await fetch(`${DIRECTUS_URL}/items/${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Directus API error: ${response.status} ${response.statusText}`);
  }

  const json: DirectusResponse<T> = await response.json();
  return json.data;
}

// Types
export interface Service {
  id: string;
  status: string;
  sort: number;
  title: string;
  description: string;
  slug: string;
  icon?: string;
  features?: string[];
}

export interface TeamMember {
  id: string;
  status: string;
  sort: number;
  name: string;
  role: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  photo?: string;
}

export interface Stat {
  id: string;
  sort: number;
  value: string;
  label: string;
}

export interface Milestone {
  id: string;
  sort: number;
  year: string;
  title: string;
  description?: string;
}

export interface Homepage {
  id: string;
  hero_title: string;
  hero_subtitle?: string;
  hero_button_text?: string;
  hero_button_link?: string;
}

export interface CompanyInfo {
  id: string;
  company_name: string;
  phone?: string;
  email?: string;
  address?: string;
  about_text?: string;
  mission?: string;
  vision?: string;
}

// API Functions
export async function getServices(): Promise<Service[]> {
  try {
    return await fetchDirectus<Service[]>('services?filter[status][_eq]=published&sort=sort');
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    return await fetchDirectus<TeamMember[]>('team_members?filter[status][_eq]=published&sort=sort&fields=*,photo.*');
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getStats(): Promise<Stat[]> {
  try {
    return await fetchDirectus<Stat[]>('stats?sort=sort');
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}

export async function getMilestones(): Promise<Milestone[]> {
  try {
    return await fetchDirectus<Milestone[]>('milestones?sort=sort');
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return [];
  }
}

export async function getHomepage(): Promise<Homepage | null> {
  try {
    return await fetchDirectus<Homepage>('homepage');
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    return await fetchDirectus<CompanyInfo>('company_info');
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
}

// Helper to get image URL
export function getImageUrl(fileId: string | undefined): string {
  if (!fileId) return '';
  return `${DIRECTUS_URL}/assets/${fileId}`;
}
