import { useEffect, useRef } from 'react'

/**
 * Custom hook for managing focus in modals and other interactive components
 * @param {boolean} isOpen - Whether the modal/component is open
 * @param {string} focusSelector - CSS selector for the element to focus when opened
 */
export function useFocusManagement(isOpen, focusSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') {
  const containerRef = useRef(null)
  const previousActiveElement = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement
      
      // Focus the first focusable element in the modal
      if (containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(focusSelector)
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }
    } else {
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, focusSelector])

  return containerRef
}

/**
 * Hook for managing keyboard navigation in modals
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to call when modal should close
 */
export function useKeyboardNavigation(isOpen, onClose) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          onClose()
          break
        case 'Tab':
          // Trap focus within modal
          const modal = document.querySelector('[role="dialog"]')
          if (modal) {
            const focusableElements = modal.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (event.shiftKey) {
              // Shift + Tab
              if (document.activeElement === firstElement) {
                event.preventDefault()
                lastElement?.focus()
              }
            } else {
              // Tab
              if (document.activeElement === lastElement) {
                event.preventDefault()
                firstElement?.focus()
              }
            }
          }
          break
        default:
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])
}

/**
 * Hook for managing ARIA live regions for screen readers
 */
export function useAriaLive() {
  const announce = (message, priority = 'polite') => {
    const liveRegion = document.getElementById('aria-live-region')
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.textContent = message
      
      // Clear the message after a short delay
      setTimeout(() => {
        liveRegion.textContent = ''
      }, 1000)
    }
  }

  return { announce }
}
