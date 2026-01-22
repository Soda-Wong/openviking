import { useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import DocsPage from './pages/DocsPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import NotFound from './pages/NotFound'
import { getClientId, getReferrerDomain, getUtmParams } from './lib/utils'
//引入tea sdk
import Tea from 'byted-tea-sdk'

const queryClient = new QueryClient()

const App = () => {
  useEffect(() => {
    Tea.init({
      app_id: 719275, // 替换成你的appid，必须是number类型
      channel: 'cn', //根据你的需要，选择对应的channel
      log: true, // 开启后会控制台会打印日志
    })
    Tea.config({
      client_id: getClientId(), // 用户唯一标识
      ...getUtmParams(),
      domain: getReferrerDomain(),
    })
    Tea.start()
  }, [Tea])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
