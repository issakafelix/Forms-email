
const container = document.createElement('div');
container.style.cssText = `
  font-family: Arial, sans-serif;
  background: grey;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const formBox = document.createElement('div');
formBox.style.cssText = `
  background-color: light-grey;
  padding: 30px;
  box-shadow: 5px 15px 15px rgba(1,3,4,0.3);
  width: 350px;
  box-sizing: border-box;
`;

const title = document.createElement('h2');
title.textContent = 'Contact us';
title.style.textAlign = 'center';
title.style.color = '#333';
formBox.appendChild(title);

const form = document.createElement('form');
form.id = 'emailform';

const createField = (labelText, inputType, inputId) => {
  const label = document.createElement('label');
  label.textContent = labelText;
  label.htmlFor = inputId;
  label.style.display = 'block';
  label.style.marginTop = '10px';
  label.style.fontWeight = 'bold';

  let input;
  if (inputType === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 5;
  } else {
    input = document.createElement('input');
    input.type = inputType;
  }

  input.id = inputId;
  input.name = inputId;
  input.required = true;
  input.style.cssText = `
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  `;

  form.appendChild(label);
  form.appendChild(input);
};

createField('Name', 'text', 'user_name');
createField('Email', 'email', 'user_email');
createField('Message', 'textarea', 'message');

const button = document.createElement('button');
button.textContent = 'Send Email';
button.type = 'submit';
button.style.cssText = `
  margin-top: 15px;
  width: 100%;
  background-color: #2b72fb;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;
button.addEventListener('mouseenter', () => button.style.backgroundColor = '#1f5edb');
button.addEventListener('mouseleave', () => button.style.backgroundColor = '#2b72fb');

form.appendChild(button);

const status = document.createElement('p');
status.id = 'status';
status.style.textAlign = 'center';
status.style.marginTop = '10px';
status.style.fontWeight = 'bold';
status.textContent = '';

form.addEventListener('submit', function(e) {
  e.preventDefault();
  status.textContent = 'Sending...';

  const templateParams = {
    from_name: document.getElementById('user_name').value,
    from_email: document.getElementById('user_email').value,
    message: document.getElementById('message').value
  };

  if (window.emailjs && typeof emailjs.send === 'function') {

    emailjs.send('service_en0b78s', 'template_wvf1vuw', templateParams)
      .then(() => {
        status.textContent = 'Email sent successfully!';
        form.reset();
      })
      .catch(error => {
        console.error(error);
        status.textContent = 'Failed to send email. Try again.';
      });
  } else {
    console.warn('emailjs not loaded');
    status.textContent = 'Email service not configured. Check console.';
  }
});

formBox.appendChild(form);
formBox.appendChild(status);
container.appendChild(formBox);
document.body.style.margin = '0';
document.body.appendChild(container);


