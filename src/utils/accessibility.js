// Accessibility utilities

export const accessibilityUtils = {
    // Announce to screen readers
    announce: (message, priority = 'polite') => {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },

    // Focus trap for modals
    trapFocus: (element) => {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTab = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        element.addEventListener('keydown', handleTab);
        firstElement?.focus();

        return () => {
            element.removeEventListener('keydown', handleTab);
        };
    },

    // Skip to main content link
    createSkipLink: () => {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg';
        skipLink.textContent = 'Skip to main content';
        return skipLink;
    }
};

// Keyboard navigation helpers
export const keyboardUtils = {
    // Handle Enter key
    handleEnter: (callback) => (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            callback();
        }
    },

    // Handle Escape key
    handleEscape: (callback) => (e) => {
        if (e.key === 'Escape') {
            callback();
        }
    },

    // Handle Arrow keys for navigation
    handleArrows: (onUp, onDown, onLeft, onRight) => (e) => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                onUp?.();
                break;
            case 'ArrowDown':
                e.preventDefault();
                onDown?.();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                onLeft?.();
                break;
            case 'ArrowRight':
                e.preventDefault();
                onRight?.();
                break;
        }
    }
};

