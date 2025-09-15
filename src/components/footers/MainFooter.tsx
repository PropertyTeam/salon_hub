'use client'

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
  VStack,
  HStack,
  Separator,
  Icon,
  Stack,
  Button,
  chakra,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaTwitter, FaInstagram, FaFacebook, FaLine, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'

type SocialButtonProps = {
  children: ReactNode
  label: string
  href: string
}

function SocialButton({ children, label, href }: SocialButtonProps) {
  return (
    <chakra.button
      bg="whiteAlpha.100"
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s"
      _hover={{ bg: "whiteAlpha.300" }}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </chakra.button>
  )
}


export function MainFooter() {
  return (
    <Box 
      as="footer" 
      bg="linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)"
      position="relative"
      py={20}
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: `
          radial-gradient(circle at 10% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
        `,
        animation: "galaxySpiral 30s ease-in-out infinite"
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.5), transparent),
          radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.6), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.4), transparent),
          radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.3), transparent)
        `,
        backgroundSize: "200px 200px",
        animation: "twinkle 8s ease-in-out infinite alternate"
      }}
    >
      {/* Aurora-like top border */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bg="linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8), rgba(6, 182, 212, 0.8), transparent)"
        animation="pulse 4s ease-in-out infinite"
      />
      
      {/* Floating cosmic elements */}
      <Box
        position="absolute"
        top="15%"
        left="10%"
        w="80px"
        h="80px"
        bg="radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)"
        borderRadius="50%"
        animation="float 15s ease-in-out infinite"
        filter="blur(1px)"
      />
      <Box
        position="absolute"
        bottom="20%"
        right="15%"
        w="60px"
        h="60px"
        bg="radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
        borderRadius="50%"
        animation="float 18s ease-in-out infinite reverse"
        filter="blur(1px)"
      />
      
      <Container maxW="7xl" position="relative" zIndex={1}>
        {/* Brand Section */}
        <VStack gap={6} textAlign="center" mb={12}>
          <HStack gap={3} justify="center">
            <Box
              bg="linear-gradient(135deg, cyan.300, sky.400, blue.300)"
              bgClip="text"
              color="transparent"
              fontWeight="800"
              fontSize="3xl"
              letterSpacing="-0.02em"
            >
              SalonHub
            </Box>
          </HStack>
          <Text 
            color="white" 
            fontSize="lg" 
            maxW="2xl"
            lineHeight="1.6"
            fontWeight="500"
          >
            美容サロンと顧客をつなぐ、次世代の予約プラットフォーム
            <br />
            あなたの美しさを輝かせるお手伝いをします
          </Text>
        </VStack>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
          gap={10}
          mb={12}
        >
          <GridItem>
            <VStack align="start" gap={5}>
              <Text
                bg="transparent"
                color="white"
                fontWeight="700"
                fontSize="lg"
                px={4}
                py={2}
                borderRadius="12px"
                textAlign="center"
              >
                サービス
              </Text>
              <VStack align="start" gap={3}>
                <Link 
                  as={NextLink} 
                  href="/stores" 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.3s ease"
                >
                  サロン検索
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.3s ease"
                >
                  予約管理
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.3s ease"
                >
                  キャンセル・変更
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.3s ease"
                >
                  お気に入り
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="start" gap={4}>
              <Text
                bg="transparent"
                color="white"
                fontWeight="700"
                fontSize="lg"
                px={4}
                py={2}
                borderRadius="12px"
                textAlign="center"
              >
                サロン関係者の方
              </Text>
              <VStack align="start" gap={3}>
                <Link 
                  as={NextLink} 
                  href="/admin/login" 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  店舗管理画面
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  新規登録
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  料金プラン
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  導入事例
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="start" gap={4}>
              <Text
                bg="transparent"
                color="white"
                fontWeight="700"
                fontSize="lg"
                px={4}
                py={2}
                borderRadius="12px"
                textAlign="center"
              >
                サポート
              </Text>
              <VStack align="start" gap={3}>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  よくある質問
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  お問い合わせ
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  利用規約
                </Link>
                <Link 
                  bg="transparent"
                  color="white" 
                  fontWeight="500"
                  px={3}
                  py={2}
                  borderRadius="8px"
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.95)',
                    color: 'slate.900'
                  }}
                >
                  プライバシーポリシー
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="start" gap={4}>
              <VStack align="start" gap={3}>
                            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>

        <Separator borderColor="gray.600" />

        <Box pt={6} textAlign="center">
          <Text 
            bg="transparent"
            color="white" 
            fontSize="sm"
            px={4}
            py={2}
            borderRadius="8px"
            fontWeight="500"
            display="inline-block"
          >
            &copy; 2024 SalonHub. All rights reserved.
          </Text>
        </Box>
        </Container>

    </Box>
  )
}
