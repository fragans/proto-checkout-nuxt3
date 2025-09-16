// server/middleware/cookies-dev.ts
export default defineEventHandler((event) => {
  const {
    DEV_USER_ID,
    DEV_USER_GUID,
    DEV_USER_USERNAME,
    DEV_USER_FIRST_NAME,
    DEV_USER_LAST_NAME,
    DEV_USER_REFRESH_TOKEN,
    ENV_MODE,
    SESSION_DOMAIN,
  } = process.env

  if (ENV_MODE === 'local1') {
    const kantormu = getCookie(event, 'kantormu')
    if (!kantormu) {
      const opts = {
        domain: SESSION_DOMAIN,
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 365 hari
        // httpOnly: true
      }

      const kantormuValue = JSON.stringify({
        version: '1.1.0',
        user: {
          id: DEV_USER_ID,
          guid: DEV_USER_GUID,
          username: DEV_USER_USERNAME,
          first_name: DEV_USER_FIRST_NAME,
          last_name: DEV_USER_LAST_NAME,
          created_at: '2019-12-15 10:19:32 +0000 UTC',
        },
      })

      const list = [
        {
          name: 'kantormu',
          value: kantormuValue,
          opts,
        },
        {
          name: 'kompas._token_refresh',
          value: DEV_USER_REFRESH_TOKEN,
          opts,
        },
      ]
      list.forEach((cookie) => {
        setCookie(event, cookie.name, cookie.value as string, opts)
      })
    }
    return
  }
})
