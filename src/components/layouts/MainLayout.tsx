'use client'

import { Box } from '@chakra-ui/react'
import { MainHeader } from '@/components/navigation/MainHeader'
import { MainFooter } from '@/components/navigation/MainFooter'

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
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg="gray.50"
      position="relative"
    >
      <MainHeader isLoggedIn={isLoggedIn} user={user} />
      <Box
        as="main"
        flex="1"
        pt="80px"
        position="relative"
      >
        {children}
      </Box>
      <MainFooter />
    </Box>
  )
}