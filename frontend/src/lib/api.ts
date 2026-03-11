import { API_BASE_URL } from "../config/api";

export type Category = {
    key: string;
    label: string;
};

export type Resource = {
    id: number;
    name: string;
    address?: string | null;
    phone?: string | null;
    description?: string | null;
    website?: string | null;
    category: string;
    subcategory?: string | null;
    tags?: string[];
};

// resource list helper
export async function getResourcesByCategory(category: string): Promise<Resource[]>
{
    const url = new URL(`${API_BASE_URL}/api/resources/`);
    url.searchParams.set("category", category);

    const response = await fetch(url.toString());

    if (!response.ok)
    {
        throw new Error(`Failed to fetch resources: ${response.status}`);
    }

    return await response.json();
}

// new helper
export async function getResourcesByCategoryAndSubcategory(
    category: string,
    subcategory: string
): Promise<Resource[]>
{
    const url = new URL(`${API_BASE_URL}/api/resources/`);
    url.searchParams.set("category", category);
    url.searchParams.set("subcategory", subcategory);

    const response = await fetch(url.toString());

    if (!response.ok)
    {
        throw new Error(`Failed to fetch resources: ${response.status}`);
    }

    return await response.json();
}

// category helper
export async function getCategories(): Promise<Category[]>
{
    const response = await fetch(`${API_BASE_URL}/api/categories/`);

    if (!response.ok)
    {
        throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

// ID helper
export async function getResourceById(id: string): Promise<Resource>
{
    const response = await fetch(`${API_BASE_URL}/api/resources/${id}/`);

    if (!response.ok)
    {
        throw new Error(`Failed to fetch resource: ${response.status}`);
    }

    return await response.json();
}

// search helper
export async function searchResources(query: string): Promise<Resource[]>
{
    const url = new URL(`${API_BASE_URL}/api/resources/`);
    url.searchParams.set("search", query);

    const response = await fetch(url.toString());

    if (!response.ok)
    {
        throw new Error(`Failed to search resources: ${response.status}`);
    }

    return await response.json();
}
