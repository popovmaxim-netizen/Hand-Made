// ===== VALIDATION.JS — Validare formular contact =====

(function initValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Curățăm erorile anterioare
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

    // Funcție helper validare câmp
    function validateField(id, condition, message) {
      const el = document.getElementById(id);
      const feedback = el.nextElementSibling;
      if (!condition(el.value.trim())) {
        el.classList.add('is-invalid');
        if (feedback && feedback.classList.contains('invalid-feedback')) {
          feedback.textContent = message;
        }
        valid = false;
      } else {
        el.classList.add('is-valid');
      }
    }

    // Validăm fiecare câmp
    validateField('inputNume', v => v.length >= 3, 'Introduceți minim 3 caractere.');
    validateField('inputEmail', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Email invalid.');
    validateField('inputTelefon', v => /^[\d\s\+\-\(\)]{7,}$/.test(v), 'Telefon invalid.');
    validateField('inputTip', v => v !== '', 'Selectați tipul de produs.');
    validateField('inputDescriere', v => v.length >= 10, 'Descrieți dorința (minim 10 caractere).');
    validateField('inputBuget', v => parseFloat(v) > 0, 'Introduceți un buget valid.');

    if (valid) {
      // Afișăm mesaj de succes
      const successMsg = document.getElementById('successMessage');
      if (successMsg) {
        successMsg.style.display = 'block';
        form.reset();
        form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
      }
    }
  });
})();
