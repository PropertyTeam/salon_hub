'use client'

import { Box } from '@chakra-ui/react'
import { MainHeader } from '@/components/headers/MainHeader'
import { MainFooter } from '@/components/footers/MainFooter'

interface MainLayoutProps {
  children: React.ReactNode
  isLoggedIn?: boolean
  user?: {
    name: string
    avatar?: string
  }
}

export function MainLayout({ 
  children, 
  isLoggedIn = false, 
  user 
}: MainLayoutProps) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="bg.default">
      <MainHeader isLoggedIn={isLoggedIn} user={user} />
      <Box as="main" flex="1" pt="70px" color="text.default">
        {children}
      </Box>
      <MainFooter />
    </Box>
  )
}