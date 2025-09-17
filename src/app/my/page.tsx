'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Grid,
  GridItem,
  Badge,
  SimpleGrid
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockUsers, mockReservations, getMockStoreById } from '../../../data/mockData'

export default function MyPage() {
  // Mock current user
  const currentUser = mockUsers[0]
  const userReservations = mockReservations.filter(r => r.userId === currentUser.id)
  const upcomingReservations = userReservations.filter(r =>
    new Date(r.date) > new Date() && r.status !== 'CANCELLED'
  )
  const recentReservations = userReservations
    .filter(r => r.status === 'COMPLETED')
    .slice(0, 3)

  const menuItems = [
    {
      title: 'アカウント情報',
      description: 'プロフィール・基本情報の編集',
      icon: '👤',
      href: '/my/account',
      color: 'blue'
    },
    {
      title: '予約管理',
      description: '予約一覧・詳細・キャンセル',
      icon: '📅',
      href: '/my/reservations',
      color: 'green'
    },
    {
      title: '支払い情報',
      description: 'クレジットカード・決済履歴',
      icon: '💳',
      href: '/my/payment',
      color: 'purple'
    },
    {
      title: '通知設定',
      description: 'メール・プッシュ通知の管理',
      icon: '🔔',
      href: '/my/notifications',
      color: 'orange'
    },
    {
      title: 'お気に入り',
      description: 'お気に入りサロン・メニュー',
      icon: '❤️',
      href: '/my/favorites',
      color: 'pink'
    },
    {
      title: 'レビュー',
      description: '投稿したレビューの管理',
      icon: '⭐',
      href: '/my/reviews',
      color: 'yellow'
    }
  ]

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    }).format(new Date(date))
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge bg="green.500" color="white">確定</Badge>
      case 'PENDING':
        return <Badge bg="yellow.500" color="white">保留中</Badge>
      case 'COMPLETED':
        return <Badge bg="blue.500" color="white">完了</Badge>
      case 'CANCELLED':
        return <Badge bg="gray.500" color="white">キャンセル</Badge>
      default:
        return <Badge bg="gray.500" color="white">{status}</Badge>
    }
  }

  return (
    <MainLayout>
      <Container maxW="6xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={6} align="stretch">
            <HStack gap={4} align="center">
              <Box
                w={16}
                h={16}
                borderRadius="full"
                bg="blue.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
                fontWeight="600"
                color="white"
              >
                {currentUser.name?.[0] || '👤'}
              </Box>
              <VStack align="start" gap={1}>
                <Heading size="lg" color="gray.800">
                  おかえりなさい、{currentUser.name}さん
                </Heading>
                <Text color="gray.600">
                  最終ログイン: 2024年1月15日 14:30
                </Text>
              </VStack>
            </HStack>

            {/* Quick Stats */}
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              <Card>
                <CardContent p={4} textAlign="center">
                  <VStack gap={2}>
                    <Text fontSize="2xl" fontWeight="800" color="blue.600">
                      {upcomingReservations.length}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      今後の予約
                    </Text>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardContent p={4} textAlign="center">
                  <VStack gap={2}>
                    <Text fontSize="2xl" fontWeight="800" color="green.600">
                      {userReservations.filter(r => r.status === 'COMPLETED').length}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      利用回数
                    </Text>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardContent p={4} textAlign="center">
                  <VStack gap={2}>
                    <Text fontSize="2xl" fontWeight="800" color="purple.600">
                      3
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
                    <Text fontSize="2xl" fontWeight="800" color="orange.600">
                      ゴールド
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      会員ランク
                    </Text>
                  </VStack>
                </CardContent>
              </Card>
            </SimpleGrid>
          </VStack>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>

            {/* Main Content */}
            <GridItem>
              <VStack gap={8} align="stretch">

                {/* Menu Grid */}
                <VStack gap={4} align="stretch">
                  <Heading size="md" color="gray.800">
                    メニュー
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {menuItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <Card
                          _hover={{
                            transform: 'translateY(-2px)',
                            shadow: 'lg'
                          }}
                          transition="all 0.2s ease"
                          cursor="pointer"
                        >
                          <CardContent p={6}>
                            <HStack gap={4}>
                              <Box
                                w={12}
                                h={12}
                                bg={`${item.color}.100`}
                                borderRadius="12px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="xl"
                              >
                                {item.icon}
                              </Box>
                              <VStack align="start" gap={1} flex="1">
                                <Text fontWeight="600" color="gray.800">
                                  {item.title}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {item.description}
                                </Text>
                              </VStack>
                            </HStack>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </SimpleGrid>
                </VStack>

                {/* Recent Activity */}
                <VStack gap={4} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="md" color="gray.800">
                      最近の利用履歴
                    </Heading>
                    <Link href="/my/reservations">
                      <Button variant="ghost" size="sm">
                        すべて見る →
                      </Button>
                    </Link>
                  </HStack>

                  {recentReservations.length === 0 ? (
                    <Card>
                      <CardContent p={8} textAlign="center">
                        <VStack gap={3}>
                          <Text fontSize="4xl">📋</Text>
                          <Text color="gray.500">
                            まだ利用履歴がありません
                          </Text>
                          <Link href="/stores">
                            <Button variant="outline" size="sm">
                              サロンを探す
                            </Button>
                          </Link>
                        </VStack>
                      </CardContent>
                    </Card>
                  ) : (
                    <VStack gap={3} align="stretch">
                      {recentReservations.map((reservation) => {
                        const store = getMockStoreById(reservation.storeId)
                        return (
                          <Card key={reservation.id}>
                            <CardContent p={4}>
                              <HStack justify="space-between">
                                <HStack gap={4}>
                                  <Box
                                    w={10}
                                    h={10}
                                    bg="gray.100"
                                    borderRadius="8px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Text>✂️</Text>
                                  </Box>
                                  <VStack align="start" gap={1}>
                                    <Text fontWeight="600" color="gray.800">
                                      {store?.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                      {formatDate(reservation.date)} {formatTime(reservation.startTime)}
                                    </Text>
                                  </VStack>
                                </HStack>
                                <VStack align="end" gap={1}>
                                  {getStatusBadge(reservation.status)}
                                  <Text fontSize="sm" fontWeight="600" color="gray.800">
                                    {formatPrice(reservation.totalPrice)}
                                  </Text>
                                </VStack>
                              </HStack>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </VStack>
                  )}
                </VStack>

              </VStack>
            </GridItem>

            {/* Sidebar */}
            <GridItem>
              <VStack gap={6} align="stretch">

                {/* Upcoming Reservations */}
                <Card>
                  <CardContent p={6}>
                    <VStack gap={4} align="stretch">
                      <Heading size="sm" color="gray.800">
                        今後の予約
                      </Heading>

                      {upcomingReservations.length === 0 ? (
                        <VStack gap={3} py={4}>
                          <Text fontSize="3xl">📅</Text>
                          <Text fontSize="sm" color="gray.500" textAlign="center">
                            予約はありません
                          </Text>
                          <Link href="/stores">
                            <Button variant="outline" size="sm">
                              予約する
                            </Button>
                          </Link>
                        </VStack>
                      ) : (
                        <VStack gap={3} align="stretch">
                          {upcomingReservations.slice(0, 3).map((reservation) => {
                            const store = getMockStoreById(reservation.storeId)
                            return (
                              <Box
                                key={reservation.id}
                                p={3}
                                bg="blue.50"
                                borderRadius="8px"
                                border="1px solid"
                                borderColor="blue.200"
                              >
                                <VStack align="start" gap={2}>
                                  <Text fontSize="sm" fontWeight="600" color="gray.800">
                                    {store?.name}
                                  </Text>
                                  <Text fontSize="xs" color="gray.600">
                                    {formatDate(reservation.date)}
                                  </Text>
                                  <Text fontSize="xs" color="gray.600">
                                    {formatTime(reservation.startTime)}〜
                                  </Text>
                                  {getStatusBadge(reservation.status)}
                                </VStack>
                              </Box>
                            )
                          })}
                        </VStack>
                      )}
                    </VStack>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent p={6}>
                    <VStack gap={4} align="stretch">
                      <Heading size="sm" color="gray.800">
                        クイックアクション
                      </Heading>

                      <VStack gap={2} align="stretch">
                        <Link href="/stores">
                          <Button variant="outline" size="sm" fullWidth>
                            サロンを探す
                          </Button>
                        </Link>

                        <Link href="/my/reservations">
                          <Button variant="ghost" size="sm" fullWidth>
                            予約を確認
                          </Button>
                        </Link>

                        <Link href="/my/account">
                          <Button variant="ghost" size="sm" fullWidth>
                            プロフィール編集
                          </Button>
                        </Link>
                      </VStack>
                    </VStack>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardContent p={6}>
                    <VStack gap={4} align="stretch">
                      <Heading size="sm" color="gray.800">
                        お知らせ
                      </Heading>

                      <VStack gap={3} align="stretch">
                        <Box
                          p={3}
                          bg="yellow.50"
                          borderRadius="8px"
                          border="1px solid"
                          borderColor="yellow.200"
                        >
                          <VStack align="start" gap={1}>
                            <Text fontSize="sm" fontWeight="600" color="yellow.800">
                              キャンペーン情報
                            </Text>
                            <Text fontSize="xs" color="yellow.700">
                              初回限定20%OFFクーポンが利用可能です
                            </Text>
                          </VStack>
                        </Box>

                        <Box
                          p={3}
                          bg="blue.50"
                          borderRadius="8px"
                          border="1px solid"
                          borderColor="blue.200"
                        >
                          <VStack align="start" gap={1}>
                            <Text fontSize="sm" fontWeight="600" color="blue.800">
                              システム更新
                            </Text>
                            <Text fontSize="xs" color="blue.700">
                              予約システムの機能が向上しました
                            </Text>
                          </VStack>
                        </Box>
                      </VStack>
                    </VStack>
                  </CardContent>
                </Card>

              </VStack>
            </GridItem>

          </Grid>

        </VStack>
      </Container>
    </MainLayout>
  )
}