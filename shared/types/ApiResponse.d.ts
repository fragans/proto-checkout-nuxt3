interface ApiResponse<D = null,R = null> {
  success: true,
  code: 200,
  message: string,
  meta: {
    cache: true,
    time: 1754805816
  },
  data: D,
  result: R
}