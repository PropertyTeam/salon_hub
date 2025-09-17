'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  SimpleGrid,
  Image
} from '@chakra-ui/react'
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/tabs'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockStores, mockMenus } from '../../../../data/mockData'

export default function FavoritesPage() {
  const router = useRouter()

  // Mock favorite stores and menus
  const favoriteStores = mockStores.slice(0, 3)
  const favoriteMenus = mockMenus.slice(0, 4)

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
  }

  const StoreCard = ({ store }: { store: any }) => (
    <Card>
      <CardContent p={0}>
        <VStack gap={0} align="stretch">
          <Box position="relative">
            <Image
              src={store.image}
              alt={store.name}
              h="200px"
              w="100%"
              objectFit="cover"
              borderTopRadius="12px"
            />
            <Box
              position="absolute"
              top={3}
              right={3}
              bg="white"
              borderRadius="full"
              p={2}
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
            >
              <Text fontSize="lg">❤️</Text>
            </Box>
          </Box>

          <Box p={4}>
            <VStack gap={3} align="stretch">
              <VStack align="start" gap={2}>
                <Text fontWeight="600" color="gray.800" fontSize="lg">
                  {store.name}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {store.address}
                </Text>
                <HStack gap={2}>
                  <Text fontSize="sm">⭐</Text>
                  <Text fontSize="sm" color="gray.700">
                    {store.rating} ({store.reviewCount}件)
                  </Text>
                </HStack>
              </VStack>

              <HStack justify="space-between" align="center">
                <VStack align="start" gap={1}>
                  <Text fontSize="xs" color="gray.500">最低料金</Text>
                  <Text fontSize="lg" fontWeight="600" color="blue.600">
                    {formatPrice(store.lowestPrice)}〜
                  </Text>
                </VStack>
                <VStack gap={2}>
                  <Link href={`/stores/${store.id}`}>
                    <Button variant="primary" size="sm" fullWidth>
                      詳細を見る
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" fullWidth>
                    お気に入り解除
                  </Button>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </CardContent>
    </Card>
  )

  const MenuCard = ({ menu }: { menu: any }) => {
    const store = mockStores.find(s => s.id === menu.storeId)

    return (
      <Card>
        <CardContent p={4}>
          <VStack gap={4} align="stretch">
            <HStack justify="space-between" align="start">
              <VStack align="start" gap={2} flex="1">
                <Text fontWeight="600" color="gray.800">
                  {menu.name}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {store?.name}
                </Text>
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {menu.description}
                </Text>
              </VStack>
              <Box
                bg="white"
                borderRadius="full"
                p={2}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
              >
                <Text fontSize="md">❤️</Text>
              </Box>
            </HStack>

            <HStack justify="space-between" align="center">
              <VStack align="start" gap={1}>
                <Text fontSize="lg" fontWeight="600" color="blue.600">
                  {formatPrice(menu.price)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {menu.duration}分
                </Text>
              </VStack>
              <VStack gap={2}>
                <Link href={`/stores/${store?.id}/menu/${menu.id}/book`}>
                  <Button variant="primary" size="sm">
                    予約する
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  解除
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </CardContent>
      </Card>
    )
  }

  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={4} align="start">
            <HStack gap={4}>
              <Button variant="ghost" onClick={() => router.back()}>
                ← 戻る
              </Button>
            </HStack>
            <Heading size="lg" color="gray.800">
              お気に入り
            </Heading>
            <Text color="gray.600">
              お気に入りのサロンとメニューを管理できます
            </Text>
          </VStack>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="pink.600">
                    {favoriteStores.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    お気に入り店舗
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="purple.600">
                    {favoriteMenus.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    お気に入りメニュー
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="orange.600">
                    3
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    利用済み店舗
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="green.600">
                    15%
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    平均割引率
                  </Text>
                </VStack>
              </CardContent>
            </Card>
          </SimpleGrid>

          {/* Tabs */}
          <Tabs>
            <TabList>
              <Tab>お気に入り店舗 ({favoriteStores.length})</Tab>
              <Tab>お気に入りメニュー ({favoriteMenus.length})</Tab>
            </TabList>

            <TabPanels>
              {/* Favorite Stores */}
              <TabPanel px={0}>
                <VStack gap={6} align="stretch">
                  {favoriteStores.length === 0 ? (
                    <Card>
                      <CardContent p={12} textAlign="center">
                        <VStack gap={4}>
                          <Text fontSize="5xl">❤️</Text>
                          <Heading size="md" color="gray.600">
                            お気に入り店舗がありません
                          </Heading>
                          <Text color="gray.500">
                            気になるサロンをお気に入りに追加しましょう
                          </Text>
                          <Link href="/stores">
                            <Button variant="primary" size="lg">
                              サロンを探す
                            </Button>
                          </Link>
                        </VStack>
                      </CardContent>
                    </Card>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                      {favoriteStores.map((store) => (
                        <StoreCard key={store.id} store={store} />
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              </TabPanel>

              {/* Favorite Menus */}
              <TabPanel px={0}>
                <VStack gap={6} align="stretch">
                  {favoriteMenus.length === 0 ? (
                    <Card>
                      <CardContent p={12} textAlign="center">
                        <VStack gap={4}>
                          <Text fontSize="5xl">⭐</Text>
                          <Heading size="md" color="gray.600">
                            お気に入りメニューがありません
                          </Heading>
                          <Text color="gray.500">
                            気になるメニューをお気に入りに追加しましょう
                          </Text>
                          <Link href="/stores">
                            <Button variant="primary" size="lg">
                              メニューを探す
                            </Button>
                          </Link>
                        </VStack>
                      </CardContent>
                    </Card>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      {favoriteMenus.map((menu) => (
                        <MenuCard key={menu.id} menu={menu} />
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Recommendations */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="gray.800">
                  おすすめ
                </Heading>
                <Text color="gray.600">
                  お気に入りの傾向から、あなたにおすすめのサロンをご紹介します
                </Text>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                  {mockStores.slice(3, 6).map((store) => (
                    <Box
                      key={store.id}
                      p={4}
                      bg="gradient.primary"
                      borderRadius="12px"
                      color="white"
                    >
                      <VStack gap={3} align="start">
                        <Text fontWeight="600">{store.name}</Text>
                        <Text fontSize="sm" opacity={0.9}>
                          {store.category} • {store.area}
                        </Text>
                        <HStack justify="space-between" w="100%">
                          <Text fontSize="sm">
                            {formatPrice(store.lowestPrice)}〜
                          </Text>
                          <Link href={`/stores/${store.id}`}>
                            <Button variant="secondary" size="sm">
                              詳細
                            </Button>
                          </Link>
                        </HStack>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </CardContent>
          </Card>

        </VStack>
      </Container>
    </MainLayout>
  )
}