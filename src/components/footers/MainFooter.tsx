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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaTwitter, FaInstagram, FaFacebook, FaLine } from 'react-icons/fa'

export function MainFooter() {
  return (
    <Box as="footer" bg="gray.800" color="white" py={12}>
      <Container maxW="7xl">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
          gap={8}
          mb={8}
        >
          <GridItem>
            <VStack align="start" gap={4}>
              <Heading size="sm" color="gray.200">
                サービス
              </Heading>
              <VStack align="start" gap={2}>
                <Link as={NextLink} href="/stores" color="gray.300" _hover={{ color: 'primary.400' }}>
                  サロン検索
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  予約管理
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  キャンセル・変更
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  お気に入り
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="start" gap={4}>
              <Heading size="sm" color="gray.200">
                サロン関係者の方
              </Heading>
              <VStack align="start" gap={2}>
                <Link as={NextLink} href="/admin/login" color="gray.300" _hover={{ color: 'primary.400' }}>
                  店舗管理画面
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  新規登録
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  料金プラン
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  導入事例
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="start" gap={4}>
              <Heading size="sm" color="gray.200">
                サポート
              </Heading>
              <VStack align="start" gap={2}>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  よくある質問
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  お問い合わせ
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  利用規約
                </Link>
                <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                  プライバシーポリシー
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="start" gap={4}>
              <Heading size="sm" color="gray.200">
                フォロー
              </Heading>
              <VStack align="start" gap={3}>
                <HStack>
                  <Icon as={FaTwitter} />
                  <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                    Twitter
                  </Link>
                </HStack>
                <HStack>
                  <Icon as={FaInstagram} />
                  <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                    Instagram
                  </Link>
                </HStack>
                <HStack>
                  <Icon as={FaFacebook} />
                  <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                    Facebook
                  </Link>
                </HStack>
                <HStack>
                  <Icon as={FaLine} />
                  <Link color="gray.300" _hover={{ color: 'primary.400' }}>
                    LINE
                  </Link>
                </HStack>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>

        <Separator borderColor="gray.600" />

        <Box pt={6} textAlign="center">
          <Text color="gray.400" fontSize="sm">
            &copy; 2024 SalonHub. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}