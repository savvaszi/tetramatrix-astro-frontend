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
// Translation type helper
export interface Translation {
  languages_code: string;
  [key: string]: unknown;
}

export interface Service {
  id: string;
  status: string;
  sort: number;
  title: string;
  description: string;
  slug: string;
  icon?: string;
  features?: string[];
  translations?: Translation[];
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

// Case Studies Types
export interface CaseStudy {
  id: string;
  status: string;
  sort: number;
  name: string;
  slug: string;
  url?: string;
  type?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
  features?: string[];
  featured_image?: string | { id: string };
  screenshots?: Array<{ directus_files_id: string | { id: string } }>;
  translations?: Translation[];
}

// Case Studies API Functions
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    return await fetchDirectus<CaseStudy[]>('case_studies?filter[status][_eq]=published&sort=sort&fields=*,featured_image.*,screenshots.directus_files_id.*');
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const results = await fetchDirectus<CaseStudy[]>(`case_studies?filter[status][_eq]=published&filter[slug][_eq]=${slug}&fields=*,featured_image.*,screenshots.directus_files_id.*`);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const results = await fetchDirectus<CaseStudy[]>('case_studies?filter[status][_eq]=published&fields=slug');
    return results.map(cs => cs.slug);
  } catch (error) {
    console.error('Error fetching case study slugs:', error);
    return [];
  }
}

// Helper to extract file ID from Directus file object
export function getFileId(file: string | { id: string } | undefined): string | undefined {
  if (!file) return undefined;
  if (typeof file === 'string') return file;
  return file.id;
}

// Tetrapos Types
export interface TetraposPage {
  id: string;
  hero_title: string;
  hero_subtitle?: string;
  hero_badge?: string;
  hero_image?: string | { id: string };
  cta_title?: string;
  cta_description?: string;
  translations?: Translation[];
}

export interface TetraposFeature {
  id: string;
  status: string;
  sort: number;
  category: 'core' | 'restaurant' | 'stock' | 'modes' | 'additional';
  title: string;
  description?: string;
  icon?: string;
  translations?: Translation[];
}

export interface TetraposScreenshot {
  id: string;
  sort: number;
  title?: string;
  image: string | { id: string };
}

// Tetrapos API Functions
export async function getTetraposPage(): Promise<TetraposPage | null> {
  try {
    return await fetchDirectus<TetraposPage>('tetrapos?fields=*,hero_image.*');
  } catch (error) {
    console.error('Error fetching tetrapos page:', error);
    return null;
  }
}

export async function getTetraposFeatures(category?: string): Promise<TetraposFeature[]> {
  try {
    let endpoint = 'tetrapos_features?filter[status][_eq]=published&sort=sort';
    if (category) {
      endpoint += `&filter[category][_eq]=${category}`;
    }
    return await fetchDirectus<TetraposFeature[]>(endpoint);
  } catch (error) {
    console.error('Error fetching tetrapos features:', error);
    return [];
  }
}

export async function getTetraposScreenshots(): Promise<TetraposScreenshot[]> {
  try {
    return await fetchDirectus<TetraposScreenshot[]>('tetrapos_screenshots?sort=sort&fields=*,image.*');
  } catch (error) {
    console.error('Error fetching tetrapos screenshots:', error);
    return [];
  }
}

// Translation helper - extracts translated content for a specific language
export function getTranslation<T extends { translations?: Array<{ languages_code: string } & Record<string, unknown>> }>(
  item: T,
  lang: string,
  fields: string[]
): Partial<T> {
  if (!item.translations || lang === 'en') {
    return item;
  }
  
  const translation = item.translations.find(t => t.languages_code === lang);
  if (!translation) {
    return item;
  }
  
  const result: Record<string, unknown> = { ...item };
  for (const field of fields) {
    if (translation[field] !== undefined && translation[field] !== null && translation[field] !== '') {
      result[field] = translation[field];
    }
  }
  return result as Partial<T>;
}

// Fetch services with translations
export async function getServicesWithTranslations(lang: string = 'en'): Promise<Service[]> {
  try {
    const services = await fetchDirectus<Service[]>('services?filter[status][_eq]=published&sort=sort&fields=*,translations.*');
    return services.map(service => getTranslation(service, lang, ['title', 'description', 'features']) as Service);
  } catch (error) {
    console.error('Error fetching services with translations:', error);
    return [];
  }
}

// Fetch case studies with translations
export async function getCaseStudiesWithTranslations(lang: string = 'en'): Promise<CaseStudy[]> {
  try {
    const caseStudies = await fetchDirectus<CaseStudy[]>('case_studies?filter[status][_eq]=published&sort=sort&fields=*,featured_image.*,screenshots.*,translations.*');
    return caseStudies.map(cs => getTranslation(cs, lang, ['name', 'type', 'description', 'challenge', 'solution']) as CaseStudy);
  } catch (error) {
    console.error('Error fetching case studies with translations:', error);
    return [];
  }
}

// Fetch Tetrapos page with translations
export async function getTetraposPageWithTranslations(lang: string = 'en'): Promise<TetraposPage | null> {
  try {
    const page = await fetchDirectus<TetraposPage>('tetrapos?fields=*,hero_image.*,translations.*');
    return getTranslation(page, lang, ['hero_title', 'hero_subtitle', 'hero_badge', 'cta_title', 'cta_description']) as TetraposPage;
  } catch (error) {
    console.error('Error fetching tetrapos page with translations:', error);
    return null;
  }
}

// Fetch Tetrapos features with translations
export async function getTetraposFeaturesWithTranslations(category?: string, lang: string = 'en'): Promise<TetraposFeature[]> {
  try {
    let endpoint = 'tetrapos_features?filter[status][_eq]=published&sort=sort&fields=*,translations.*';
    if (category) {
      endpoint += `&filter[category][_eq]=${category}`;
    }
    const features = await fetchDirectus<TetraposFeature[]>(endpoint);
    return features.map(f => getTranslation(f, lang, ['title', 'description']) as TetraposFeature);
  } catch (error) {
    console.error('Error fetching tetrapos features with translations:', error);
    return [];
  }
}
