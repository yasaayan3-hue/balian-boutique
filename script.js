// ------------------ Feedback System ------------------
const form = document.getElementById('feedbackForm');
const list = document.getElementById('feedbackList');
let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

function displayFeedbacks() {
  list.innerHTML = '';
  feedbacks.forEach((fb, index) => {
    const div = document.createElement('div');
    div.className = 'feedback-card';
    div.innerHTML = `
      <div class="feedback-header">
        <div class="avatar">${fb.name.charAt(0).toUpperCase()}</div>
        <div>
          <div class="feedback-name">${fb.name}</div>
          <div class="feedback-date">${fb.date}</div>
        </div>
      </div>
      <div class="feedback-text">${fb.text}</div>
      ${fb.reply ? `<div class="reply"><em>Reply:</em> ${fb.reply}</div>` : ''}
      <div class="feedback-actions">
        <button onclick="replyFeedback(${index})">Reply</button>
        <button onclick="deleteFeedback(${index})">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const text = document.getElementById('feedbackText').value.trim();
  if (name && text) {
    const date = new Date().toLocaleDateString();
    feedbacks.push({ name, text, date });
    form.reset();
    displayFeedbacks();
  }
});

function deleteFeedback(index) {
  if (confirm('Delete this feedback?')) {
    feedbacks.splice(index, 1);
    displayFeedbacks();
  }
}

function replyFeedback(index) {
  const reply = prompt('Enter your reply:');
  if (reply) {
    feedbacks[index].reply = reply;
    displayFeedbacks();
  }
}

displayFeedbacks();
