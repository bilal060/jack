"""
Telegram Session Analysis - Educational Purposes Only
Understanding how Telegram manages sessions and potential vulnerabilities
"""

import json
import time
from typing import Dict, List, Optional

class TelegramSessionAnalyzer:
    """
    Educational class for analyzing Telegram session management
    """
    
    def __init__(self):
        self.session_data = {}
        self.vulnerabilities = []
        self.security_features = []
    
    def analyze_telegram_web_session(self, session_data: Dict) -> Dict:
        """
        Analyze Telegram Web session structure
        """
        analysis = {
            'session_components': {
                'cookies': self.analyze_cookies(session_data.get('cookies', [])),
                'local_storage': self.analyze_local_storage(session_data.get('localStorage', {})),
                'session_storage': self.analyze_session_storage(session_data.get('sessionStorage', {})),
                'headers': self.analyze_headers(session_data.get('headers', {}))
            },
            'security_features': self.identify_security_features(session_data),
            'potential_vulnerabilities': self.identify_vulnerabilities(session_data),
            'session_lifecycle': self.analyze_session_lifecycle(session_data)
        }
        
        return analysis
    
    def analyze_cookies(self, cookies: List) -> Dict:
        """
        Analyze session cookies
        """
        cookie_analysis = {
            'total_cookies': len(cookies),
            'secure_cookies': 0,
            'httponly_cookies': 0,
            'session_cookies': 0,
            'authentication_cookies': 0,
            'cookie_details': []
        }
        
        for cookie in cookies:
            cookie_info = {
                'name': cookie.get('name', ''),
                'value': cookie.get('value', '')[:10] + '...' if len(cookie.get('value', '')) > 10 else cookie.get('value', ''),
                'domain': cookie.get('domain', ''),
                'path': cookie.get('path', ''),
                'secure': cookie.get('secure', False),
                'httpOnly': cookie.get('httpOnly', False),
                'expires': cookie.get('expires', ''),
                'sameSite': cookie.get('sameSite', '')
            }
            
            cookie_analysis['cookie_details'].append(cookie_info)
            
            if cookie_info['secure']:
                cookie_analysis['secure_cookies'] += 1
            
            if cookie_info['httpOnly']:
                cookie_analysis['httponly_cookies'] += 1
            
            # Identify session-related cookies
            if 'session' in cookie_info['name'].lower():
                cookie_analysis['session_cookies'] += 1
            
            if 'auth' in cookie_info['name'].lower() or 'token' in cookie_info['name'].lower():
                cookie_analysis['authentication_cookies'] += 1
        
        return cookie_analysis
    
    def analyze_local_storage(self, local_storage: Dict) -> Dict:
        """
        Analyze localStorage data
        """
        storage_analysis = {
            'total_items': len(local_storage),
            'sensitive_data': [],
            'session_data': [],
            'user_preferences': [],
            'other_data': []
        }
        
        for key, value in local_storage.items():
            item_info = {
                'key': key,
                'value_type': type(value).__name__,
                'value_length': len(str(value)) if value else 0,
                'sensitive': self.is_sensitive_data(key, value)
            }
            
            if item_info['sensitive']:
                storage_analysis['sensitive_data'].append(item_info)
            elif 'session' in key.lower() or 'auth' in key.lower():
                storage_analysis['session_data'].append(item_info)
            elif 'pref' in key.lower() or 'setting' in key.lower():
                storage_analysis['user_preferences'].append(item_info)
            else:
                storage_analysis['other_data'].append(item_info)
        
        return storage_analysis
    
    def analyze_session_storage(self, session_storage: Dict) -> Dict:
        """
        Analyze sessionStorage data
        """
        return self.analyze_local_storage(session_storage)  # Similar analysis
    
    def analyze_headers(self, headers: Dict) -> Dict:
        """
        Analyze HTTP headers
        """
        header_analysis = {
            'security_headers': {},
            'authentication_headers': {},
            'other_headers': {},
            'missing_security_headers': []
        }
        
        security_headers = [
            'X-Frame-Options',
            'X-Content-Type-Options',
            'X-XSS-Protection',
            'Content-Security-Policy',
            'Strict-Transport-Security',
            'Referrer-Policy'
        ]
        
        for header, value in headers.items():
            if header in security_headers:
                header_analysis['security_headers'][header] = value
            elif 'auth' in header.lower() or 'token' in header.lower():
                header_analysis['authentication_headers'][header] = value
            else:
                header_analysis['other_headers'][header] = value
        
        # Check for missing security headers
        for security_header in security_headers:
            if security_header not in headers:
                header_analysis['missing_security_headers'].append(security_header)
        
        return header_analysis
    
    def identify_security_features(self, session_data: Dict) -> List[str]:
        """
        Identify security features in the session
        """
        security_features = []
        
        # Check for HTTPS
        if session_data.get('url', '').startswith('https://'):
            security_features.append('HTTPS Enabled')
        
        # Check for secure cookies
        cookies = session_data.get('cookies', [])
        secure_cookies = [c for c in cookies if c.get('secure', False)]
        if secure_cookies:
            security_features.append(f'Secure Cookies ({len(secure_cookies)} found)')
        
        # Check for HttpOnly cookies
        httponly_cookies = [c for c in cookies if c.get('httpOnly', False)]
        if httponly_cookies:
            security_features.append(f'HttpOnly Cookies ({len(httponly_cookies)} found)')
        
        # Check for security headers
        headers = session_data.get('headers', {})
        if 'X-Frame-Options' in headers:
            security_features.append('X-Frame-Options Header')
        if 'Content-Security-Policy' in headers:
            security_features.append('Content Security Policy')
        if 'Strict-Transport-Security' in headers:
            security_features.append('HSTS Header')
        
        return security_features
    
    def identify_vulnerabilities(self, session_data: Dict) -> List[Dict]:
        """
        Identify potential vulnerabilities
        """
        vulnerabilities = []
        
        # Check for HTTP (non-HTTPS)
        if not session_data.get('url', '').startswith('https://'):
            vulnerabilities.append({
                'type': 'Insecure Protocol',
                'severity': 'High',
                'description': 'Session transmitted over HTTP instead of HTTPS',
                'recommendation': 'Always use HTTPS for session management'
            })
        
        # Check for missing secure flags on cookies
        cookies = session_data.get('cookies', [])
        non_secure_cookies = [c for c in cookies if not c.get('secure', False) and c.get('name', '').lower() in ['session', 'auth', 'token']]
        if non_secure_cookies:
            vulnerabilities.append({
                'type': 'Insecure Cookies',
                'severity': 'Medium',
                'description': f'Found {len(non_secure_cookies)} authentication cookies without secure flag',
                'recommendation': 'Set secure flag on all authentication cookies'
            })
        
        # Check for missing HttpOnly flags
        non_httponly_cookies = [c for c in cookies if not c.get('httpOnly', False) and c.get('name', '').lower() in ['session', 'auth', 'token']]
        if non_httponly_cookies:
            vulnerabilities.append({
                'type': 'XSS Vulnerable Cookies',
                'severity': 'Medium',
                'description': f'Found {len(non_httponly_cookies)} authentication cookies without HttpOnly flag',
                'recommendation': 'Set HttpOnly flag on all authentication cookies'
            })
        
        # Check for missing security headers
        headers = session_data.get('headers', {})
        if 'X-Frame-Options' not in headers:
            vulnerabilities.append({
                'type': 'Clickjacking Vulnerability',
                'severity': 'Low',
                'description': 'Missing X-Frame-Options header',
                'recommendation': 'Implement X-Frame-Options header'
            })
        
        return vulnerabilities
    
    def analyze_session_lifecycle(self, session_data: Dict) -> Dict:
        """
        Analyze session lifecycle management
        """
        lifecycle = {
            'session_creation': 'Unknown',
            'session_validation': 'Unknown',
            'session_timeout': 'Unknown',
            'session_termination': 'Unknown',
            'session_persistence': 'Unknown'
        }
        
        # Analyze based on available data
        cookies = session_data.get('cookies', [])
        for cookie in cookies:
            if 'expires' in cookie:
                lifecycle['session_timeout'] = f"Cookie expires: {cookie['expires']}"
        
        return lifecycle
    
    def is_sensitive_data(self, key: str, value: str) -> bool:
        """
        Determine if data is sensitive
        """
        sensitive_keywords = [
            'password', 'token', 'auth', 'session', 'secret', 'key',
            'credential', 'private', 'sensitive', 'confidential'
        ]
        
        key_lower = key.lower()
        return any(keyword in key_lower for keyword in sensitive_keywords)
    
    def generate_session_report(self, session_data: Dict) -> str:
        """
        Generate a comprehensive session report
        """
        analysis = self.analyze_telegram_web_session(session_data)
        
        report = f"""
# Telegram Session Analysis Report

## Session Overview
- Total Cookies: {analysis['session_components']['cookies']['total_cookies']}
- Secure Cookies: {analysis['session_components']['cookies']['secure_cookies']}
- HttpOnly Cookies: {analysis['session_components']['cookies']['httponly_cookies']}

## Security Features
{chr(10).join(f"- {feature}" for feature in analysis['security_features'])}

## Potential Vulnerabilities
{chr(10).join(f"- {vuln['type']}: {vuln['description']}" for vuln in analysis['potential_vulnerabilities'])}

## Recommendations
{chr(10).join(f"- {vuln['recommendation']}" for vuln in analysis['potential_vulnerabilities'])}
        """
        
        return report

# Example usage (educational purposes only)
if __name__ == "__main__":
    analyzer = TelegramSessionAnalyzer()
    
    # Example session data (fictional)
    example_session = {
        'url': 'https://web.telegram.org/',
        'cookies': [
            {
                'name': 'session_id',
                'value': 'abc123def456',
                'domain': '.telegram.org',
                'path': '/',
                'secure': True,
                'httpOnly': True,
                'expires': '2024-12-31T23:59:59Z'
            },
            {
                'name': 'auth_token',
                'value': 'xyz789uvw012',
                'domain': '.telegram.org',
                'path': '/',
                'secure': True,
                'httpOnly': False,  # Potential vulnerability
                'expires': '2024-12-31T23:59:59Z'
            }
        ],
        'headers': {
            'X-Frame-Options': 'DENY',
            'Content-Security-Policy': "default-src 'self'",
            'Strict-Transport-Security': 'max-age=31536000'
        }
    }
    
    # Generate analysis
    report = analyzer.generate_session_report(example_session)
    print(report) 