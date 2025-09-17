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
        bg="rgba(224, 242, 254, 0.85)"
        backdropFilter="blur(20px) saturate(180%)"
        borderBottom="1px solid rgba(255, 255, 255, 0.3)"
        shadow="0 8px 32px rgba(6, 182, 212, 0.15), 0 2px 16px rgba(255, 255, 255, 0.1)"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'linear-gradient(90deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
          zIndex: -1
        }}
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          bg: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          zIndex: 1
        }}
      >
        <Container maxW="7xl" py={4}>
          <HStack justify="space-between" align="center">
            
            {/* Logo */}
            <Link href="/">
              <HStack gap={3} align="center">
                <Box position="relative">
                  <Box
                    w={12}
                    h={12}
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    borderRadius="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    shadow="0 8px 25px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                    border="1px solid rgba(255, 255, 255, 0.3)"
                    position="relative"
                    _hover={{
                      transform: "rotate(12deg) scale(1.1)",
                      shadow: "0 12px 35px rgba(102, 126, 234, 0.6)"
                    }}
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      right: '2px',
                      bottom: '2px',
                      bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent)',
                      borderRadius: '18px',
                      pointerEvents: 'none'
                    }}
                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    <Box w={6} h={6} bg="white" borderRadius="50%" opacity={0.9}></Box>
                  </Box>
                  {/* オービット装飾 */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    w="24px"
                    h="24px"
                    border="1px solid rgba(255, 255, 255, 0.3)"
                    borderRadius="50%"
                    transform="translate(-50%, -50%)"
                    animation="orbit 8s linear infinite"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-2px',
                      left: '10px',
                      w: '4px',
                      h: '4px',
                      bg: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%'
                    }}
                  />
                </Box>
                <VStack align="start" gap={0}>
                  <Box
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 50%, #29b6f6 100%)"
                    bgClip="text"
                    color="transparent"
                    fontWeight="800"
                    fontSize="2xl"
                    letterSpacing="-0.02em"
                    _hover={{
                      transform: "translateY(-1px)",
                      filter: "drop-shadow(0 0 8px rgba(102, 126, 234, 0.4))"
                    }}
                    transition="all 0.3s ease"
                  >
                    SalonHub
                  </Box>
                  <Text 
                    fontSize="xs" 
                    color="slate.600"
                    fontWeight="600"
                    letterSpacing="0.05em"
                  >
                    BEAUTY SALON
                  </Text>
                </VStack>
              </HStack>
            </Link>

            {/* Desktop Navigation */}
            <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
              <Link href="/stores">
                <Box
                  px={4}
                  py={2}
                  borderRadius="16px"
                  bg="rgba(6, 182, 212, 0.05)"
                  _hover={{
                    bg: "rgba(6, 182, 212, 0.15)",
                    transform: 'translateY(-2px)',
                    shadow: "0 4px 12px rgba(6, 182, 212, 0.2)"
                  }}
                  transition="all 0.3s ease"
                  cursor="pointer"
                >
                  <Text
                    color="slate.700"
                    fontWeight="600"
                    fontSize="sm"
                    bg="transparent"
                    px={3}
                    py={1}
                    borderRadius="8px"
                  >
                    サロン一覧
                  </Text>
                </Box>
              </Link>
              <Link href="/coupons">
                <Box
                  px={4}
                  py={2}
                  borderRadius="16px"
                  bg="rgba(6, 182, 212, 0.05)"
                  _hover={{
                    bg: "rgba(6, 182, 212, 0.15)",
                    transform: 'translateY(-2px)',
                    shadow: "0 4px 12px rgba(6, 182, 212, 0.2)"
                  }}
                  transition="all 0.3s ease"
                  cursor="pointer"
                >
                  <Text
                    color="slate.700"
                    fontWeight="600"
                    fontSize="sm"
                    bg="transparent"
                    px={3}
                    py={1}
                    borderRadius="8px"
                  >
                    クーポン
                  </Text>
                </Box>
              </Link>
              <Link href="/help">
                <Box
                  px={4}
                  py={2}
                  borderRadius="16px"
                  bg="rgba(6, 182, 212, 0.05)"
                  _hover={{
                    bg: "rgba(6, 182, 212, 0.15)",
                    transform: 'translateY(-2px)',
                    shadow: "0 4px 12px rgba(6, 182, 212, 0.2)"
                  }}
                  transition="all 0.3s ease"
                  cursor="pointer"
                >
                  <Text
                    color="slate.700"
                    fontWeight="600"
                    fontSize="sm"
                    bg="transparent"
                    px={3}
                    py={1}
                    borderRadius="8px"
                  >
                    ヘルプ
                  </Text>
                </Box>
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