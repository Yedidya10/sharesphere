  // get UTC date string for signature
  const utcDateString = (ms: number) => {
    return new Date(ms)
      .toISOString()
      .replace(/-/g, '/')
      .replace(/T/, ' ')
      .replace(/\.\d+Z$/, '+00:00')
  }

  // expire 1 hour from now (this must be milliseconds)
  const expires = utcDateString(Date.now() + 1 * 60 * 60 * 1000)

  export default expires