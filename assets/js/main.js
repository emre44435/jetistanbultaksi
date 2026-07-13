(() => {
  'use strict';

  const initSite = () => {
    const header = document.querySelector('[data-header]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const reservationForm = document.getElementById('reservation-form');
    const formStatus = document.getElementById('form-status');
    const travelDate = document.getElementById('travel-date');
    const yearElements = document.querySelectorAll('[data-current-year]');
    const desktopMedia = window.matchMedia('(min-width: 769px)');

    let lastFocusedElement = null;
    let lockedScrollY = 0;
    let scrollTicking = false;

    const updateHeader = () => {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      }
      scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateHeader);
        scrollTicking = true;
      }
    }, { passive: true });
    updateHeader();

    const isMenuOpen = () => menuToggle?.getAttribute('aria-expanded') === 'true';

    const getMenuFocusableElements = () => {
      if (!menuToggle || !mobileMenu) return [];
      const menuItems = Array.from(
        mobileMenu.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      return [menuToggle, ...menuItems].filter((element) => element instanceof HTMLElement && !element.hidden);
    };

    const lockPageScroll = () => {
      lockedScrollY = window.scrollY;
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.classList.add('menu-open');
    };

    const unlockPageScroll = () => {
      document.body.classList.remove('menu-open');
      document.body.style.removeProperty('top');
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, lockedScrollY);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };

    const openMenu = () => {
      if (!menuToggle || !mobileMenu || desktopMedia.matches) return;

      lastFocusedElement = document.activeElement;
      mobileMenu.hidden = false;
      mobileMenu.setAttribute('aria-hidden', 'false');
      mobileMenu.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Menüyü kapat');
      lockPageScroll();

      window.requestAnimationFrame(() => {
        const firstMenuLink = mobileMenu.querySelector('a[href]');
        if (firstMenuLink instanceof HTMLElement) firstMenuLink.focus();
      });
    };

    const closeMenu = (restoreFocus = false) => {
      if (!menuToggle || !mobileMenu || !isMenuOpen()) return;

      mobileMenu.classList.remove('is-open');
      mobileMenu.hidden = true;
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Menüyü aç');
      unlockPageScroll();

      if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    if (menuToggle && mobileMenu) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Menüyü aç');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.hidden = true;

      menuToggle.addEventListener('click', () => {
        if (isMenuOpen()) closeMenu(true);
        else openMenu();
      });

      mobileMenu.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const clickedLink = target.closest('a[href^="#"]');
        if (clickedLink) closeMenu(false);
      });

      document.addEventListener('keydown', (event) => {
        if (!isMenuOpen()) return;

        if (event.key === 'Escape') {
          event.preventDefault();
          closeMenu(true);
          return;
        }

        if (event.key === 'Tab') {
          const focusable = getMenuFocusableElements();
          if (!focusable.length) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      });

      const handleDesktopChange = (event) => {
        if (event.matches && isMenuOpen()) closeMenu(false);
      };

      if (typeof desktopMedia.addEventListener === 'function') {
        desktopMedia.addEventListener('change', handleDesktopChange);
      } else if (typeof desktopMedia.addListener === 'function') {
        desktopMedia.addListener(handleDesktopChange);
      }

      window.addEventListener('pageshow', () => {
        if (isMenuOpen()) closeMenu(false);
      });

      window.addEventListener('hashchange', () => {
        if (isMenuOpen()) closeMenu(false);
      });
    }

    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (travelDate) {
      travelDate.min = formatLocalDate(new Date());
    }

    const setFieldError = (field, message) => {
      field.setAttribute('aria-invalid', 'true');
      if (formStatus) formStatus.textContent = message;
    };

    const clearFieldError = (field) => {
      field.removeAttribute('aria-invalid');
      if (formStatus) {
        formStatus.textContent = '';
        formStatus.classList.remove('is-success');
      }
    };

    const validateReservationForm = () => {
      if (!reservationForm || !formStatus) return false;

      formStatus.textContent = '';
      formStatus.classList.remove('is-success');
      const fields = Array.from(reservationForm.querySelectorAll('input, select'));
      fields.forEach((field) => field.removeAttribute('aria-invalid'));

      const requiredFields = [
        ['pickup', 'Lütfen alış noktasını yazın.'],
        ['destination', 'Lütfen varış noktasını yazın.'],
        ['travel-date', 'Lütfen yolculuk tarihini seçin.'],
        ['travel-time', 'Lütfen yolculuk saatini seçin.'],
        ['passengers', 'Lütfen yolcu sayısını seçin.'],
        ['full-name', 'Lütfen adınızı ve soyadınızı yazın.'],
        ['phone', 'Lütfen telefon numaranızı yazın.']
      ];

      for (const [id, message] of requiredFields) {
        const field = document.getElementById(id);
        if (!field || !field.value.trim()) {
          if (field) {
            setFieldError(field, message);
            field.focus();
          }
          return false;
        }
      }

      const fullName = document.getElementById('full-name');
      if (fullName && fullName.value.trim().length < 3) {
        setFieldError(fullName, 'Ad ve soyad alanı en az 3 karakter olmalıdır.');
        fullName.focus();
        return false;
      }

      if (travelDate && travelDate.value < travelDate.min) {
        setFieldError(travelDate, 'Geçmiş bir tarih seçemezsiniz.');
        travelDate.focus();
        return false;
      }

      const phoneField = document.getElementById('phone');
      if (phoneField) {
        const phoneDigits = phoneField.value.replace(/\D/g, '');
        if (phoneDigits.length < 10 || phoneDigits.length > 14) {
          setFieldError(phoneField, 'Lütfen geçerli bir telefon numarası yazın.');
          phoneField.focus();
          return false;
        }
      }

      return true;
    };

    if (reservationForm) {
      reservationForm.querySelectorAll('input, select').forEach((field) => {
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('change', () => clearFieldError(field));
      });

      reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validateReservationForm()) return;

        const formData = new FormData(reservationForm);
        const message = [
          'Merhaba JETT İstanbul Taksi, rezervasyon oluşturmak istiyorum.',
          '',
          `Ad Soyad: ${String(formData.get('fullName')).trim()}`,
          `Telefon: ${String(formData.get('phone')).trim()}`,
          `Nereden: ${String(formData.get('pickup')).trim()}`,
          `Nereye: ${String(formData.get('destination')).trim()}`,
          `Tarih: ${String(formData.get('travelDate')).trim()}`,
          `Saat: ${String(formData.get('travelTime')).trim()}`,
          `Yolcu Sayısı: ${String(formData.get('passengers')).trim()}`
        ].join('\n');

        const whatsappUrl = `https://wa.me/905366161263?text=${encodeURIComponent(message)}`;
        const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        if (whatsappWindow) {
          whatsappWindow.opener = null;
        } else {
          window.location.assign(whatsappUrl);
        }

        formStatus.textContent = 'Rezervasyon bilgileriniz WhatsApp mesajına hazırlandı.';
        formStatus.classList.add('is-success');
      });
    }

    document.querySelectorAll('.faq-item').forEach((item) => {
      const summary = item.querySelector('summary');
      if (!summary) return;

      const syncExpandedState = () => {
        summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      };

      item.addEventListener('toggle', syncExpandedState);
      syncExpandedState();
    });

    const currentYear = String(new Date().getFullYear());
    yearElements.forEach((element) => {
      element.textContent = currentYear;
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite, { once: true });
  } else {
    initSite();
  }
})();
