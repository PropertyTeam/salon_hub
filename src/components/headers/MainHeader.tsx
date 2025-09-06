'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Box, 
  Container, 
  HStack, 
  Text, 
  VStack,
  Heading,
  Separator,
  Image
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { getInitials } from '@/lib/utils'

interface MainHeaderProps {
  isLoggedIn?: boolean
  user?: {
    name: string
    avatar?: string
  }
}

export function MainHeader({ isLoggedIn = false, user }: MainHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Header */}
      <Box 
        as="header" 
        position="fixed" 
        top={0} 
        left={0} 
        right={0} 
        zIndex={1000}
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="border.subtle"
        shadow="sm"
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        <Container maxW="7xl" py={4}>
          <HStack justify="space-between" align="center">
            
            {/* Logo */}
            <Link href="/">
              <Heading
                size="lg"
                fontWeight="bold"
                bgGradient="linear(135deg, primary.500, secondary.500)"
                bgClip="text"
                _hover={{ 
                  bgGradient: "linear(135deg, primary.600, secondary.600)",
                  transform: "scale(1.05)"
                }}
                transition="all 0.2s"
                cursor="pointer"
              >
                SalonHub
              </Heading>
            </Link>

            {/* Desktop Navigation */}
            <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
              <Link href="/stores">
                <Text
                  color="text.muted"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{ 
                    color: 'primary.600',
                    transform: 'translateY(-1px)'
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  サロン一覧
                </Text>
              </Link>
              <Link href="/help">
                <Text
                  color="text.muted"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{ 
                    color: 'primary.600',
                    transform: 'translateY(-1px)'
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  ヘルプ
                </Text>
              </Link>
            </HStack>

            {/* Auth Section */}
            <HStack gap={4}>
              {isLoggedIn && user ? (
                <HStack gap={3} cursor="pointer">
                  <Box
                    w={8}
                    h={8}
                    bg="primary.100"
                    color="primary.600"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="medium"
                    shadow="md"
                    _hover={{ transform: 'scale(1.05)' }}
                    transition="transform 0.2s"
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        w="full"
                        h="full"
                        borderRadius="full"
                        objectFit="cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </Box>
                  <Text 
                    fontSize="sm" 
                    color="text.default" 
                    fontWeight="medium"
                    display={{ base: 'none', md: 'block' }}
                  >
                    {user.name}
                  </Text>
                </HStack>
              ) : (
                <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      ログイン
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" size="sm">
                      新規登録
                    </Button>
                  </Link>
                </HStack>
              )}

              {/* Mobile menu button */}
              <Box
                display={{ base: 'flex', md: 'none' }}
                w={10}
                h={10}
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                borderRadius="md"
                _hover={{ bg: 'bg.subtle' }}
                transition="background 0.2s"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Box>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <Box
          position="fixed"
          top="72px"
          left={0}
          right={0}
          bottom={0}
          bg="bg.default"
          zIndex={999}
          p={6}
          display={{ base: 'block', md: 'none' }}
          borderTop="1px solid"
          borderColor="border.subtle"
          shadow="lg"
        >
          <VStack align="stretch" gap={6}>
            {/* Navigation Links */}
            <VStack align="stretch" gap={4}>
              <Link href="/stores">
                <Text 
                  fontSize="lg" 
                  fontWeight="medium" 
                  color="text.default"
                  _hover={{ color: 'primary.600' }}
                  py={3}
                  onClick={() => setIsMenuOpen(false)}
                >
                  サロン一覧
                </Text>
              </Link>
              <Link href="/help">
                <Text 
                  fontSize="lg" 
                  fontWeight="medium" 
                  color="text.default"
                  _hover={{ color: 'primary.600' }}
                  py={3}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ヘルプ
                </Text>
              </Link>
            </VStack>

            <Separator />

            {/* Auth Section */}
            {isLoggedIn && user ? (
              <VStack align="stretch" gap={4}>
                <HStack gap={3} p={3} bg="bg.subtle" borderRadius="lg">
                  <Box
                    w={12}
                    h={12}
                    bg="primary.100"
                    color="primary.600"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="lg"
                    fontWeight="medium"
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        w="full"
                        h="full"
                        borderRadius="full"
                        objectFit="cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </Box>
                  <Text fontWeight="medium" color="text.default">
                    {user.name}
                  </Text>
                </HStack>
                
                <VStack align="stretch" gap={2}>
                  <Button variant="ghost" fullWidth onClick={() => setIsMenuOpen(false)}>
                    マイページ
                  </Button>
                  <Button variant="ghost" fullWidth onClick={() => setIsMenuOpen(false)}>
                    予約履歴
                  </Button>
                  <Button variant="ghost" fullWidth onClick={() => setIsMenuOpen(false)}>
                    設定
                  </Button>
                  <Button variant="danger" fullWidth onClick={() => setIsMenuOpen(false)}>
                    ログアウト
                  </Button>
                </VStack>
              </VStack>
            ) : (
              <VStack align="stretch" gap={3}>
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ログイン
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => setIsMenuOpen(false)}
                  >
                    新規登録
                  </Button>
                </Link>
              </VStack>
            )}
          </VStack>
        </Box>
      )}
    </>
  )
}