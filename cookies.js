// Cookies Popup Logic
window.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('meliCookiesAccepted') === 'yes') return;

  const popup = document.createElement('div');
  popup.className = 'cookies-popup';
  popup.innerHTML = `
    <img src="cookies.svg" alt="Cookie vectorial">
    <p>Acest site folosește cookie-uri pentru a vă oferi o experiență mai bună. Acceptați utilizarea cookie-urilor?</p>
    <div style="display: flex; gap: 16px; justify-content: center;">
      <button id="accept-cookies">Accept</button>
      <button id="reject-cookies" style="background: #eee; color: #ff9800; border: 2px solid #ff9800;">Refuz</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('accept-cookies').onclick = function () {
    localStorage.setItem('meliCookiesAccepted', 'yes');
    popup.remove();
  };
  document.getElementById('reject-cookies').onclick = function () {
    popup.remove();
  };
}); 