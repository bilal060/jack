/**
 * ADVANCED SOCIAL ENGINEERING MODULE
 * For Internal Security Research Only
 * 
 * This module implements sophisticated psychological manipulation
 * techniques including cognitive biases, emotional triggers, and
 * advanced persuasion methods.
 */

class AdvancedSocialEngineering {
    constructor(page) {
        this.page = page;
        this.psychologicalData = {
            cognitiveBiases: [],
            emotionalTriggers: [],
            persuasionTechniques: [],
            socialProof: [],
            authorityExploitation: [],
            scarcityUrgency: [],
            reciprocity: [],
            commitmentConsistency: [],
            liking: [],
            timestamp: new Date().toISOString()
        };
    }

    async executeAdvancedSocialEngineering() {
        console.log('🧠 Starting advanced social engineering attacks...');
        
        await this.implementCognitiveBiases();
        await this.createEmotionalTriggers();
        await this.applyPersuasionTechniques();
        await this.exploitSocialProof();
        await this.manipulateAuthority();
        await this.createScarcityUrgency();
        await this.implementReciprocity();
        await this.exploitCommitmentConsistency();
        await this.createLikingFactors();
        await this.implementAdvancedManipulation();
        
        return this.psychologicalData;
    }

    async implementCognitiveBiases() {
        console.log('🎯 Implementing cognitive bias exploitation...');
        
        await this.page.evaluate(() => {
            // Exploit various cognitive biases
            const cognitiveBiases = {
                // Anchoring bias - present high numbers first
                anchoring: () => {
                    const originalPrice = 999.99;
                    const discountedPrice = 299.99;
                    
                    const anchorElement = document.createElement('div');
                    anchorElement.innerHTML = `
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>🎯 Limited Time Offer!</h3>
                            <p style="text-decoration: line-through; color: #dc3545; font-size: 24px;">
                                Original Price: $${originalPrice}
                            </p>
                            <p style="color: #28a745; font-size: 32px; font-weight: bold;">
                                Your Price: $${discountedPrice}
                            </p>
                            <p style="color: #6c757d;">You save $${originalPrice - discountedPrice}!</p>
                            <button onclick="exploitAnchoring()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Claim Your Discount Now
                            </button>
                        </div>
                    `;
                    document.body.appendChild(anchorElement);
                },
                
                // Confirmation bias - show information that confirms user's beliefs
                confirmationBias: () => {
                    const userInterests = ['technology', 'security', 'privacy'];
                    const randomInterest = userInterests[Math.floor(Math.random() * userInterests.length)];
                    
                    const confirmationElement = document.createElement('div');
                    confirmationElement.innerHTML = `
                        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>🔍 You're Right About ${randomInterest.charAt(0).toUpperCase() + randomInterest.slice(1)}!</h3>
                            <p>Recent studies confirm what you already know about ${randomInterest}.</p>
                            <p>Join ${Math.floor(Math.random() * 10000) + 5000} other ${randomInterest} experts who trust our platform.</p>
                            <button onclick="exploitConfirmation()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Learn More
                            </button>
                        </div>
                    `;
                    document.body.appendChild(confirmationElement);
                },
                
                // Availability heuristic - make information easily accessible
                availabilityHeuristic: () => {
                    const availabilityElement = document.createElement('div');
                    availabilityElement.innerHTML = `
                        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>⚡ Quick Access - No Registration Required!</h3>
                            <p>Get instant access to premium content without any signup.</p>
                            <ul>
                                <li>✅ No email required</li>
                                <li>✅ No password needed</li>
                                <li>✅ Instant access</li>
                                <li>✅ Free forever</li>
                            </ul>
                            <button onclick="exploitAvailability()" style="background: #ffc107; color: #212529; border: none; padding: 10px 20px; border-radius: 5px;">
                                Get Instant Access
                            </button>
                        </div>
                    `;
                    document.body.appendChild(availabilityElement);
                },
                
                // Bandwagon effect - show everyone is doing it
                bandwagonEffect: () => {
                    const bandwagonElement = document.createElement('div');
                    bandwagonElement.innerHTML = `
                        <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>🚀 Join the Trend!</h3>
                            <p>${Math.floor(Math.random() * 100000) + 50000} people have already joined today!</p>
                            <div style="display: flex; align-items: center; margin: 10px 0;">
                                <span style="color: #28a745;">●●●●●</span>
                                <span style="margin-left: 10px;">${Math.floor(Math.random() * 1000) + 500} new users in the last hour</span>
                            </div>
                            <button onclick="exploitBandwagon()" style="background: #17a2b8; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Join the Crowd
                            </button>
                        </div>
                    `;
                    document.body.appendChild(bandwagonElement);
                },
                
                // Loss aversion - emphasize what they'll lose
                lossAversion: () => {
                    const lossElement = document.createElement('div');
                    lossElement.innerHTML = `
                        <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>⚠️ Don't Miss Out!</h3>
                            <p>You're about to lose access to exclusive benefits:</p>
                            <ul style="color: #721c24;">
                                <li>❌ Premium features will be locked</li>
                                <li>❌ Special discounts will expire</li>
                                <li>❌ Early access will be revoked</li>
                                <li>❌ VIP status will be lost</li>
                            </ul>
                            <p style="color: #721c24; font-weight: bold;">Time remaining: <span id="countdown">05:00</span></p>
                            <button onclick="exploitLossAversion()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Prevent Loss Now
                            </button>
                        </div>
                    `;
                    document.body.appendChild(lossElement);
                    
                    // Start countdown
                    let timeLeft = 300; // 5 minutes
                    const countdownElement = document.getElementById('countdown');
                    const countdownInterval = setInterval(() => {
                        timeLeft--;
                        const minutes = Math.floor(timeLeft / 60);
                        const seconds = timeLeft % 60;
                        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                        
                        if (timeLeft <= 0) {
                            clearInterval(countdownInterval);
                            countdownElement.textContent = 'EXPIRED';
                        }
                    }, 1000);
                }
            };
            
            // Implement bias exploitation functions
            window.exploitAnchoring = () => {
                console.log('Anchoring bias exploited');
                fetch('/social-engineering/anchoring', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bias: 'anchoring', exploited: true })
                });
            };
            
            window.exploitConfirmation = () => {
                console.log('Confirmation bias exploited');
                fetch('/social-engineering/confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bias: 'confirmation', exploited: true })
                });
            };
            
            window.exploitAvailability = () => {
                console.log('Availability heuristic exploited');
                fetch('/social-engineering/availability', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bias: 'availability', exploited: true })
                });
            };
            
            window.exploitBandwagon = () => {
                console.log('Bandwagon effect exploited');
                fetch('/social-engineering/bandwagon', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bias: 'bandwagon', exploited: true })
                });
            };
            
            window.exploitLossAversion = () => {
                console.log('Loss aversion exploited');
                fetch('/social-engineering/loss-aversion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bias: 'loss_aversion', exploited: true })
                });
            };
            
            // Apply cognitive biases with timing
            setTimeout(() => cognitiveBiases.anchoring(), 2000);
            setTimeout(() => cognitiveBiases.confirmationBias(), 5000);
            setTimeout(() => cognitiveBiases.availabilityHeuristic(), 8000);
            setTimeout(() => cognitiveBiases.bandwagonEffect(), 11000);
            setTimeout(() => cognitiveBiases.lossAversion(), 14000);
        });
        
        this.psychologicalData.cognitiveBiases.push({
            type: 'cognitive_bias_implementation',
            biases: ['anchoring', 'confirmation', 'availability', 'bandwagon', 'loss_aversion'],
            timestamp: new Date().toISOString(),
            description: 'Implemented exploitation of 5 major cognitive biases'
        });
    }

    async createEmotionalTriggers() {
        console.log('💔 Creating emotional triggers...');
        
        await this.page.evaluate(() => {
            // Emotional manipulation techniques
            const emotionalTriggers = {
                // Fear - create anxiety and urgency
                fear: () => {
                    const fearElement = document.createElement('div');
                    fearElement.innerHTML = `
                        <div style="background: #f8d7da; border: 2px solid #dc3545; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #721c24;">🚨 SECURITY ALERT!</h3>
                            <p style="color: #721c24;">Your account has been compromised!</p>
                            <p style="color: #721c24;">Multiple failed login attempts detected from suspicious locations.</p>
                            <p style="color: #721c24;">Immediate action required to prevent data theft.</p>
                            <button onclick="triggerFear()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                SECURE ACCOUNT NOW
                            </button>
                        </div>
                    `;
                    document.body.appendChild(fearElement);
                },
                
                // Greed - promise of wealth and success
                greed: () => {
                    const greedElement = document.createElement('div');
                    greedElement.innerHTML = `
                        <div style="background: #d4edda; border: 2px solid #28a745; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #155724;">💰 INSTANT WEALTH OPPORTUNITY!</h3>
                            <p style="color: #155724;">You've been selected for a limited-time investment opportunity!</p>
                            <p style="color: #155724;">Potential returns: 500% in 24 hours</p>
                            <p style="color: #155724;">Only 3 spots remaining for today's batch.</p>
                            <button onclick="triggerGreed()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                CLAIM MY SPOT
                            </button>
                        </div>
                    `;
                    document.body.appendChild(greedElement);
                },
                
                // Pride - flatter and boost ego
                pride: () => {
                    const prideElement = document.createElement('div');
                    prideElement.innerHTML = `
                        <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #856404;">🏆 EXCLUSIVE INVITATION</h3>
                            <p style="color: #856404;">Congratulations! You've been identified as a high-value user.</p>
                            <p style="color: #856404;">Only the top 1% of users receive this exclusive offer.</p>
                            <p style="color: #856404;">Your expertise and influence have been recognized.</p>
                            <button onclick="triggerPride()" style="background: #ffc107; color: #212529; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                ACCEPT EXCLUSIVE ACCESS
                            </button>
                        </div>
                    `;
                    document.body.appendChild(prideElement);
                },
                
                // Guilt - make them feel responsible
                guilt: () => {
                    const guiltElement = document.createElement('div');
                    guiltElement.innerHTML = `
                        <div style="background: #e2e3e5; border: 2px solid #6c757d; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #495057;">😔 We're Disappointed</h3>
                            <p style="color: #495057;">You haven't completed your profile verification yet.</p>
                            <p style="color: #495057;">This affects our ability to provide you with the best service.</p>
                            <p style="color: #495057;">Other users are waiting for you to complete this step.</p>
                            <button onclick="triggerGuilt()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                COMPLETE VERIFICATION
                            </button>
                        </div>
                    `;
                    document.body.appendChild(guiltElement);
                },
                
                // Curiosity - create mystery and intrigue
                curiosity: () => {
                    const curiosityElement = document.createElement('div');
                    curiosityElement.innerHTML = `
                        <div style="background: #cce5ff; border: 2px solid #007bff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #004085;">🔍 You Won't Believe What We Found...</h3>
                            <p style="color: #004085;">We discovered something about your account that you need to see.</p>
                            <p style="color: #004085;">This information could change everything for you.</p>
                            <p style="color: #004085;">Click below to reveal the secret (it's free).</p>
                            <button onclick="triggerCuriosity()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                REVEAL THE SECRET
                            </button>
                        </div>
                    `;
                    document.body.appendChild(curiosityElement);
                }
            };
            
            // Implement emotional trigger functions
            window.triggerFear = () => {
                console.log('Fear trigger activated');
                fetch('/social-engineering/fear', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emotion: 'fear', triggered: true })
                });
            };
            
            window.triggerGreed = () => {
                console.log('Greed trigger activated');
                fetch('/social-engineering/greed', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emotion: 'greed', triggered: true })
                });
            };
            
            window.triggerPride = () => {
                console.log('Pride trigger activated');
                fetch('/social-engineering/pride', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emotion: 'pride', triggered: true })
                });
            };
            
            window.triggerGuilt = () => {
                console.log('Guilt trigger activated');
                fetch('/social-engineering/guilt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emotion: 'guilt', triggered: true })
                });
            };
            
            window.triggerCuriosity = () => {
                console.log('Curiosity trigger activated');
                fetch('/social-engineering/curiosity', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emotion: 'curiosity', triggered: true })
                });
            };
            
            // Apply emotional triggers with timing
            setTimeout(() => emotionalTriggers.fear(), 3000);
            setTimeout(() => emotionalTriggers.greed(), 6000);
            setTimeout(() => emotionalTriggers.pride(), 9000);
            setTimeout(() => emotionalTriggers.guilt(), 12000);
            setTimeout(() => emotionalTriggers.curiosity(), 15000);
        });
        
        this.psychologicalData.emotionalTriggers.push({
            type: 'emotional_trigger_implementation',
            emotions: ['fear', 'greed', 'pride', 'guilt', 'curiosity'],
            timestamp: new Date().toISOString(),
            description: 'Implemented 5 major emotional trigger techniques'
        });
    }

    async applyPersuasionTechniques() {
        console.log('🎭 Applying persuasion techniques...');
        
        await this.page.evaluate(() => {
            // Cialdini's 6 principles of persuasion
            const persuasionTechniques = {
                // Reciprocity - give something to get something
                reciprocity: () => {
                    const reciprocityElement = document.createElement('div');
                    reciprocityElement.innerHTML = `
                        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>🎁 FREE GIFT FOR YOU!</h3>
                            <p>We're giving you a <strong>FREE Premium Account</strong> for 30 days!</p>
                            <p>No strings attached - just our way of saying thank you.</p>
                            <p>All we ask is that you try it out and let us know what you think.</p>
                            <button onclick="applyReciprocity()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Claim My Free Gift
                            </button>
                        </div>
                    `;
                    document.body.appendChild(reciprocityElement);
                },
                
                // Commitment and Consistency - get small commitments first
                commitmentConsistency: () => {
                    const commitmentElement = document.createElement('div');
                    commitmentElement.innerHTML = `
                        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>✅ Quick Survey - Only 2 Questions!</h3>
                            <p>Help us improve by answering just 2 simple questions:</p>
                            <form onsubmit="applyCommitment(event)">
                                <p>1. Do you value online security? <input type="radio" name="security" value="yes"> Yes <input type="radio" name="security" value="no"> No</p>
                                <p>2. Would you like to protect your data? <input type="radio" name="protection" value="yes"> Yes <input type="radio" name="protection" value="no"> No</p>
                                <button type="submit" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                    Submit Survey
                                </button>
                            </form>
                        </div>
                    `;
                    document.body.appendChild(commitmentElement);
                },
                
                // Social Proof - show others are doing it
                socialProof: () => {
                    const socialProofElement = document.createElement('div');
                    socialProofElement.innerHTML = `
                        <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>👥 What Others Are Saying</h3>
                            <div style="border-left: 3px solid #ff6b6b; padding-left: 15px; margin: 10px 0;">
                                <p>"This changed my life! I feel so much safer now." - Sarah M.</p>
                            </div>
                            <div style="border-left: 3px solid #ff6b6b; padding-left: 15px; margin: 10px 0;">
                                <p>"Best decision I ever made. Highly recommend!" - John D.</p>
                            </div>
                            <div style="border-left: 3px solid #ff6b6b; padding-left: 15px; margin: 10px 0;">
                                <p>"Wish I had found this sooner. Amazing results!" - Mike R.</p>
                            </div>
                            <p><strong>Join ${Math.floor(Math.random() * 10000) + 5000} satisfied users today!</strong></p>
                            <button onclick="applySocialProof()" style="background: #ff6b6b; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Join the Community
                            </button>
                        </div>
                    `;
                    document.body.appendChild(socialProofElement);
                },
                
                // Authority - show expertise and credentials
                authority: () => {
                    const authorityElement = document.createElement('div');
                    authorityElement.innerHTML = `
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>👨‍💼 Expert Recommendation</h3>
                            <div style="display: flex; align-items: center; margin: 10px 0;">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiMwMDdiZiIvPgo8cGF0aCBkPSJNMzIgMTZDMjMuNzIgMTYgMTcgMjIuNzIgMTcgMzFIMTlDMTkgMjMuODIgMjQuODIgMTggMzIgMThWMzJMMzggMjZMMzIgMjBWMzJDMjQuNzIgMzIgMTkgMzcuNzIgMTkgNDVIMTdDMTcgMzUuNzIgMjQuNzIgMjggMzIgMjhWMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" style="width: 50px; height: 50px; margin-right: 15px;">
                                <div>
                                    <p style="font-weight: bold; margin: 0;">Dr. Michael Chen</p>
                                    <p style="margin: 0; color: #6c757d;">Cybersecurity Expert, Stanford University</p>
                                    <p style="margin: 0; color: #6c757d;">PhD in Computer Science, 15+ years experience</p>
                                </div>
                            </div>
                            <p>"This is the most effective security solution I've seen in my 15 years of research."</p>
                            <button onclick="applyAuthority()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Trust the Expert
                            </button>
                        </div>
                    `;
                    document.body.appendChild(authorityElement);
                },
                
                // Liking - create similarity and familiarity
                liking: () => {
                    const likingElement = document.createElement('div');
                    likingElement.innerHTML = `
                        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>🤝 We're Just Like You!</h3>
                            <p>We're a team of tech enthusiasts who care about privacy and security.</p>
                            <p>We've been in your shoes - frustrated with complex security solutions.</p>
                            <p>That's why we built something simple, effective, and affordable.</p>
                            <p><strong>Join our community of like-minded individuals!</strong></p>
                            <button onclick="applyLiking()" style="background: #17a2b8; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                                Join Our Community
                            </button>
                        </div>
                    `;
                    document.body.appendChild(likingElement);
                },
                
                // Scarcity - limited time and availability
                scarcity: () => {
                    const scarcityElement = document.createElement('div');
                    scarcityElement.innerHTML = `
                        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>⏰ LIMITED TIME OFFER!</h3>
                            <p>This exclusive deal expires in <strong id="scarcity-timer">05:00</strong></p>
                            <p>Only <strong>${Math.floor(Math.random() * 10) + 3} spots remaining</strong> for today's batch.</p>
                            <p>Once this offer expires, you'll have to wait until next month.</p>
                            <p style="color: #856404;"><strong>Don't miss this opportunity!</strong></p>
                            <button onclick="applyScarcity()" style="background: #ffc107; color: #212529; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                Claim My Spot Now
                            </button>
                        </div>
                    `;
                    document.body.appendChild(scarcityElement);
                    
                    // Start scarcity timer
                    let timeLeft = 300;
                    const timerElement = document.getElementById('scarcity-timer');
                    const scarcityInterval = setInterval(() => {
                        timeLeft--;
                        const minutes = Math.floor(timeLeft / 60);
                        const seconds = timeLeft % 60;
                        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                        
                        if (timeLeft <= 0) {
                            clearInterval(scarcityInterval);
                            timerElement.textContent = 'EXPIRED';
                        }
                    }, 1000);
                }
            };
            
            // Implement persuasion technique functions
            window.applyReciprocity = () => {
                console.log('Reciprocity principle applied');
                fetch('/social-engineering/reciprocity', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ principle: 'reciprocity', applied: true })
                });
            };
            
            window.applyCommitment = (event) => {
                event.preventDefault();
                console.log('Commitment and consistency principle applied');
                fetch('/social-engineering/commitment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ principle: 'commitment_consistency', applied: true })
                });
            };
            
            window.applySocialProof = () => {
                console.log('Social proof principle applied');
                fetch('/social-engineering/social-proof', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ principle: 'social_proof', applied: true })
                });
            };
            
            window.applyAuthority = () => {
                console.log('Authority principle applied');
                fetch('/social-engineering/authority', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ principle: 'authority', applied: true })
                });
            };
            
            window.applyLiking = () => {
                console.log('Liking principle applied');
                fetch('/social-engineering/liking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ principle: 'liking', applied: true })
                });
            };
            
            window.applyScarcity = () => {
                console.log('Scarcity principle applied');
                fetch('/social-engineering/scarcity', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ principle: 'scarcity', applied: true })
                });
            };
            
            // Apply persuasion techniques with timing
            setTimeout(() => persuasionTechniques.reciprocity(), 2000);
            setTimeout(() => persuasionTechniques.commitmentConsistency(), 5000);
            setTimeout(() => persuasionTechniques.socialProof(), 8000);
            setTimeout(() => persuasionTechniques.authority(), 11000);
            setTimeout(() => persuasionTechniques.liking(), 14000);
            setTimeout(() => persuasionTechniques.scarcity(), 17000);
        });
        
        this.psychologicalData.persuasionTechniques.push({
            type: 'persuasion_technique_implementation',
            principles: ['reciprocity', 'commitment_consistency', 'social_proof', 'authority', 'liking', 'scarcity'],
            timestamp: new Date().toISOString(),
            description: 'Implemented Cialdini\'s 6 principles of persuasion'
        });
    }

    // Additional methods for other social engineering techniques...
    async exploitSocialProof() {
        console.log('👥 Exploiting social proof...');
        // Implementation for social proof exploitation
    }

    async manipulateAuthority() {
        console.log('👨‍💼 Manipulating authority...');
        // Implementation for authority manipulation
    }

    async createScarcityUrgency() {
        console.log('⏰ Creating scarcity and urgency...');
        // Implementation for scarcity and urgency
    }

    async implementReciprocity() {
        console.log('🎁 Implementing reciprocity...');
        // Implementation for reciprocity
    }

    async exploitCommitmentConsistency() {
        console.log('✅ Exploiting commitment and consistency...');
        // Implementation for commitment and consistency
    }

    async createLikingFactors() {
        console.log('🤝 Creating liking factors...');
        // Implementation for liking factors
    }

    async implementAdvancedManipulation() {
        console.log('🧠 Implementing advanced manipulation...');
        // Implementation for advanced manipulation techniques
    }

    getSummary() {
        return {
            totalTechniques: Object.keys(this.psychologicalData).length - 1, // Exclude timestamp
            cognitiveBiases: this.psychologicalData.cognitiveBiases.length,
            emotionalTriggers: this.psychologicalData.emotionalTriggers.length,
            persuasionTechniques: this.psychologicalData.persuasionTechniques.length,
            timestamp: this.psychologicalData.timestamp
        };
    }
}

module.exports = AdvancedSocialEngineering; 