/**
 * API Client for AdminJS Backend
 */

class ApiClient {
    constructor(baseUrl = '/admin/api') {
        this.baseUrl = baseUrl;
    }

    // Get auth token from storage
    getToken() {
        return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    }

    // Get headers with auth
    getHeaders(contentType) {
        const headers = {
            'Accept': 'application/json'
        };
        // Only set Content-Type if explicitly provided (e.g. for POST/PUT)
        if (contentType && contentType !== 'multipart/form-data') {
            headers['Content-Type'] = contentType;
        }
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    // Generic fetch wrapper
    async request(url, options = {}) {
        const defaultOptions = {
            headers: this.getHeaders(options.contentType),
            credentials: 'include'
        };

        // Remove contentType from options before merging
        const { contentType, ...restOptions } = options;
        const fetchOptions = { ...defaultOptions, ...restOptions };

        // If body is FormData, remove Content-Type to let browser set it
        if (options.body instanceof FormData) {
            delete fetchOptions.headers['Content-Type'];
        }

        try {
            const response = await fetch(url, fetchOptions);

            // Handle unauthorized status specifically
            if (response.status === 401) {
                console.warn('API Unauthorized (401), redirecting to login...');
                this.handleUnauthorized();
                throw new Error('Unauthorized');
            }

            // Detect if we were redirected to the login page (likely a session timeout or invalid login)
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                // If it's HTML, we likely hit a redirect or error page
                if (response.url.includes('/login') || response.url.endsWith('.html')) {
                    console.warn('API Request redirected to HTML page. Session might be invalid.');
                    this.handleUnauthorized();
                    throw new Error('Session expired or invalid login. Redirecting to login page...');
                }
            }

            // Handle other HTTP errors
            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    // Not JSON, use generic status message
                }
                throw new Error(errorMessage);
            }

            // Safely parse JSON
            const text = await response.text();
            try {
                return JSON.parse(text);
            } catch (error) {
                console.error('Failed to parse JSON response:', text.substring(0, 100) + '...');
                throw new Error('Invalid JSON response from server. It might be an HTML error page.');
            }
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Handle unauthorized response
    handleUnauthorized() {
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        sessionStorage.removeItem('adminUser');
        // Redirect to the unified login route
        window.location.href = '/admin/login';
    }

    // === CRUD Operations ===

    // List records with pagination
    async list(resource, options = {}) {
        const { page = 1, perPage = 10, sortBy, direction, filters = {} } = options;

        const params = new URLSearchParams({
            page: page.toString(),
            perPage: perPage.toString()
        });

        if (sortBy) {
            params.append('sortBy', sortBy);
            params.append('direction', direction || 'asc');
        }

        // Add filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.append(`filters.${key}`, value);
            }
        });

        const url = `${this.baseUrl}/resources/${resource}/actions/list?${params}`;
        return this.request(url);
    }

    // Get single record
    async show(resource, id) {
        const url = `${this.baseUrl}/resources/${resource}/records/${id}/show`;
        return this.request(url);
    }

    // Create new record (Always use FormData for AdminJS Compatibility)
    async create(resource, data) {
        const url = `${this.baseUrl}/resources/${resource}/actions/new`;
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof FileList) {
                Array.from(value).forEach(file => formData.append(key, file));
            } else if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        return this.request(url, {
            method: 'POST',
            body: formData,
            contentType: 'multipart/form-data'
        });
    }

    // Update record (Always use FormData for AdminJS Compatibility)
    async update(resource, id, data) {
        const url = `${this.baseUrl}/resources/${resource}/records/${id}/edit`;
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof FileList) {
                Array.from(value).forEach(file => formData.append(key, file));
            } else if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        return this.request(url, {
            method: 'POST',
            body: formData,
            contentType: 'multipart/form-data'
        });
    }

    // Delete record (AdminJS expects POST for deletion)
    async delete(resource, id) {
        const url = `${this.baseUrl}/resources/${resource}/records/${id}/delete`;
        return this.request(url, {
            method: 'POST'
        });
    }

    // Bulk delete (Standard AdminJS bulk action)
    async bulkDelete(resource, ids) {
        // AdminJS reads recordIds from query params, not request body
        const params = new URLSearchParams();
        ids.forEach(id => params.append('recordIds', id));
        const url = `${this.baseUrl}/resources/${resource}/bulk/bulkDelete?${params}`;

        return this.request(url, {
            method: 'POST'
        });
    }

    // Search records (Standard AdminJS search action)
    async search(resource, query, options = {}) {
        const params = new URLSearchParams({
            query: query,
            ...options
        });
        const url = `${this.baseUrl}/resources/${resource}/actions/search?${params}`;
        return this.request(url);
    }

    // Get reference options (for dropdowns)
    async getReferenceOptions(resource) {
        try {
            const result = await this.list(resource, { perPage: 100 });
            return result.records || [];
        } catch (error) {
            console.error(`Error fetching reference options for ${resource}:`, error);
            return [];
        }
    }

    // === Auth Operations ===

    async login(username, password) {
        const url = `${this.baseUrl}/login`;
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    }

    async logout() {
        const url = `${this.baseUrl}/logout`;
        try {
            await this.request(url, { method: 'POST' });
        } catch (e) {
            // Ignore errors on logout
        }
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        sessionStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
    }

    // === Dashboard Stats ===

    async getDashboardStats() {
        const url = `${this.baseUrl}/dashboard`;
        return this.request(url);
    }
}

// Create singleton instance
const apiClient = new ApiClient();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ApiClient, apiClient };
}
