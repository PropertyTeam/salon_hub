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
        borderColor="gray.200"
        shadow="sm"
        transition="all 0.2s ease"
      >
        <Container maxW="7xl" py={4}>
          <HStack justify="space-between" align="center">
            
            {/* Logo */}
            <Link href="/">
              <HStack gap={3} align="center">
                <Box
                  w={10}
                  h={10}
                  bg="primary.600"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="lg"
                  fontWeight="bold"
                  transition="all 0.2s ease"
                  _hover={{
                    transform: "scale(1.05)",
                    bg: "primary.700"
                  }}
                >
                  S
                </Box>
                <VStack align="start" gap={0}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.900"
                    lineHeight="none"
                  >
                    SalonHub
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    letterSpacing="wide"
                    lineHeight="none"
                  >
                    BEAUTY SALON
                  </Text>
                </VStack>
              </HStack>
            </Link>

            {/* Desktop Navigation */}
            <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
              <Link href="/stores">
                <Text
                  color="gray.600"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{
                    color: "primary.600"
                  }}
                  transition="color 0.2s ease"
                >
                  サロン一覧
                </Text>
              </Link>
              <Link href="/coupons">
                <Text
                  color="gray.600"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{
                    color: "primary.600"
                  }}
                  transition="color 0.2s ease"
                >
                  クーポン
                </Text>
              </Link>
              <Link href="/help">
                <Text
                  color="gray.600"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{
                    color: "primary.600"
                  }}
                  transition="color 0.2s ease"
                >
                  ヘルプ
                </Text>
              </Link>
            </HStack>

            {/* Auth Section */}
            <HStack gap={4}>
              {isLoggedIn && user ? (
                <Link href="/my">
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
                </Link>
              ) : (
                <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      ログイン
                    </Button>
                  </Link>
                  <Link href="/auth/register">
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
              <Link href="/coupons">
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  color="text.default"
                  _hover={{ color: 'primary.600' }}
                  py={3}
                  onClick={() => setIsMenuOpen(false)}
                >
                  クーポン
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
                  <Link href="/my">
                    <Button variant="ghost" fullWidth onClick={() => setIsMenuOpen(false)}>
                      マイページ
                    </Button>
                  </Link>
                  <Link href="/my/reservations">
                    <Button variant="ghost" fullWidth onClick={() => setIsMenuOpen(false)}>
                      予約履歴
                    </Button>
                  </Link>
                  <Link href="/my/account">
                    <Button variant="ghost" fullWidth onClick={() => setIsMenuOpen(false)}>
                      設定
                    </Button>
                  </Link>
                  <Button variant="danger" fullWidth onClick={() => setIsMenuOpen(false)}>
                    ログアウト
                  </Button>
                </VStack>
              </VStack>
            ) : (
              <VStack align="stretch" gap={3}>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ログイン
                  </Button>
                </Link>
                <Link href="/auth/register">
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