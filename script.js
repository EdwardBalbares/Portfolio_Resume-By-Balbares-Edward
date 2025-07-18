// ========== Menu Icon Navbar ========== //
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });
}

// ========== Scroll Sections Active Link & Sticky Header ========== //
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
window.addEventListener('scroll', () => {
  let top = window.scrollY;
  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector('header nav a[href*=' + id + ']');
      if (activeLink) activeLink.classList.add('active');
    }
  });
  // Sticky header
  const header = document.querySelector('.header');
  if (header) header.classList.toggle('sticky', window.scrollY > 100);
  // Remove menu on scroll
  if (menuIcon) menuIcon.classList.remove('bx-x');
  if (navbar) navbar.classList.remove('active');
});

// ========== Dark Mode Toggle ========== //
const darkModeIcon = document.getElementById('darkMode-icon');
if (darkModeIcon) {
  darkModeIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// ========== Scroll To Top Button ========== //
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  scrollToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollToTopBtn.classList.add('scrolling');
    setTimeout(() => scrollToTopBtn.classList.remove('scrolling'), 1000);
  });
}

// ========== Message Board (localStorage) ========== //
let staticMessages = [];
let nextMessageId = 1;
function initializeMessages() {
  try {
    const savedMessages = localStorage.getItem('portfolioMessages');
    const savedNextId = localStorage.getItem('nextMessageId');
    if (savedMessages) staticMessages = JSON.parse(savedMessages);
    if (savedNextId) nextMessageId = parseInt(savedNextId);
  } catch (error) {
    staticMessages = [];
    nextMessageId = 1;
  }
}
function saveMessages() {
  try {
    localStorage.setItem('portfolioMessages', JSON.stringify(staticMessages));
    localStorage.setItem('nextMessageId', nextMessageId.toString());
    updateMessageCount();
  } catch (error) {}
}
function updateMessageCount() {
  const messageBoardTitle = document.querySelector('.message-board-header h3');
  if (messageBoardTitle) {
    const count = staticMessages.length;
    messageBoardTitle.textContent = `Message Board (${count} message${count !== 1 ? 's' : ''})`;
  }
}
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function displayMessages(messages) {
  const messagesContainer = document.getElementById('messagesContainer');
  if (!messagesContainer) return;
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
  setTimeout(() => {
    document.querySelectorAll('.message-item.animate-in').forEach(el => el.classList.remove('animate-in'));
  }, 400);
}
function deleteMessage(messageId) {
  if (confirm('Are you sure you want to delete this message?')) {
    staticMessages = staticMessages.filter(msg => msg.Message_ID !== messageId);
    saveMessages();
    displayMessages(staticMessages);
    showNotification('Message deleted successfully!', 'success');
  }
}
function submitMessage() {
  const form = document.getElementById('messageForm');
  const formData = new FormData(form);
  const fullName = formData.get('full_name').trim();
  const email = formData.get('email').trim();
  const messageContent = formData.get('message_content').trim();
  if (!fullName || !email || !messageContent) {
    showNotification('All fields are required', 'error');
    return;
  }
  if (fullName.length < 2 || fullName.length > 50) {
    showNotification('Name must be 2-50 characters', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  if (messageContent.length < 10 || messageContent.length > 500) {
    showNotification('Message must be 10-500 characters', 'error');
    return;
  }
  const newMessage = {
    Message_ID: nextMessageId++,
    Full_Name: fullName,
    Email: email,
    Message_Content: messageContent,
    Date_posted: new Date().toISOString().split('T')[0]
  };
  staticMessages.unshift(newMessage);
  saveMessages();
  displayMessages(staticMessages);
  showNotification('Message sent successfully!', 'success');
  form.reset();
  const charCount = document.getElementById('charCount');
  if (charCount) charCount.textContent = '0';
}
function showNotification(message, type) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()" class="notification-close"><i class='bx bx-x'></i></button>`;
  document.body.appendChild(notification);
  setTimeout(() => { if (notification.parentElement) notification.remove(); }, 4000);
}
function clearAllMessages() {
  if (confirm('Are you sure you want to delete ALL messages?')) {
    staticMessages = [];
    nextMessageId = 1;
    saveMessages();
    displayMessages(staticMessages);
    showNotification('All messages have been deleted!', 'success');
  }
}
window.deleteMessage = deleteMessage;
window.showNotification = showNotification;
window.submitMessage = submitMessage;
window.clearAllMessages = clearAllMessages;

document.addEventListener('DOMContentLoaded', function() {
  // Message form submit
  const messageForm = document.getElementById('messageForm');
  if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitMessage();
    });
    // Character count
    const textarea = messageForm.querySelector('textarea[name="message_content"]');
    const charCount = document.getElementById('charCount');
    if (textarea && charCount) {
      textarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        charCount.classList.remove('warning', 'danger');
        if (length > 400) charCount.classList.add('danger');
        else if (length > 300) charCount.classList.add('warning');
      });
    }
  }
  // Initialize messages
  initializeMessages();
  displayMessages(staticMessages);
});
