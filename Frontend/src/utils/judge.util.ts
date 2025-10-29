const getLanguageId = (language: string) => {
  switch (language) {
    case 'javascript':
      return 63
    case 'python':
      return 71
    case 'java':
      return 62
    default:
      return 1
  }
}
export { getLanguageId }
