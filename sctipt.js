/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Message storage using localStorage with better error handling
let staticMessages = [];
let nextMessageId = 1;

// Initialize messages from localStorage with error handling
function initializeMessages() {
    try {
        const savedMessages = localStorage.getItem('portfolioMessages');
        const savedNextId = localStorage.getItem('nextMessageId');
        
        if (savedMessages) {
            staticMessages = JSON.parse(savedMessages);
        }
        
        if (savedNextId) {
            nextMessageId = parseInt(savedNextId);
        }
        
        console.log(`Loaded ${staticMessages.length} messages from localStorage`);
    } catch (error) {
        console.error('Error loading messages from localStorage:', error);
        // Reset to default if there's an error
        staticMessages = [];
        nextMessageId = 1;
    }
}

// Initialize messages on page load
initializeMessages();

if (menuIcon && navbar) {
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
}

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');
    if (header) {
    header.classList.toggle('sticky', window.scrollY > 100);
    }

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    if (menuIcon) {
    menuIcon.classList.remove('bx-x');
    }
    if (navbar) {
    navbar.classList.remove('active');
    }
};

/*========== swiper ==========*/
if (typeof Swiper !== 'undefined') {
    try {
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
    } catch (error) {
        console.warn('Swiper initialization failed:', error);
    }
}

/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

if (darkModeIcon) {
darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};
}

/*========== ScrollReveal Animations ==========*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '60px',
        duration: 1200,
        delay: 200,
        reset: false
    });
    sr.reveal('.home-content, .home-img', { origin: 'top', interval: 200 });
    sr.reveal('.about-img', { origin: 'left' });
    sr.reveal('.about-content', { origin: 'right' });
    sr.reveal('.services-container, .portfolio-container, .resume-container, .contact-container', { origin: 'bottom', interval: 200 });
    sr.reveal('.footer', { origin: 'bottom' });
}

/*========== Utility Functions ==========*/
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Save messages to localStorage with better error handling
function saveMessages() {
    try {
        localStorage.setItem('portfolioMessages', JSON.stringify(staticMessages));
        localStorage.setItem('nextMessageId', nextMessageId.toString());
        console.log(`Saved ${staticMessages.length} messages to localStorage`);
        updateMessageCount();
    } catch (error) {
        console.error('Error saving messages to localStorage:', error);
        showNotification('Error saving message. Please try again.', 'error');
    }
}

// Update message count display
function updateMessageCount() {
    const messageBoardTitle = document.querySelector('.message-board-header h3');
    if (messageBoardTitle) {
        const count = staticMessages.length;
        messageBoardTitle.textContent = `Message Board (${count} message${count !== 1 ? 's' : ''})`;
    }
}

/*========== Message Board Functions ==========*/
function displayMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) {
        console.error('Messages container not found!');
        return;
    }

    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="no-messages">No messages yet. Be the first to leave a message!</div>';
        updateMessageCount();
        return;
    }

    let html = '';
    messages.forEach(message => {
        html += `
            <div class="message-item animate-in" data-message-id="${message.Message_ID}">
                <div class="message-header">
                    <div class="message-info">
                        <span class="message-author">${escapeHtml(message.Full_Name)}</span>
                        <span class="message-date">${formatDate(message.Date_posted)}</span>
                    </div>
                    <div class="message-actions">
                        <button class="edit-btn" onclick="editMessage(${message.Message_ID}, '${escapeHtml(message.Full_Name)}', '${escapeHtml(message.Email)}', '${escapeHtml(message.Message_Content)}')" title="Edit message">
                            <i class='bx bx-edit-alt'></i>
                        </button>
                        <button class="delete-btn" onclick="deleteMessage(${message.Message_ID})" title="Delete message">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
                <div class="message-content">${escapeHtml(message.Message_Content)}</div>
            </div>
        `;
    });

    messagesContainer.innerHTML = html;
    updateMessageCount();

    // Remove animation class after animation completes
    setTimeout(() => {
        document.querySelectorAll('.message-item.animate-in').forEach(el => {
            el.classList.remove('animate-in');
        });
    }, 400);
}

function deleteMessage(messageId) {
    if (confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
        // Remove from static storage
        staticMessages = staticMessages.filter(msg => msg.Message_ID !== messageId);
        
        // Save to localStorage
        saveMessages();

        // Animate out
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
        if (messageElement) {
            messageElement.classList.add('animate-out');
            setTimeout(() => {
                displayMessages(staticMessages);
            }, 350);
        } else {
            displayMessages(staticMessages);
        }

        // Show success message
        showNotification('Message deleted successfully!', 'success');
    }
}

function editMessage(messageId, fullName, email, messageContent) {
    // Create modal HTML
    const modalHTML = `
        <div class="edit-modal" id="editModal">
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h3>Edit Message</h3>
                    <button class="close-btn" onclick="closeEditModal()">
                        <i class='bx bx-x'></i>
                    </button>
                </div>
                <form id="editMessageForm">
                    <input type="hidden" name="message_id" value="${messageId}">
                    <div class="input-box">
                        <input type="text" name="full_name" placeholder="Full Name" value="${fullName}" required>
                        <input type="email" name="email" placeholder="Email Address" value="${email}" required>
                    </div>
                    <textarea name="message_content" cols="30" rows="10" placeholder="Your Message" required>${messageContent}</textarea>
                    <div class="edit-form-actions">
                        <button type="button" class="btn cancel-btn" onclick="closeEditModal()">Cancel</button>
                        <button type="submit" class="btn">Update Message</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listener to form
    document.getElementById('editMessageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateMessage();
    });
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = document.querySelector('#editModal input[name="full_name"]');
        if (firstInput) firstInput.focus();
    }, 100);
}

function updateMessage() {
    const form = document.getElementById('editMessageForm');
    const formData = new FormData(form);
    
    const messageId = parseInt(formData.get('message_id'));
    const fullName = formData.get('full_name');
    const email = formData.get('email');
    const messageContent = formData.get('message_content');
    
    // Validate inputs
    if (!fullName || !email || !messageContent) {
        showNotification('All fields are required', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Update message in static storage
    const messageIndex = staticMessages.findIndex(msg => msg.Message_ID === messageId);
    if (messageIndex !== -1) {
        staticMessages[messageIndex] = {
            ...staticMessages[messageIndex],
            Full_Name: fullName,
            Email: email,
            Message_Content: messageContent
        };
        
        // Save to localStorage
        saveMessages();
        
        // Update display
        displayMessages(staticMessages);
        
        // Show success message
        showNotification('Message updated successfully!', 'success');
        closeEditModal();
    } else {
        showNotification('Message not found', 'error');
    }
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.remove();
    }
}

function submitMessage() {
    const form = document.getElementById('messageForm');
    const formData = new FormData(form);
    
    const fullName = formData.get('full_name').trim();
    const email = formData.get('email').trim();
    const messageContent = formData.get('message_content').trim();
    
    // Enhanced validation
    if (!fullName || !email || !messageContent) {
        showNotification('All fields are required', 'error');
        return;
    }
    
    if (fullName.length < 2) {
        showNotification('Name must be at least 2 characters long', 'error');
        return;
    }
    
    if (fullName.length > 50) {
        showNotification('Name must be less than 50 characters', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (messageContent.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return;
    }
    
    if (messageContent.length > 500) {
        showNotification('Message must be less than 500 characters', 'error');
        return;
    }
    
    // Add new message to static storage
    const newMessage = {
        Message_ID: nextMessageId++,
        Full_Name: fullName,
        Email: email,
        Message_Content: messageContent,
        Date_posted: new Date().toISOString().split('T')[0]
    };
    
    staticMessages.unshift(newMessage);
    
    // Save to localStorage
    saveMessages();
    
    // Update display
    displayMessages(staticMessages);
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    form.reset();
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class='bx bx-x'></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/*========== Image Handling and Optimization ==========*/
function initImageHandling() {
    // Handle image loading
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Add loading event listeners
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });

        img.addEventListener('error', function() {
            this.style.display = 'none';
            this.parentElement.innerHTML += `
                <div class="image-error">
                    <i class='bx bx-image'></i>
                    <p>Image not available</p>
                </div>
            `;
        });

        // Add intersection observer for lazy loading
        if (img.loading === 'lazy') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(img);
        }
    });
}

/*========== Initialize Everything ==========*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized successfully!');

    // Handle form submission
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitMessage();
        });
        
        // Add character count functionality
        const textarea = messageForm.querySelector('textarea[name="message_content"]');
        const charCount = document.getElementById('charCount');
        
        if (textarea && charCount) {
            textarea.addEventListener('input', function() {
                const length = this.value.length;
                charCount.textContent = length;
                
                // Update character count styling
                charCount.classList.remove('warning', 'danger');
                if (length > 400) {
                    charCount.classList.add('danger');
                } else if (length > 300) {
                    charCount.classList.add('warning');
                }
            });
        }
    }

    // Initialize messages from localStorage
    setTimeout(() => {
        displayMessages(staticMessages);
    }, 100);

    // Initialize scroll to top functionality
    initScrollToTop();

    // Initialize image handling
    initImageHandling();

    // Home image hover effect
    const homeImage = document.querySelector('.home-img img');
    if (homeImage) {
        homeImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 3rem rgba(0, 0, 0, 0.2)';
        });

        homeImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 2rem rgba(0, 0, 0, 0.1)';
        });
    }
});

/*========== Scroll to Top Functionality ==========*/
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToTop();
        });
    }
}

function smoothScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.classList.add('scrolling');
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Remove scrolling class after animation
    setTimeout(() => {
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.remove('scrolling');
        }
    }, 1000);
}

function clearAllMessages() {
    if (confirm('Are you sure you want to delete ALL messages? This action cannot be undone.')) {
        staticMessages = [];
        nextMessageId = 1;
        saveMessages();
        displayMessages(staticMessages);
        showNotification('All messages have been deleted!', 'success');
    }
}

/*========== Make Functions Global ==========*/
window.deleteMessage = deleteMessage;
window.editMessage = editMessage;
window.updateMessage = updateMessage;
window.closeEditModal = closeEditModal;
window.showNotification = showNotification;
window.submitMessage = submitMessage;
window.clearAllMessages = clearAllMessages; 