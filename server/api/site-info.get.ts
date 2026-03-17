export default defineEventHandler(() => {
  return {
    title: '我的个人博客',
    author: '开发者',
    description: '记录技术成长与思考',
    email: 'admin@example.com',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'Twitter', url: 'https://twitter.com' },
      { name: 'LinkedIn', url: 'https://linkedin.com' },
    ],
  }
})
