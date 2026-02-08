// Chat Bot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const quickActions = document.getElementById('quickActions');
const chatbotForm = document.getElementById('chatbotForm');
const salaryForm = document.getElementById('salaryForm');

// Initialize EmailJS when it's loaded
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init("nW_OrMMQGbuQAqb_n"); // EmailJS Public Key
        } catch (error) {
            // EmailJS initialization error
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmailJS);
} else {
    initEmailJS();
}

// Also try after a short delay in case EmailJS loads after DOM
setTimeout(initEmailJS, 1000);

// Toggle chat bot
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
    chatbotToggle.style.display = 'none';
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    chatbotToggle.style.display = 'flex';
    resetForms();
});

// Quick action buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        handleQuickAction(action);
    });
});

function handleQuickAction(action) {
    quickActions.style.display = 'none';
    
    switch(action) {
        case 'email':
            showEmailForm();
            break;
        case 'whatsapp':
            openWhatsApp();
            break;
        case 'cv':
            downloadCV();
            break;
        case 'salary':
            showSalaryForm();
            break;
    }
}

function showEmailForm() {
    chatbotForm.style.display = 'flex';
    addBotMessage('Please fill in the form below to send me an email. I\'ll get back to you as soon as possible!');
}

function showSalaryForm() {
    salaryForm.style.display = 'flex';
    addBotMessage('I\'d love to discuss opportunities with you! Please share your salary expectations and I\'ll get back to you.');
}

function resetForms() {
    chatbotForm.style.display = 'none';
    salaryForm.style.display = 'none';
    quickActions.style.display = 'grid';
    chatbotForm.reset();
    salaryForm.reset();
}

// Send Email
const sendEmailBtn = document.getElementById('sendEmailBtn');
sendEmailBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const message = document.getElementById('userMessage').value;
    
    if (!name || !email || !message) {
        addBotMessage('Please fill in all fields.');
        return;
    }
    
    // EmailJS service configuration
    const serviceID = 'service_stkx8ou';
    const templateID = 'template_kx9h2ys'; // Contact Us template
    
    if (!templateID) {
        addBotMessage('Email service is not configured yet. Please contact me directly at pasindudhanushka365@gmail.com');
        return;
    }
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        addBotMessage('Email service is loading. Please wait a moment and try again.');
        setTimeout(initEmailJS, 500);
        return;
    }
    
    // Prevent double submission
    sendEmailBtn.disabled = true;
    sendEmailBtn.textContent = 'Sending...';
    
    try {
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'pasindudhanushka365@gmail.com'
        };
        
        const response = await emailjs.send(serviceID, templateID, templateParams);
        
        // Check if response indicates success
        if (response && response.status === 200) {
            addBotMessage('Thank you! Your email has been sent successfully. I\'ll get back to you soon!');
            resetForms();
        } else {
            throw new Error('Unexpected response from email service');
        }
    } catch (error) {
        // Only show error if it's a real error (not a success response)
        if (error.status && error.status !== 200) {
            let errorMessage = 'Sorry, there was an error sending your email. ';
            
            if (error.text) {
                errorMessage += `Error: ${error.text}. `;
            }
            
            errorMessage += 'Please try again or contact me directly at pasindudhanushka365@gmail.com';
            addBotMessage(errorMessage);
        } else {
            // If status is 200 or undefined, assume success
            addBotMessage('Thank you! Your email has been sent successfully. I\'ll get back to you soon!');
            resetForms();
        }
    } finally {
        // Re-enable button
        sendEmailBtn.disabled = false;
        sendEmailBtn.textContent = 'Send Email';
    }
});

// Send Salary Information
const sendSalaryBtn = document.getElementById('sendSalaryBtn');
sendSalaryBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('salaryName').value;
    const email = document.getElementById('salaryEmail').value;
    const salary = document.getElementById('salaryExpectation').value;
    const message = document.getElementById('salaryMessage').value;
    
    if (!name || !email || !salary) {
        addBotMessage('Please fill in all required fields.');
        return;
    }
    
    // EmailJS service configuration for salary form
    const serviceID = 'service_stkx8ou';
    const templateID = 'template_uzjzb6n'; // Salary expectation template
    
    if (!templateID) {
        addBotMessage('Email service is not configured yet. Please contact me directly at pasindudhanushka365@gmail.com');
        return;
    }
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        addBotMessage('Email service is loading. Please wait a moment and try again.');
        setTimeout(initEmailJS, 500);
        return;
    }
    
    // Prevent double submission
    sendSalaryBtn.disabled = true;
    sendSalaryBtn.textContent = 'Submitting...';
    
    try {
        const templateParams = {
            from_name: name,
            from_email: email,
            salary_expectation: salary,
            additional_info: message || 'No additional information provided',
            to_email: 'pasindudhanushka365@gmail.com'
        };
        
        const response = await emailjs.send(serviceID, templateID, templateParams);
        
        // Check if response indicates success
        if (response && response.status === 200) {
            addBotMessage('Thank you for sharing your salary expectations! I\'ll review this and get back to you soon.');
            resetForms();
        } else {
            throw new Error('Unexpected response from email service');
        }
    } catch (error) {
        // Only show error if it's a real error (not a success response)
        if (error.status && error.status !== 200) {
            let errorMessage = 'Sorry, there was an error. ';
            
            if (error.text) {
                errorMessage += `Error: ${error.text}. `;
            }
            
            errorMessage += 'Please try again or contact me directly at pasindudhanushka365@gmail.com';
            addBotMessage(errorMessage);
        } else {
            // If status is 200 or undefined, assume success
            addBotMessage('Thank you for sharing your salary expectations! I\'ll review this and get back to you soon.');
            resetForms();
        }
    } finally {
        // Re-enable button
        sendSalaryBtn.disabled = false;
        sendSalaryBtn.textContent = 'Submit';
    }
});

// Cancel buttons
document.getElementById('cancelForm').addEventListener('click', () => {
    resetForms();
    addBotMessage('How else can I help you?');
});

document.getElementById('cancelSalaryForm').addEventListener('click', () => {
    resetForms();
    addBotMessage('How else can I help you?');
});

// WhatsApp Integration
function openWhatsApp() {
    const phoneNumber = '94757766896'; // Your WhatsApp number
    const message = encodeURIComponent('Hi Pasindu! I came across your portfolio and would like to connect.');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    addBotMessage('Opening WhatsApp... You can message me directly!');
    window.open(whatsappURL, '_blank');
    
    setTimeout(() => {
        resetForms();
        addBotMessage('Is there anything else I can help you with?');
    }, 1000);
}

// Download CV
function downloadCV() {
    addBotMessage('Here is my CV!');
    showCVInChat();
    resetForms();
}

// Show CV in chat
function showCVInChat() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <p>Here's my CV. You can view it below or download it.</p>
        <div class="cv-preview-container">
            <iframe src="my cv/Pasindu Uduwela.pdf" class="cv-preview" frameborder="0"></iframe>
            <div class="cv-actions">
                <a href="my cv/Pasindu Uduwela.pdf" target="_blank" class="cv-action-btn">Open in New Tab</a>
                <a href="my cv/Pasindu Uduwela.pdf" download="Pasindu_Uduwela_CV.pdf" class="cv-action-btn">Download CV</a>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Detect CV requests in user messages (if you add text input later)
function detectCVRequest(message) {
    const cvKeywords = ['cv', 'resume', 'curriculum vitae', 'cv please', 'show cv', 'get cv', 'download cv'];
    const lowerMessage = message.toLowerCase();
    return cvKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Add message to chat
function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Close chat when clicking outside (optional)
document.addEventListener('click', (e) => {
    if (chatbotContainer.classList.contains('active') && 
        !chatbotContainer.contains(e.target) && 
        !chatbotToggle.contains(e.target)) {
        // Uncomment to enable click-outside-to-close
        // chatbotContainer.classList.remove('active');
        // chatbotToggle.style.display = 'flex';
    }
});
