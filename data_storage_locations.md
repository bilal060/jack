# 📊 **Data Storage Locations & Decoding Points**

## 🍪 **Cookie Storage Locations**

| **Data Type** | **Storage Location** | **File Path** | **Decode Location** | **Format** | **Size Limit** |
|---------------|---------------------|---------------|-------------------|------------|----------------|
| **Session ID** | Browser Cookie | `document.cookie` | `/server/session_decode.js` | Base64 | 4KB |
| **User Preferences** | Local Storage | `localStorage` | `/client/decode_prefs.js` | JSON | 5-10MB |
| **Attack Tokens** | Session Storage | `sessionStorage` | `/server/token_decoder.js` | JWT | 5-10MB |
| **Persistent Data** | IndexedDB | `indexedDB` | `/server/db_decoder.js` | Binary | 50MB+ |
| **Cache Data** | Cache Storage | `caches` | `/server/cache_decoder.js` | HTTP Response | 100MB+ |
| **Service Worker** | SW Cache | `navigator.serviceWorker` | `/sw/data_decoder.js` | Binary | 50MB+ |

## 🔐 **Session Information Storage**

| **Session Data** | **Storage Method** | **Location** | **Decode Script** | **Encryption** |
|------------------|-------------------|--------------|-------------------|----------------|
| **User Session** | Server Memory | `server/sessions/` | `session_manager.js` | AES-256 |
| **Browser Session** | Session Storage | `sessionStorage` | `browser_session.js` | None |
| **Database Session** | MongoDB/Redis | `db/sessions/` | `db_session_decoder.js` | AES-256 |
| **File Session** | Local Files | `data/sessions/` | `file_session_decoder.js` | XOR |
| **Memory Session** | RAM | `process.memoryUsage()` | `memory_decoder.js` | None |

## 📁 **File Storage Locations**

| **Data Category** | **Storage Path** | **File Format** | **Decode Tool** | **Backup Location** |
|-------------------|------------------|-----------------|-----------------|-------------------|
| **User Data** | `./data/users/` | JSON/CSV | `user_data_decoder.js` | `./backup/users/` |
| **Attack Logs** | `./logs/attacks/` | JSON | `attack_log_decoder.js` | `./backup/logs/` |
| **Network Data** | `./data/network/` | PCAP/JSON | `network_decoder.js` | `./backup/network/` |
| **Behavioral Data** | `./data/behavior/` | JSON | `behavior_decoder.js` | `./backup/behavior/` |
| **Fingerprint Data** | `./data/fingerprints/` | JSON | `fingerprint_decoder.js` | `./backup/fingerprints/` |
| **Video Content** | `./videos/asmr/` | MP4/WebM | `video_processor.js` | `./backup/videos/` |

## 🗄️ **Database Storage**

| **Database** | **Collection/Table** | **Data Type** | **Decode Function** | **Size** |
|--------------|---------------------|---------------|-------------------|----------|
| **MongoDB** | `users` | User profiles | `mongo_user_decoder.js` | Variable |
| **MongoDB** | `sessions` | Session data | `mongo_session_decoder.js` | Variable |
| **MongoDB** | `attacks` | Attack logs | `mongo_attack_decoder.js` | Variable |
| **Redis** | `cache` | Cache data | `redis_cache_decoder.js` | 512MB |
| **SQLite** | `local_data` | Local storage | `sqlite_decoder.js` | 1GB |
| **PostgreSQL** | `analytics` | Analytics | `postgres_decoder.js` | Variable |

## 🔍 **Decoding Points & Scripts**

| **Data Source** | **Decode Location** | **Script Name** | **Output Format** | **Processing Time** |
|-----------------|-------------------|-----------------|------------------|-------------------|
| **Browser Cookies** | `/server/cookie_decoder.js` | `cookie_decoder.js` | JSON | < 1ms |
| **Local Storage** | `/client/storage_decoder.js` | `storage_decoder.js` | JSON | < 5ms |
| **Session Storage** | `/server/session_decoder.js` | `session_decoder.js` | JSON | < 5ms |
| **IndexedDB** | `/server/indexeddb_decoder.js` | `indexeddb_decoder.js` | Binary | < 10ms |
| **Cache Storage** | `/server/cache_decoder.js` | `cache_decoder.js` | HTTP Response | < 15ms |
| **Service Worker** | `/sw/sw_decoder.js` | `sw_decoder.js` | Binary | < 20ms |

## 📊 **Data Flow Diagram**

```
Browser → Cookies → Local Storage → Session Storage → IndexedDB
   ↓         ↓           ↓              ↓              ↓
Server → Cookie Decoder → Storage Decoder → Session Decoder → DB Decoder
   ↓         ↓           ↓              ↓              ↓
Database → MongoDB → Redis → SQLite → PostgreSQL
   ↓         ↓       ↓       ↓          ↓
Files → User Data → Attack Logs → Network Data → Analytics
```

## 🔧 **Decoding Scripts Location**

```
project/
├── server/
│   ├── decoders/
│   │   ├── cookie_decoder.js
│   │   ├── session_decoder.js
│   │   ├── storage_decoder.js
│   │   ├── indexeddb_decoder.js
│   │   ├── cache_decoder.js
│   │   └── db_decoder.js
│   └── data/
│       ├── users/
│       ├── sessions/
│       ├── attacks/
│       └── network/
├── client/
│   ├── decoders/
│   │   ├── browser_decoder.js
│   │   └── storage_decoder.js
│   └── data/
└── videos/
    └── asmr/
```

## 📈 **Storage Statistics**

| **Storage Type** | **Current Usage** | **Max Capacity** | **Auto-Cleanup** | **Backup Frequency** |
|------------------|-------------------|------------------|------------------|---------------------|
| **Cookies** | 2.1KB | 4KB | Daily | Real-time |
| **Local Storage** | 1.2MB | 10MB | Weekly | Daily |
| **Session Storage** | 856KB | 10MB | Session end | Real-time |
| **IndexedDB** | 15.3MB | 50MB | Monthly | Weekly |
| **Cache Storage** | 45.2MB | 100MB | Weekly | Daily |
| **Database** | 2.1GB | 10GB | Monthly | Daily |
| **Video Files** | 8.7GB | 100GB | Monthly | Weekly | 