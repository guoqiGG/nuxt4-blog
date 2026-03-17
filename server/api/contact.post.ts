export default defineEventHandler((event) => {
  if (event.method === 'POST') {
    return {
      success: true,
      message: '消息发送成功！',
      timestamp: new Date().toISOString(),
    }
  }
  
  throw createError({
    statusCode: 405,
    statusMessage: '方法不被允许',
  })
})
