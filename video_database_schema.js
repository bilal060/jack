/**
 * ASMR VIDEO DATABASE SCHEMA
 * MongoDB/PostgreSQL schema for storing video metadata
 */

const mongoose = require('mongoose');

// Video Schema
const videoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'soap play',
            'china clay', 
            'crunch sounds',
            'slime sounds',
            'paper sounds',
            'plastic sounds',
            'wood sounds',
            'metal sounds',
            'water sounds',
            'food sounds',
            'fabric sounds',
            'glass sounds'
        ],
        index: true
    },
    filename: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        enum: ['SD', 'HD', 'FHD', '4K'],
        default: 'HD'
    },
    size: {
        type: Number, // bytes
        required: true
    },
    duration: {
        type: String, // HH:MM:SS format
        required: true
    },
    resolution: {
        type: String, // WxH format
        required: true
    },
    downloadDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    metadata: {
        codec: String,
        bitrate: Number,
        fps: Number,
        audioCodec: String,
        audioBitrate: Number,
        audioChannels: Number
    },
    status: {
        type: String,
        enum: ['downloading', 'completed', 'failed', 'deleted'],
        default: 'completed'
    },
    views: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Download History Schema
const downloadHistorySchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    },
    category: {
        type: String,
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    action: {
        type: String,
        enum: ['download', 'delete', 'backup', 'restore'],
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'partial'],
        required: true
    },
    error: String,
    fileSize: Number,
    downloadTime: Number // milliseconds
}, {
    timestamps: true
});

// Category Statistics Schema
const categoryStatsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    totalVideos: {
        type: Number,
        default: 0
    },
    totalSize: {
        type: Number, // bytes
        default: 0
    },
    averageDuration: {
        type: Number, // seconds
        default: 0
    },
    lastDownload: {
        type: Date
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// System Statistics Schema
const systemStatsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    totalVideos: {
        type: Number,
        default: 0
    },
    totalDownloads: {
        type: Number,
        default: 0
    },
    totalSize: {
        type: Number, // bytes
        default: 0
    },
    storageUsed: {
        type: Number, // bytes
        default: 0
    },
    storageAvailable: {
        type: Number, // bytes
        default: 0
    },
    downloadSuccess: {
        type: Number,
        default: 0
    },
    downloadFailed: {
        type: Number,
        default: 0
    },
    categories: [{
        name: String,
        count: Number,
        size: Number
    }]
}, {
    timestamps: true
});

// Create indexes
videoSchema.index({ category: 1, downloadDate: -1 });
videoSchema.index({ tags: 1 });
videoSchema.index({ status: 1 });
videoSchema.index({ 'metadata.codec': 1 });

downloadHistorySchema.index({ timestamp: -1 });
downloadHistorySchema.index({ category: 1, timestamp: -1 });
downloadHistorySchema.index({ action: 1 });

categoryStatsSchema.index({ totalVideos: -1 });
categoryStatsSchema.index({ lastDownload: -1 });

systemStatsSchema.index({ date: -1 });

// Create models
const Video = mongoose.model('Video', videoSchema);
const DownloadHistory = mongoose.model('DownloadHistory', downloadHistorySchema);
const CategoryStats = mongoose.model('CategoryStats', categoryStatsSchema);
const SystemStats = mongoose.model('SystemStats', systemStatsSchema);

// PostgreSQL Schema (if using PostgreSQL)
const postgresSchema = `
-- Videos table
CREATE TABLE videos (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN (
        'soap play', 'china clay', 'crunch sounds', 'slime sounds',
        'paper sounds', 'plastic sounds', 'wood sounds', 'metal sounds',
        'water sounds', 'food sounds', 'fabric sounds', 'glass sounds'
    )),
    filename VARCHAR(500) NOT NULL,
    filepath TEXT NOT NULL,
    url TEXT NOT NULL,
    quality VARCHAR(10) DEFAULT 'HD' CHECK (quality IN ('SD', 'HD', 'FHD', '4K')),
    size BIGINT NOT NULL,
    duration VARCHAR(20) NOT NULL,
    resolution VARCHAR(20) NOT NULL,
    download_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tags TEXT[],
    metadata JSONB,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('downloading', 'completed', 'failed', 'deleted')),
    views INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Download history table
CREATE TABLE download_history (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(100) NOT NULL,
    video_id VARCHAR(255) REFERENCES videos(id),
    action VARCHAR(20) NOT NULL CHECK (action IN ('download', 'delete', 'backup', 'restore')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failed', 'partial')),
    error TEXT,
    file_size BIGINT,
    download_time INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Category statistics table
CREATE TABLE category_stats (
    category VARCHAR(100) PRIMARY KEY,
    total_videos INTEGER DEFAULT 0,
    total_size BIGINT DEFAULT 0,
    average_duration INTEGER DEFAULT 0,
    last_download TIMESTAMP,
    download_count INTEGER DEFAULT 0,
    average_rating DECIMAL(2,1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System statistics table
CREATE TABLE system_stats (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    total_videos INTEGER DEFAULT 0,
    total_downloads INTEGER DEFAULT 0,
    total_size BIGINT DEFAULT 0,
    storage_used BIGINT DEFAULT 0,
    storage_available BIGINT DEFAULT 0,
    download_success INTEGER DEFAULT 0,
    download_failed INTEGER DEFAULT 0,
    categories JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_videos_category_date ON videos(category, download_date DESC);
CREATE INDEX idx_videos_tags ON videos USING GIN(tags);
CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_videos_metadata ON videos USING GIN(metadata);

CREATE INDEX idx_download_history_timestamp ON download_history(timestamp DESC);
CREATE INDEX idx_download_history_category ON download_history(category, timestamp DESC);
CREATE INDEX idx_download_history_action ON download_history(action);

CREATE INDEX idx_category_stats_videos ON category_stats(total_videos DESC);
CREATE INDEX idx_category_stats_download ON category_stats(last_download DESC);

CREATE INDEX idx_system_stats_date ON system_stats(date DESC);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_category_stats_updated_at BEFORE UPDATE ON category_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`;

// SQLite Schema (for local development)
const sqliteSchema = `
-- Videos table
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'soap play', 'china clay', 'crunch sounds', 'slime sounds',
        'paper sounds', 'plastic sounds', 'wood sounds', 'metal sounds',
        'water sounds', 'food sounds', 'fabric sounds', 'glass sounds'
    )),
    filename TEXT NOT NULL,
    filepath TEXT NOT NULL,
    url TEXT NOT NULL,
    quality TEXT DEFAULT 'HD' CHECK (quality IN ('SD', 'HD', 'FHD', '4K')),
    size INTEGER NOT NULL,
    duration TEXT NOT NULL,
    resolution TEXT NOT NULL,
    download_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    tags TEXT,
    metadata TEXT,
    status TEXT DEFAULT 'completed' CHECK (status IN ('downloading', 'completed', 'failed', 'deleted')),
    views INTEGER DEFAULT 0,
    rating REAL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    is_favorite INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Download history table
CREATE TABLE download_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    category TEXT NOT NULL,
    video_id TEXT REFERENCES videos(id),
    action TEXT NOT NULL CHECK (action IN ('download', 'delete', 'backup', 'restore')),
    status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'partial')),
    error TEXT,
    file_size INTEGER,
    download_time INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Category statistics table
CREATE TABLE category_stats (
    category TEXT PRIMARY KEY,
    total_videos INTEGER DEFAULT 0,
    total_size INTEGER DEFAULT 0,
    average_duration INTEGER DEFAULT 0,
    last_download DATETIME,
    download_count INTEGER DEFAULT 0,
    average_rating REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- System statistics table
CREATE TABLE system_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE UNIQUE NOT NULL,
    total_videos INTEGER DEFAULT 0,
    total_downloads INTEGER DEFAULT 0,
    total_size INTEGER DEFAULT 0,
    storage_used INTEGER DEFAULT 0,
    storage_available INTEGER DEFAULT 0,
    download_success INTEGER DEFAULT 0,
    download_failed INTEGER DEFAULT 0,
    categories TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_videos_category_date ON videos(category, download_date DESC);
CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_download_history_timestamp ON download_history(timestamp DESC);
CREATE INDEX idx_download_history_category ON download_history(category, timestamp DESC);
CREATE INDEX idx_category_stats_videos ON category_stats(total_videos DESC);
CREATE INDEX idx_system_stats_date ON system_stats(date DESC);
`;

module.exports = {
    // Mongoose models
    Video,
    DownloadHistory,
    CategoryStats,
    SystemStats,
    
    // Schemas
    videoSchema,
    downloadHistorySchema,
    categoryStatsSchema,
    systemStatsSchema,
    
    // SQL schemas
    postgresSchema,
    sqliteSchema
}; 