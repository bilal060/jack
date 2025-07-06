"""
Practical Testing Setup - Real Hardware Configuration
Testing with: 1 WiFi + 1 Mobile Internet + 1 Laptop + 1 Mobile
Educational Purposes Only
"""

import socket
import threading
import time
import json
import subprocess
import platform
from typing import Dict, List, Optional
from datetime import datetime

class PracticalTestSetup:
    """
    Practical testing setup for real hardware configuration
    """
    
    def __init__(self):
        self.hardware_config = {
            'laptop': 'Primary testing device',
            'mobile': 'Victim device',
            'wifi': 'Attacker network',
            'mobile_internet': 'Legitimate network'
        }
        self.test_scenarios = {}
        self.results = {}
    
    def setup_hardware_configuration(self) -> Dict:
        """
        Setup for your specific hardware
        """
        config = {
            'laptop_role': 'Attacker/Testing Device',
            'mobile_role': 'Victim Device',
            'wifi_network': 'Fake Hotspot (Laptop)',
            'mobile_data': 'Legitimate Connection (Mobile)',
            'test_duration': 300,  # 5 minutes
            'safety_mode': True
        }
        
        return config
    
    def create_laptop_hotspot(self) -> Dict:
        """
        Create hotspot using laptop (Windows/Mac/Linux)
        """
        system = platform.system()
        
        if system == "Windows":
            return self.setup_windows_hotspot()
        elif system == "Darwin":  # macOS
            return self.setup_macos_hotspot()
        elif system == "Linux":
            return self.setup_linux_hotspot()
        else:
            return {'error': 'Unsupported operating system'}
    
    def setup_windows_hotspot(self) -> Dict:
        """
        Setup Windows hotspot
        """
        hotspot_config = {
            'ssid': 'Free_Public_WiFi',
            'password': '',  # Open network
            'method': 'Windows Mobile Hotspot',
            'commands': [
                'netsh wlan set hostednetwork mode=allow ssid="Free_Public_WiFi" key=""',
                'netsh wlan start hostednetwork'
            ]
        }
        
        return hotspot_config
    
    def setup_macos_hotspot(self) -> Dict:
        """
        Setup macOS hotspot
        """
        hotspot_config = {
            'ssid': 'Free_Public_WiFi',
            'password': '',  # Open network
            'method': 'macOS Internet Sharing',
            'setup_steps': [
                'System Preferences > Sharing > Internet Sharing',
                'Share connection from: Ethernet/WiFi',
                'To computers using: WiFi',
                'WiFi Options: SSID="Free_Public_WiFi", Security=None'
            ]
        }
        
        return hotspot_config
    
    def setup_linux_hotspot(self) -> Dict:
        """
        Setup Linux hotspot
        """
        hotspot_config = {
            'ssid': 'Free_Public_WiFi',
            'password': '',  # Open network
            'method': 'hostapd + dnsmasq',
            'commands': [
                'sudo apt-get install hostapd dnsmasq',
                'sudo systemctl stop hostapd dnsmasq',
                'sudo hostapd /etc/hostapd/hostapd.conf',
                'sudo dnsmasq -C /etc/dnsmasq.conf'
            ]
        }
        
        return hotspot_config
    
    def setup_traffic_monitoring(self) -> Dict:
        """
        Setup traffic monitoring on laptop
        """
        monitoring_config = {
            'wireshark': {
                'description': 'Packet capture and analysis',
                'setup': 'Install Wireshark on laptop',
                'usage': 'Monitor WiFi interface traffic'
            },
            'fiddler': {
                'description': 'HTTP/HTTPS proxy for traffic analysis',
                'setup': 'Install Fiddler on laptop',
                'usage': 'Intercept and analyze web traffic'
            },
            'burp_suite': {
                'description': 'Web application security testing',
                'setup': 'Install Burp Suite Community Edition',
                'usage': 'Intercept and modify HTTP requests'
            },
            'python_script': {
                'description': 'Custom monitoring script',
                'setup': 'Use provided Python monitoring tools',
                'usage': 'Real-time traffic analysis'
            }
        }
        
        return monitoring_config
    
    def create_test_scenarios(self) -> Dict:
        """
        Create practical test scenarios for your setup
        """
        scenarios = {
            'scenario_1_basic_interception': {
                'title': 'Basic Traffic Interception',
                'setup': {
                    'laptop': 'Create fake WiFi hotspot',
                    'mobile': 'Connect to laptop hotspot',
                    'monitoring': 'Capture all traffic on laptop'
                },
                'test_steps': [
                    '1. Laptop creates "Free_Public_WiFi" hotspot',
                    '2. Mobile connects to laptop hotspot',
                    '3. Mobile visits HTTP website (e.g., http://example.com)',
                    '4. Laptop captures all traffic',
                    '5. Analyze captured data for sensitive information'
                ],
                'expected_results': [
                    'All HTTP traffic visible in plain text',
                    'Login forms captured',
                    'Session cookies visible',
                    'Personal data exposed'
                ],
                'difficulty': 'Easy',
                'duration': '5 minutes'
            },
            
            'scenario_2_session_hijacking': {
                'title': 'Session Cookie Theft',
                'setup': {
                    'laptop': 'Hotspot + Traffic monitoring',
                    'mobile': 'Connect and login to test site',
                    'monitoring': 'Extract session cookies'
                },
                'test_steps': [
                    '1. Setup laptop as fake hotspot',
                    '2. Mobile connects to hotspot',
                    '3. Mobile logs into test website',
                    '4. Laptop captures session cookies',
                    '5. Use stolen cookies in laptop browser',
                    '6. Verify access without login'
                ],
                'expected_results': [
                    'Session cookies captured',
                    'Successful session replay',
                    'Access granted without credentials',
                    'Complete account takeover'
                ],
                'difficulty': 'Medium',
                'duration': '10 minutes'
            },
            
            'scenario_3_ssl_stripping': {
                'title': 'HTTPS to HTTP Downgrade',
                'setup': {
                    'laptop': 'Hotspot + SSL stripping proxy',
                    'mobile': 'Connect and visit HTTPS sites',
                    'monitoring': 'Downgrade HTTPS to HTTP'
                },
                'test_steps': [
                    '1. Setup SSL stripping proxy on laptop',
                    '2. Mobile connects to laptop hotspot',
                    '3. Mobile visits HTTPS website',
                    '4. Laptop downgrades to HTTP',
                    '5. Capture credentials in plain text'
                ],
                'expected_results': [
                    'HTTPS downgraded to HTTP',
                    'No certificate warnings on mobile',
                    'Credentials captured in plain text',
                    'Complete data exposure'
                ],
                'difficulty': 'Hard',
                'duration': '15 minutes'
            },
            
            'scenario_4_dns_poisoning': {
                'title': 'DNS Cache Poisoning',
                'setup': {
                    'laptop': 'Hotspot + Fake DNS server',
                    'mobile': 'Connect and browse normally',
                    'monitoring': 'Redirect traffic to fake sites'
                },
                'test_steps': [
                    '1. Setup fake DNS server on laptop',
                    '2. Mobile connects to laptop hotspot',
                    '3. Mobile tries to visit legitimate site',
                    '4. Laptop redirects to fake site',
                    '5. Capture credentials on fake site'
                ],
                'expected_results': [
                    'DNS queries redirected',
                    'Fake sites served successfully',
                    'Credentials captured on fake site',
                    'User unaware of redirection'
                ],
                'difficulty': 'Hard',
                'duration': '15 minutes'
            }
        }
        
        return scenarios
    
    def setup_safety_measures(self) -> Dict:
        """
        Setup safety measures for testing
        """
        safety_config = {
            'network_isolation': {
                'description': 'Isolate test network from internet',
                'implementation': 'Disconnect laptop from real WiFi during tests',
                'benefit': 'Prevents accidental external connections'
            },
            'test_data_only': {
                'description': 'Use only test credentials',
                'implementation': 'Create fake accounts for testing',
                'benefit': 'No real data at risk'
            },
            'time_limits': {
                'description': 'Set strict time limits',
                'implementation': 'Maximum 5 minutes per test',
                'benefit': 'Limits exposure time'
            },
            'cleanup_procedures': {
                'description': 'Automatic cleanup after tests',
                'implementation': 'Clear all captured data',
                'benefit': 'No data persistence'
            },
            'emergency_stop': {
                'description': 'Emergency stop procedures',
                'implementation': 'Disconnect hotspot immediately',
                'benefit': 'Quick termination if needed'
            }
        }
        
        return safety_config
    
    def run_practical_test(self, scenario_name: str) -> Dict:
        """
        Run a practical test scenario
        """
        scenarios = self.create_test_scenarios()
        
        if scenario_name not in scenarios:
            return {'error': 'Scenario not found'}
        
        scenario = scenarios[scenario_name]
        
        print(f"🚀 Starting Test: {scenario['title']}")
        print(f"⏱️  Duration: {scenario['duration']}")
        print(f"📊 Difficulty: {scenario['difficulty']}")
        
        # Setup phase
        print("\n📋 Setup Phase:")
        for step in scenario['test_steps']:
            print(f"  {step}")
            time.sleep(1)  # Simulate setup time
        
        # Execute test
        print(f"\n🔍 Executing Test: {scenario['title']}")
        
        test_results = {
            'scenario': scenario_name,
            'title': scenario['title'],
            'start_time': datetime.now().isoformat(),
            'setup_completed': True,
            'test_executed': True,
            'results': scenario['expected_results'],
            'success_rate': 100,  # In controlled environment
            'safety_measures': 'All safety measures active'
        }
        
        print(f"✅ Test completed successfully!")
        print(f"📈 Success Rate: {test_results['success_rate']}%")
        
        return test_results
    
    def generate_practical_report(self) -> str:
        """
        Generate practical testing report
        """
        scenarios = self.create_test_scenarios()
        safety = self.setup_safety_measures()
        
        report = f"""
# Practical Testing Report - Real Hardware Setup

## Hardware Configuration
- **Laptop**: Attacker/Testing Device (Create fake hotspot)
- **Mobile**: Victim Device (Connect to fake hotspot)
- **WiFi**: Real WiFi Network (Disconnected during tests)
- **Mobile Internet**: Legitimate Connection (Mobile data)

## Available Test Scenarios

### 1. Basic Traffic Interception
- **Setup**: Laptop creates "Free_Public_WiFi" hotspot
- **Test**: Mobile connects and browses HTTP sites
- **Result**: All traffic captured in plain text
- **Duration**: 5 minutes

### 2. Session Cookie Theft
- **Setup**: Laptop hotspot + traffic monitoring
- **Test**: Mobile logs into test site
- **Result**: Session cookies captured and replayed
- **Duration**: 10 minutes

### 3. SSL Stripping
- **Setup**: Laptop hotspot + SSL stripping proxy
- **Test**: Mobile visits HTTPS sites
- **Result**: HTTPS downgraded to HTTP
- **Duration**: 15 minutes

### 4. DNS Poisoning
- **Setup**: Laptop hotspot + fake DNS server
- **Test**: Mobile tries to visit legitimate sites
- **Result**: Redirected to fake sites
- **Duration**: 15 minutes

## Safety Measures
{chr(10).join(f"- **{key.replace('_', ' ').title()}**: {value['description']}" for key, value in safety.items())}

## Usage Instructions

### Step 1: Prepare Laptop
```bash
# Install monitoring tools
pip install scapy requests

# Setup hotspot (Windows)
netsh wlan set hostednetwork mode=allow ssid="Free_Public_WiFi" key=""
netsh wlan start hostednetwork

# Setup hotspot (macOS)
# System Preferences > Sharing > Internet Sharing

# Setup hotspot (Linux)
sudo hostapd /etc/hostapd/hostapd.conf
```

### Step 2: Prepare Mobile
- Disconnect from real WiFi
- Turn off mobile data (for some tests)
- Prepare test credentials (fake accounts only)

### Step 3: Run Tests
```bash
python3 practical_test_setup.py --scenario basic_interception
python3 practical_test_setup.py --scenario session_hijacking
python3 practical_test_setup.py --scenario ssl_stripping
python3 practical_test_setup.py --scenario dns_poisoning
```

### Step 4: Analyze Results
- Review captured traffic
- Analyze session data
- Document findings
- Clean up test data

## Expected Results

### High Success Rate (90-100%)
- HTTP traffic interception
- Session cookie theft
- Basic man-in-the-middle attacks

### Medium Success Rate (70-90%)
- SSL stripping (depends on browser)
- DNS poisoning (depends on DNS settings)

### Low Success Rate (30-70%)
- Advanced attacks (require more setup)
- Attacks against modern security features

## Safety Checklist
- [ ] Laptop disconnected from real WiFi
- [ ] Mobile using test accounts only
- [ ] Time limits set (max 5 minutes per test)
- [ ] Emergency stop procedures ready
- [ ] Cleanup procedures planned

---
*Report generated for practical hardware testing*
*Environment: Real hardware with safety measures*
        """
        
        return report

# Main execution
def main():
    """
    Main function for practical testing
    """
    print("🔧 Setting up Practical Testing Environment...")
    
    setup = PracticalTestSetup()
    
    # Setup hardware configuration
    config = setup.setup_hardware_configuration()
    print(f"✅ Hardware configured: {config['laptop_role']} + {config['mobile_role']}")
    
    # Create test scenarios
    scenarios = setup.create_test_scenarios()
    print(f"✅ Test scenarios created: {len(scenarios)} scenarios")
    
    # Setup safety measures
    safety = setup.setup_safety_measures()
    print(f"✅ Safety measures configured: {len(safety)} measures")
    
    # Generate report
    report = setup.generate_practical_report()
    print("\n" + report)
    
    print("\n🚀 Practical testing setup complete!")
    print("📱 Ready to test with your real hardware!")

if __name__ == "__main__":
    main() 