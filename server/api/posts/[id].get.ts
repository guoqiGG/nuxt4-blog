export default defineEventHandler((event) => {
  const id = event.context.params?.id
  
  const posts = [
    {
      id: 1,
      title: 'Nuxt 4 入门指南',
      excerpt: '本文将带你快速入门 Nuxt 4，了解其核心概念和基本用法',
      content: 'Nuxt 4 是 Vue 生态系统中最强大的框架之一，它提供了开箱即用的功能，包括服务端渲染、静态站点生成、自动路由等。在本文中，我们将深入探讨 Nuxt 4 的核心概念和基本用法。首先，让我们了解一下 Nuxt 4 的项目结构。Nuxt 4 的项目结构非常清晰，包含了 pages、components、layouts、stores 等目录。pages 目录用于存放页面组件，Nuxt 会自动根据文件名生成路由。components 目录用于存放可复用的组件。layouts 目录用于存放布局组件。stores 目录用于存放 Pinia 状态管理的 store。接下来，让我们看看如何创建一个简单的页面。在 pages 目录下创建一个 index.vue 文件，然后添加以下代码：',
      author: '开发者',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      category: '前端开发',
      tags: ['Nuxt', 'Vue', 'SSR'],
      views: 1234,
      status: 'published',
    },
    {
      id: 2,
      title: 'Vue 3 组合式 API 实践',
      excerpt: '深入理解 Vue 3 的组合式 API，掌握其最佳实践',
      content: 'Vue 3 的组合式 API 提供了更灵活的代码组织方式。与 Vue 2 的选项式 API 不同，组合式 API 允许我们将相关的逻辑组织在一起，而不是按照 data、methods、computed 等选项分开。这使得代码更易于理解和维护。在本文中，我们将通过几个实际案例来展示组合式 API 的强大功能。首先，让我们看看如何使用 ref 和 reactive 来创建响应式数据。ref 用于创建基本类型的响应式数据，而 reactive 用于创建对象类型的响应式数据。接下来，我们将学习如何使用 computed 来创建计算属性。computed 属性会自动追踪其依赖的响应式数据，并在依赖变化时重新计算。最后，我们将探讨如何使用 watch 和 watchEffect 来监听数据变化。watch 允许我们监听特定的响应式数据，并在数据变化时执行回调函数。watchEffect 则会自动追踪其内部使用的响应式数据，并在任何依赖变化时执行。',
      author: '开发者',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z',
      category: '前端开发',
      tags: ['Vue', 'Composition API'],
      views: 987,
      status: 'published',
    },
    {
      id: 3,
      title: 'TypeScript 类型系统详解',
      excerpt: '全面了解 TypeScript 的类型系统，提升代码质量',
      content: 'TypeScript 是 JavaScript 的超集，提供了强大的类型系统。类型系统可以帮助我们在开发过程中发现潜在的错误，提高代码的可维护性和可读性。在本文中，我们将深入探讨 TypeScript 的核心类型系统。首先，让我们看看如何声明变量的类型。TypeScript 提供了多种基本类型，包括 string、number、boolean、null、undefined、symbol 和 bigint。除了基本类型，TypeScript 还支持数组和元组类型。数组类型可以使用 Array<T> 或 T[] 的语法来声明。元组类型允许我们定义一个已知数量和类型的数组。接下来，我们将学习如何使用接口来定义对象的结构。接口是 TypeScript 的核心概念之一，它允许我们定义对象的形状。我们可以使用 interface 关键字来声明接口，然后在对象中实现该接口。最后，我们将探讨泛型的概念。泛型允许我们创建可重用的组件，这些组件可以工作于多种类型而不是单一类型。这使得代码更加灵活和可复用。',
      author: '开发者',
      createdAt: '2024-01-05T10:00:00Z',
      updatedAt: '2024-01-05T10:00:00Z',
      category: '前端开发',
      tags: ['TypeScript', 'JavaScript'],
      views: 1567,
      status: 'published',
    },
  ]

  const postId = parseInt(id as string)
  const post = posts.find(p => p.id === postId)
  
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: '文章未找到',
    })
  }

  return post
})
