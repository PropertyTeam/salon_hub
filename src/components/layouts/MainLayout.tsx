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
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column" 
      bg="linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 25%, #81d4fa 50%, #4fc3f7 75%, #29b6f6 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* 宇宙の星空背景 */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`
          radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.8), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.6), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.9), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.7), transparent),
          radial-gradient(2px 2px at 160px 30px, rgba(255, 255, 255, 0.5), transparent),
          radial-gradient(1px 1px at 200px 90px, rgba(255, 255, 255, 0.8), transparent),
          radial-gradient(2px 2px at 240px 50px, rgba(255, 255, 255, 0.6), transparent),
          radial-gradient(1px 1px at 280px 20px, rgba(255, 255, 255, 0.9), transparent),
          radial-gradient(1px 1px at 320px 70px, rgba(255, 255, 255, 0.7), transparent),
          radial-gradient(2px 2px at 360px 40px, rgba(255, 255, 255, 0.5), transparent)
        `}
        backgroundSize="400px 200px"
        animation="twinkle 6s ease-in-out infinite alternate"
        zIndex="0"
        pointerEvents="none"
      />
      
      {/* 流れ星エフェクト */}
      <Box
        position="absolute"
        top="10%"
        left="-10%"
        w="2px"
        h="2px"
        bg="white"
        borderRadius="50%"
        boxShadow="0 0 10px rgba(255, 255, 255, 0.8)"
        animation="shootingstar 8s linear infinite"
        zIndex="1"
        pointerEvents="none"
      />
      
      {/* 惑星のような装飾 */}
      <Box
        position="absolute"
        top="20%"
        right="10%"
        w="60px"
        h="60px"
        bg="linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(218, 165, 32, 0.2))"
        borderRadius="50%"
        opacity="0.6"
        animation="float 10s ease-in-out infinite"
        zIndex="0"
        pointerEvents="none"
      />
      
      {/* 月のような装飾 */}
      <Box
        position="absolute"
        bottom="30%"
        left="5%"
        w="40px"
        h="40px"
        bg="linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(211, 211, 211, 0.3))"
        borderRadius="50%"
        opacity="0.7"
        animation="float 12s ease-in-out infinite reverse"
        zIndex="0"
        pointerEvents="none"
      />
      
      <MainHeader isLoggedIn={isLoggedIn} user={user} />
      <Box 
        as="main" 
        flex="1" 
        pt="80px" 
        pb="20px"
        position="relative" 
        zIndex="1"
      >
        {children}
      </Box>
      <MainFooter />
    </Box>
  )
}