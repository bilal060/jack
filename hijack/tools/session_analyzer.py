"""
Session Analyzer Tool - Educational Purposes Only
Tool for analyzing session security and identifying potential vulnerabilities
"""

import json
import hashlib
import time
from datetime import datetime
from typing import Dict, List, Optional

class SessionAnalyzer:
    """
    Educational tool for analyzing session security
    """
    
    def __init__(self):
        self.analysis_results = {}
        self.security_score = 0
        self.vulnerabilities = []
        self.recommendations = []
    
    def analyze_session(self, session_data: Dict) -> Dict:
        """
        Comprehensive session analysis
        """
        analysis = {
            'session_overview': self.analyze_session_overview(session_data),
            'cookie_analysis': self.analyze_cookies(session_data.get('cookies', [])),
            'header_analysis': self.analyze_headers(session_data.get('headers', {})),
            'security_assessment': self.assess_security(session_data),
            'vulnerability_scan': self.scan_vulnerabilities(session_data),
            'recommendations': self.generate_recommendations(session_data)
        }
        
        self.analysis_results = analysis
        return analysis
    
    def analyze_session_overview(self, session_data: Dict) -> Dict:
        """
        Analyze basic session information
        """
        overview = {
            'session_id': session_data.get('session_id', 'Unknown'),
            'creation_time': session_data.get('creation_time', 'Unknown'),
            'last_activity': session_data.get('last_activity', 'Unknown'),
            'ip_address': session_data.get('ip_address', 'Unknown'),
            'user_agent': session_data.get('user_agent', 'Unknown'),
            'protocol': 'HTTPS' if session_data.get('url', '').startswith('https://') else 'HTTP',
            'total_cookies': len(session_data.get('cookies', [])),
            'session_age': self.calculate_session_age(session_data.get('creation_time'))
        }
        
        return overview
    
    def analyze_cookies(self, cookies: List) -> Dict:
        """
        Detailed cookie analysis
        """
        cookie_analysis = {
            'total_cookies': len(cookies),
            'secure_cookies': 0,
            'httponly_cookies': 0,
            'session_cookies': 0,
            'authentication_cookies': 0,
            'cookie_details': [],
            'security_score': 0
        }
        
        for cookie in cookies:
            cookie_info = {
                'name': cookie.get('name', ''),
                'value_length': len(cookie.get('value', '')),
                'domain': cookie.get('domain', ''),
                'path': cookie.get('path', ''),
                'secure': cookie.get('secure', False),
                'httpOnly': cookie.get('httpOnly', False),
                'sameSite': cookie.get('sameSite', ''),
                'expires': cookie.get('expires', ''),
                'is_session_cookie': 'session' in cookie.get('name', '').lower(),
                'is_auth_cookie': any(keyword in cookie.get('name', '').lower() 
                                    for keyword in ['auth', 'token', 'login'])
            }
            
            cookie_analysis['cookie_details'].append(cookie_info)
            
            # Count security features
            if cookie_info['secure']:
                cookie_analysis['secure_cookies'] += 1
            if cookie_info['httpOnly']:
                cookie_analysis['httponly_cookies'] += 1
            if cookie_info['is_session_cookie']:
                cookie_analysis['session_cookies'] += 1
            if cookie_info['is_auth_cookie']:
                cookie_analysis['authentication_cookies'] += 1
        
        # Calculate security score
        if cookie_analysis['total_cookies'] > 0:
            security_features = (cookie_analysis['secure_cookies'] + 
                               cookie_analysis['httponly_cookies'])
            cookie_analysis['security_score'] = (security_features / 
                                               cookie_analysis['total_cookies']) * 100
        
        return cookie_analysis
    
    def analyze_headers(self, headers: Dict) -> Dict:
        """
        Analyze HTTP headers for security
        """
        security_headers = {
            'X-Frame-Options': 'Prevents clickjacking',
            'X-Content-Type-Options': 'Prevents MIME type sniffing',
            'X-XSS-Protection': 'XSS protection',
            'Content-Security-Policy': 'Content security policy',
            'Strict-Transport-Security': 'HTTPS enforcement',
            'Referrer-Policy': 'Referrer information control'
        }
        
        header_analysis = {
            'total_headers': len(headers),
            'security_headers_present': 0,
            'missing_security_headers': [],
            'header_details': {},
            'security_score': 0
        }
        
        for header, description in security_headers.items():
            if header in headers:
                header_analysis['security_headers_present'] += 1
                header_analysis['header_details'][header] = {
                    'value': headers[header],
                    'description': description,
                    'status': 'Present'
                }
            else:
                header_analysis['missing_security_headers'].append(header)
                header_analysis['header_details'][header] = {
                    'value': 'Not Set',
                    'description': description,
                    'status': 'Missing'
                }
        
        # Calculate security score
        if security_headers:
            header_analysis['security_score'] = (header_analysis['security_headers_present'] / 
                                               len(security_headers)) * 100
        
        return header_analysis
    
    def assess_security(self, session_data: Dict) -> Dict:
        """
        Overall security assessment
        """
        security_assessment = {
            'overall_score': 0,
            'risk_level': 'Unknown',
            'strengths': [],
            'weaknesses': [],
            'critical_issues': []
        }
        
        # Check protocol
        if session_data.get('url', '').startswith('https://'):
            security_assessment['strengths'].append('HTTPS protocol used')
        else:
            security_assessment['weaknesses'].append('HTTP protocol (insecure)')
            security_assessment['critical_issues'].append('Session transmitted over HTTP')
        
        # Check cookies
        cookies = session_data.get('cookies', [])
        secure_cookies = [c for c in cookies if c.get('secure', False)]
        httponly_cookies = [c for c in cookies if c.get('httpOnly', False)]
        
        if secure_cookies:
            security_assessment['strengths'].append(f'{len(secure_cookies)} secure cookies')
        else:
            security_assessment['weaknesses'].append('No secure cookies found')
        
        if httponly_cookies:
            security_assessment['strengths'].append(f'{len(httponly_cookies)} HttpOnly cookies')
        else:
            security_assessment['weaknesses'].append('No HttpOnly cookies found')
        
        # Check headers
        headers = session_data.get('headers', {})
        if 'X-Frame-Options' in headers:
            security_assessment['strengths'].append('X-Frame-Options header present')
        else:
            security_assessment['weaknesses'].append('Missing X-Frame-Options header')
        
        if 'Content-Security-Policy' in headers:
            security_assessment['strengths'].append('Content Security Policy present')
        else:
            security_assessment['weaknesses'].append('Missing Content Security Policy')
        
        # Calculate overall score
        total_checks = 5  # Protocol, secure cookies, httponly cookies, X-Frame-Options, CSP
        passed_checks = 0
        
        if session_data.get('url', '').startswith('https://'):
            passed_checks += 1
        if secure_cookies:
            passed_checks += 1
        if httponly_cookies:
            passed_checks += 1
        if 'X-Frame-Options' in headers:
            passed_checks += 1
        if 'Content-Security-Policy' in headers:
            passed_checks += 1
        
        security_assessment['overall_score'] = (passed_checks / total_checks) * 100
        
        # Determine risk level
        if security_assessment['overall_score'] >= 80:
            security_assessment['risk_level'] = 'Low'
        elif security_assessment['overall_score'] >= 60:
            security_assessment['risk_level'] = 'Medium'
        elif security_assessment['overall_score'] >= 40:
            security_assessment['risk_level'] = 'High'
        else:
            security_assessment['risk_level'] = 'Critical'
        
        return security_assessment
    
    def scan_vulnerabilities(self, session_data: Dict) -> List[Dict]:
        """
        Scan for specific vulnerabilities
        """
        vulnerabilities = []
        
        # Check for HTTP protocol
        if not session_data.get('url', '').startswith('https://'):
            vulnerabilities.append({
                'type': 'Insecure Protocol',
                'severity': 'Critical',
                'description': 'Session transmitted over HTTP',
                'impact': 'Session can be intercepted',
                'recommendation': 'Use HTTPS for all session communications'
            })
        
        # Check for missing secure flags on auth cookies
        cookies = session_data.get('cookies', [])
        auth_cookies = [c for c in cookies if any(keyword in c.get('name', '').lower() 
                                                for keyword in ['auth', 'token', 'session'])]
        
        for cookie in auth_cookies:
            if not cookie.get('secure', False):
                vulnerabilities.append({
                    'type': 'Insecure Cookie',
                    'severity': 'High',
                    'description': f"Authentication cookie '{cookie.get('name')}' not marked as secure",
                    'impact': 'Cookie can be transmitted over HTTP',
                    'recommendation': 'Set secure flag on all authentication cookies'
                })
            
            if not cookie.get('httpOnly', False):
                vulnerabilities.append({
                    'type': 'XSS Vulnerable Cookie',
                    'severity': 'Medium',
                    'description': f"Authentication cookie '{cookie.get('name')}' not marked as HttpOnly",
                    'impact': 'Cookie accessible via JavaScript (XSS risk)',
                    'recommendation': 'Set HttpOnly flag on all authentication cookies'
                })
        
        # Check for missing security headers
        headers = session_data.get('headers', {})
        if 'X-Frame-Options' not in headers:
            vulnerabilities.append({
                'type': 'Clickjacking Vulnerability',
                'severity': 'Medium',
                'description': 'Missing X-Frame-Options header',
                'impact': 'Site vulnerable to clickjacking attacks',
                'recommendation': 'Implement X-Frame-Options header'
            })
        
        if 'Content-Security-Policy' not in headers:
            vulnerabilities.append({
                'type': 'Content Security Policy Missing',
                'severity': 'Medium',
                'description': 'Missing Content Security Policy',
                'impact': 'Reduced protection against XSS and injection attacks',
                'recommendation': 'Implement Content Security Policy'
            })
        
        # Check for long session duration
        session_age = self.calculate_session_age(session_data.get('creation_time'))
        if session_age and session_age > 3600:  # More than 1 hour
            vulnerabilities.append({
                'type': 'Long Session Duration',
                'severity': 'Low',
                'description': f'Session active for {session_age} seconds',
                'impact': 'Increased attack window',
                'recommendation': 'Implement shorter session timeouts'
            })
        
        return vulnerabilities
    
    def generate_recommendations(self, session_data: Dict) -> List[str]:
        """
        Generate security recommendations
        """
        recommendations = []
        
        # Protocol recommendations
        if not session_data.get('url', '').startswith('https://'):
            recommendations.append('🔴 CRITICAL: Use HTTPS for all session communications')
        
        # Cookie recommendations
        cookies = session_data.get('cookies', [])
        auth_cookies = [c for c in cookies if any(keyword in c.get('name', '').lower() 
                                                for keyword in ['auth', 'token', 'session'])]
        
        for cookie in auth_cookies:
            if not cookie.get('secure', False):
                recommendations.append(f'🔴 HIGH: Set secure flag on cookie "{cookie.get("name")}"')
            if not cookie.get('httpOnly', False):
                recommendations.append(f'🟡 MEDIUM: Set HttpOnly flag on cookie "{cookie.get("name")}"')
        
        # Header recommendations
        headers = session_data.get('headers', {})
        if 'X-Frame-Options' not in headers:
            recommendations.append('🟡 MEDIUM: Implement X-Frame-Options header')
        if 'Content-Security-Policy' not in headers:
            recommendations.append('🟡 MEDIUM: Implement Content Security Policy')
        if 'Strict-Transport-Security' not in headers:
            recommendations.append('🟢 LOW: Consider implementing HSTS header')
        
        # Session management recommendations
        recommendations.append('🟢 GENERAL: Implement session timeout mechanisms')
        recommendations.append('🟢 GENERAL: Use secure session token generation')
        recommendations.append('🟢 GENERAL: Implement session validation on each request')
        
        return recommendations
    
    def calculate_session_age(self, creation_time: str) -> Optional[int]:
        """
        Calculate session age in seconds
        """
        if not creation_time:
            return None
        
        try:
            # Parse creation time (assuming ISO format)
            creation_dt = datetime.fromisoformat(creation_time.replace('Z', '+00:00'))
            current_dt = datetime.now(creation_dt.tzinfo)
            return int((current_dt - creation_dt).total_seconds())
        except:
            return None
    
    def generate_report(self, session_data: Dict) -> str:
        """
        Generate comprehensive analysis report
        """
        analysis = self.analyze_session(session_data)
        
        report = f"""
# Session Security Analysis Report

## 📊 Executive Summary
- **Overall Security Score**: {analysis['security_assessment']['overall_score']:.1f}%
- **Risk Level**: {analysis['security_assessment']['risk_level']}
- **Total Vulnerabilities**: {len(analysis['vulnerability_scan'])}
- **Critical Issues**: {len([v for v in analysis['vulnerability_scan'] if v['severity'] == 'Critical'])}

## 🔍 Session Overview
- **Session ID**: {analysis['session_overview']['session_id']}
- **Protocol**: {analysis['session_overview']['protocol']}
- **IP Address**: {analysis['session_overview']['ip_address']}
- **Total Cookies**: {analysis['session_overview']['total_cookies']}
- **Session Age**: {analysis['session_overview']['session_age']} seconds

## 🍪 Cookie Analysis
- **Secure Cookies**: {analysis['cookie_analysis']['secure_cookies']}/{analysis['cookie_analysis']['total_cookies']}
- **HttpOnly Cookies**: {analysis['cookie_analysis']['httponly_cookies']}/{analysis['cookie_analysis']['total_cookies']}
- **Security Score**: {analysis['cookie_analysis']['security_score']:.1f}%

## 🛡️ Security Headers
- **Security Headers Present**: {analysis['header_analysis']['security_headers_present']}
- **Missing Headers**: {', '.join(analysis['header_analysis']['missing_security_headers'])}
- **Header Security Score**: {analysis['header_analysis']['security_score']:.1f}%

## ⚠️ Vulnerabilities Found
{chr(10).join(f"- **{v['type']}** ({v['severity']}): {v['description']}" for v in analysis['vulnerability_scan'])}

## 💡 Recommendations
{chr(10).join(f"- {rec}" for rec in analysis['recommendations'])}

## 🎯 Strengths
{chr(10).join(f"- {strength}" for strength in analysis['security_assessment']['strengths'])}

## 🚨 Weaknesses
{chr(10).join(f"- {weakness}" for weakness in analysis['security_assessment']['weaknesses'])}

---
*Report generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*
        """
        
        return report

# Example usage
if __name__ == "__main__":
    analyzer = SessionAnalyzer()
    
    # Example session data
    example_session = {
        'session_id': 'abc123def456',
        'url': 'https://example.com/dashboard',
        'creation_time': '2024-01-15T10:00:00Z',
        'ip_address': '192.168.1.100',
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'cookies': [
            {
                'name': 'session_id',
                'value': 'abc123def456',
                'secure': True,
                'httpOnly': True,
                'sameSite': 'Strict'
            },
            {
                'name': 'auth_token',
                'value': 'xyz789',
                'secure': False,  # Vulnerability
                'httpOnly': False,  # Vulnerability
                'sameSite': 'Lax'
            }
        ],
        'headers': {
            'X-Frame-Options': 'DENY',
            'Content-Security-Policy': "default-src 'self'"
        }
    }
    
    # Generate report
    report = analyzer.generate_report(example_session)
    print(report) 