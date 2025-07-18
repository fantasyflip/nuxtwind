import { useLogger } from '@nuxt/kit'

export function nxwLog(
  logActive: boolean | undefined,
  message: string,
  type: 'info' | 'success' | 'warn' | 'error' = 'info',
) {
  if (logActive || type === 'error' || type === 'warn') {
    const logger = useLogger('nuxtwind')
    if (type === 'info') logger.info(message)
    if (type === 'success') logger.success(message)
    if (type === 'warn') logger.warn(message)
    if (type === 'error') logger.error(message)
  }
}
