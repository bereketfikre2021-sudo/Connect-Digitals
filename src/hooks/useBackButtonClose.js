import { useEffect, useRef, useCallback } from 'react'

/**
 * Hook to close modals with browser/device back button (mobile & tablet)
 * Pushes a history state when modal opens; popstate fires when user presses back
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to call when modal should close
 * @returns {function} closeModal - Call this for programmatic close (ESC, button, backdrop) - triggers history.back() then onClose
 */
export function useBackButtonClose(isOpen, onClose) {
  const hasPushedState = useRef(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return

    const handlePopState = () => {
      hasPushedState.current = false
      onCloseRef.current()
    }

    history.pushState({ modal: true }, '', window.location.href)
    hasPushedState.current = true
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      if (hasPushedState.current) {
        hasPushedState.current = false
        history.back()
      }
    }
  }, [isOpen]) // Only re-run when isOpen changes; onClose via ref

  const closeModal = useCallback(() => {
    if (hasPushedState.current) {
      history.back()
    } else {
      onCloseRef.current()
    }
  }, [])

  return closeModal
}
