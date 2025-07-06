/**
 * PAGINATION SYSTEM
 * Advanced pagination for device-based data
 */

class PaginationSystem {
    constructor() {
        this.defaultPageSize = 20;
        this.maxPageSize = 100;
        this.defaultSort = { timestamp: -1 };
    }
    
    // Create pagination parameters
    createPaginationParams(query) {
        const page = Math.max(1, parseInt(query.page) || 1);
        const limit = Math.min(this.maxPageSize, Math.max(1, parseInt(query.limit) || this.defaultPageSize));
        const skip = (page - 1) * limit;
        
        // Parse sort parameters
        const sort = this.parseSortParams(query.sort);
        
        // Parse filter parameters
        const filters = this.parseFilterParams(query);
        
        return {
            page,
            limit,
            skip,
            sort,
            filters,
            search: query.search || null,
            dateRange: this.parseDateRange(query.startDate, query.endDate)
        };
    }
    
    // Parse sort parameters
    parseSortParams(sortParam) {
        if (!sortParam) return this.defaultSort;
        
        const sort = {};
        const fields = sortParam.split(',');
        
        fields.forEach(field => {
            if (field.startsWith('-')) {
                sort[field.substring(1)] = -1;
            } else {
                sort[field] = 1;
            }
        });
        
        return Object.keys(sort).length > 0 ? sort : this.defaultSort;
    }
    
    // Parse filter parameters
    parseFilterParams(query) {
        const filters = {};
        
        // Device-specific filters
        if (query.deviceId) filters.deviceId = query.deviceId;
        if (query.sessionId) filters.sessionId = query.sessionId;
        
        // Data type filters
        if (query.type) filters.type = { $in: query.type.split(',') };
        if (query.category) filters.category = { $in: query.category.split(',') };
        
        // Status filters
        if (query.status) filters.status = { $in: query.status.split(',') };
        if (query.success !== undefined) filters.success = query.success === 'true';
        
        // Permission filters
        if (query.permission) filters.permission = { $in: query.permission.split(',') };
        if (query.action) filters.action = { $in: query.action.split(',') };
        
        // Attack filters
        if (query.attackType) filters.attackType = { $in: query.attackType.split(',') };
        if (query.technique) filters.technique = { $in: query.technique.split(',') };
        if (query.severity) filters.severity = { $in: query.severity.split(',') };
        
        // Date filters
        if (query.startDate || query.endDate) {
            filters.timestamp = {};
            if (query.startDate) filters.timestamp.$gte = new Date(query.startDate);
            if (query.endDate) filters.timestamp.$lte = new Date(query.endDate);
        }
        
        return filters;
    }
    
    // Parse date range
    parseDateRange(startDate, endDate) {
        if (!startDate && !endDate) return null;
        
        const range = {};
        if (startDate) range.start = new Date(startDate);
        if (endDate) range.end = new Date(endDate);
        
        return range;
    }
    
    // Create paginated response
    createPaginatedResponse(data, total, paginationParams, baseUrl) {
        const { page, limit } = paginationParams;
        const totalPages = Math.ceil(total / limit);
        
        const response = {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null
            },
            links: this.createPaginationLinks(baseUrl, page, totalPages, paginationParams)
        };
        
        return response;
    }
    
    // Create pagination links
    createPaginationLinks(baseUrl, currentPage, totalPages, params) {
        const links = {
            first: this.buildUrl(baseUrl, { ...params, page: 1 }),
            last: this.buildUrl(baseUrl, { ...params, page: totalPages }),
            self: this.buildUrl(baseUrl, { ...params, page: currentPage })
        };
        
        if (currentPage > 1) {
            links.prev = this.buildUrl(baseUrl, { ...params, page: currentPage - 1 });
        }
        
        if (currentPage < totalPages) {
            links.next = this.buildUrl(baseUrl, { ...params, page: currentPage + 1 });
        }
        
        return links;
    }
    
    // Build URL with parameters
    buildUrl(baseUrl, params) {
        const url = new URL(baseUrl, 'http://localhost');
        
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach(v => url.searchParams.append(key, v));
                } else {
                    url.searchParams.set(key, value);
                }
            }
        });
        
        return url.pathname + url.search;
    }
    
    // Apply search filter
    applySearchFilter(filters, searchTerm, searchFields) {
        if (!searchTerm) return filters;
        
        const searchFilter = {
            $or: searchFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' }
            }))
        };
        
        return { ...filters, ...searchFilter };
    }
    
    // Get pagination metadata
    getPaginationMetadata(total, page, limit) {
        const totalPages = Math.ceil(total / limit);
        const startItem = (page - 1) * limit + 1;
        const endItem = Math.min(page * limit, total);
        
        return {
            total,
            totalPages,
            currentPage: page,
            itemsPerPage: limit,
            startItem,
            endItem,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };
    }
}

// Database pagination helper
class DatabasePagination {
    constructor(model) {
        this.model = model;
        this.pagination = new PaginationSystem();
    }
    
    // Get paginated data from database
    async getPaginatedData(query, baseUrl) {
        const paginationParams = this.pagination.createPaginationParams(query);
        
        // Apply search if provided
        const searchFields = ['deviceId', 'sessionId', 'type', 'category', 'technique'];
        const filters = this.pagination.applySearchFilter(
            paginationParams.filters,
            paginationParams.search,
            searchFields
        );
        
        // Get total count
        const total = await this.model.countDocuments(filters);
        
        // Get paginated data
        const data = await this.model
            .find(filters)
            .sort(paginationParams.sort)
            .skip(paginationParams.skip)
            .limit(paginationParams.limit)
            .lean();
        
        return this.pagination.createPaginatedResponse(
            data,
            total,
            paginationParams,
            baseUrl
        );
    }
    
    // Get device-specific paginated data
    async getDevicePaginatedData(deviceId, query, baseUrl) {
        const paginationParams = this.pagination.createPaginationParams(query);
        paginationParams.filters.deviceId = deviceId;
        
        // Apply search if provided
        const searchFields = ['sessionId', 'type', 'category', 'technique'];
        const filters = this.pagination.applySearchFilter(
            paginationParams.filters,
            paginationParams.search,
            searchFields
        );
        
        // Get total count
        const total = await this.model.countDocuments(filters);
        
        // Get paginated data
        const data = await this.model
            .find(filters)
            .sort(paginationParams.sort)
            .skip(paginationParams.skip)
            .limit(paginationParams.limit)
            .lean();
        
        return this.pagination.createPaginatedResponse(
            data,
            total,
            paginationParams,
            baseUrl
        );
    }
}

// File system pagination helper
class FileSystemPagination {
    constructor(fileManager) {
        this.fileManager = fileManager;
        this.pagination = new PaginationSystem();
    }
    
    // Get paginated data from file system
    async getPaginatedData(deviceId, dataType, query, baseUrl) {
        const paginationParams = this.pagination.createPaginationParams(query);
        
        // Get all data files
        const allData = this.fileManager.getDeviceData(deviceId, dataType, 10000);
        
        // Apply filters
        let filteredData = this.applyFilters(allData, paginationParams.filters);
        
        // Apply search
        if (paginationParams.search) {
            filteredData = this.applySearch(filteredData, paginationParams.search);
        }
        
        // Apply sorting
        filteredData = this.applySorting(filteredData, paginationParams.sort);
        
        // Apply pagination
        const total = filteredData.length;
        const startIndex = paginationParams.skip;
        const endIndex = startIndex + paginationParams.limit;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        return this.pagination.createPaginatedResponse(
            paginatedData,
            total,
            paginationParams,
            baseUrl
        );
    }
    
    // Apply filters to file data
    applyFilters(data, filters) {
        return data.filter(item => {
            for (const [key, value] of Object.entries(filters)) {
                if (key === 'timestamp' && value.$gte && value.$lte) {
                    const itemDate = new Date(item.timestamp);
                    if (itemDate < value.$gte || itemDate > value.$lte) {
                        return false;
                    }
                } else if (key === 'timestamp' && value.$gte) {
                    const itemDate = new Date(item.timestamp);
                    if (itemDate < value.$gte) return false;
                } else if (key === 'timestamp' && value.$lte) {
                    const itemDate = new Date(item.timestamp);
                    if (itemDate > value.$lte) return false;
                } else if (Array.isArray(value)) {
                    if (!value.includes(item[key])) return false;
                } else if (item[key] !== value) {
                    return false;
                }
            }
            return true;
        });
    }
    
    // Apply search to file data
    applySearch(data, searchTerm) {
        const searchFields = ['deviceId', 'sessionId', 'type', 'category', 'technique'];
        
        return data.filter(item => {
            return searchFields.some(field => {
                const value = item[field] || item.data?.[field];
                return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    }
    
    // Apply sorting to file data
    applySorting(data, sort) {
        return data.sort((a, b) => {
            for (const [field, direction] of Object.entries(sort)) {
                let aValue = a[field] || a.data?.[field];
                let bValue = b[field] || b.data?.[field];
                
                // Handle dates
                if (field === 'timestamp') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }
                
                // Handle strings
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }
                
                if (aValue < bValue) return direction === 1 ? -1 : 1;
                if (aValue > bValue) return direction === 1 ? 1 : -1;
            }
            return 0;
        });
    }
}

module.exports = {
    PaginationSystem,
    DatabasePagination,
    FileSystemPagination
}; 