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
        return <Badge bg="primary.500" color="white" px={3} py={1} borderRadius="md" fontWeight="medium">確定</Badge>
      case 'PENDING':
        return <Badge bg="orange.500" color="white" px={3} py={1} borderRadius="md" fontWeight="medium">保留中</Badge>
      case 'COMPLETED':
        return <Badge bg="gray.500" color="white" px={3} py={1} borderRadius="md" fontWeight="medium">完了</Badge>
      case 'CANCELLED':
        return <Badge bg="gray.400" color="white" px={3} py={1} borderRadius="md" fontWeight="medium">キャンセル</Badge>
      default:
        return <Badge bg="gray.400" color="white" px={3} py={1} borderRadius="md" fontWeight="medium">{status}</Badge>
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
                bg="primary.500"
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
                <Heading size="lg" color="gray.900" fontWeight="bold">
                  おかえりなさい、{currentUser.name}さん
                </Heading>
                <Text color="gray.600">
                  最終ログイン: 2024年1月15日 14:30
                </Text>
              </VStack>
            </HStack>

            {/* Quick Stats */}
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              <Card variant="outline">
                <CardContent p={6} textAlign="center">
                  <VStack gap={3}>
                    <Text fontSize="3xl" fontWeight="bold" color="primary.600">
                      {upcomingReservations.length}
                    </Text>
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      今後の予約
                    </Text>
                  </VStack>
                </CardContent>
              </Card>

              <Card variant="outline">
                <CardContent p={6} textAlign="center">
                  <VStack gap={3}>
                    <Text fontSize="3xl" fontWeight="bold" color="primary.600">
                      {userReservations.filter(r => r.status === 'COMPLETED').length}
                    </Text>
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      利用回数
                    </Text>
                  </VStack>
                </CardContent>
              </Card>

              <Card variant="outline">
                <CardContent p={6} textAlign="center">
                  <VStack gap={3}>
                    <Text fontSize="3xl" fontWeight="bold" color="primary.600">
                      3
                    </Text>
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      お気に入り店舗
                    </Text>
                  </VStack>
                </CardContent>
              </Card>

              <Card variant="outline">
                <CardContent p={6} textAlign="center">
                  <VStack gap={3}>
                    <Badge
                      bg="primary.500"
                      color="white"
                      fontSize="md"
                      px={4}
                      py={2}
                      borderRadius="lg"
                      fontWeight="bold"
                    >
                      ゴールド
                    </Badge>
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
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
                <VStack gap={6} align="stretch">
                  <Heading size="lg" color="gray.900" fontWeight="semibold">
                    メニュー
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {menuItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <Card
                          variant="outline"
                          _hover={{
                            borderColor: 'primary.300',
                            shadow: 'md'
                          }}
                          transition="all 0.2s ease"
                          cursor="pointer"
                        >
                          <CardContent p={6}>
                            <HStack gap={4}>
                              <Box
                                w={12}
                                h={12}
                                bg="primary.50"
                                borderRadius="lg"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="xl"
                              >
                                {item.icon}
                              </Box>
                              <VStack align="start" gap={2} flex="1">
                                <Text fontWeight="semibold" color="gray.900">
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
                <VStack gap={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="lg" color="gray.900" fontWeight="semibold">
                      最近の利用履歴
                    </Heading>
                    <Link href="/my/reservations">
                      <Button variant="outline" size="sm">
                        すべて見る →
                      </Button>
                    </Link>
                  </HStack>

                  {recentReservations.length === 0 ? (
                    <Card variant="outline">
                      <CardContent p={8} textAlign="center">
                        <VStack gap={4}>
                          <Text fontSize="4xl">📋</Text>
                          <Text color="gray.500">
                            まだ利用履歴がありません
                          </Text>
                          <Link href="/stores">
                            <Button variant="primary" size="sm">
                              サロンを探す
                            </Button>
                          </Link>
                        </VStack>
                      </CardContent>
                    </Card>
                  ) : (
                    <VStack gap={4} align="stretch">
                      {recentReservations.map((reservation) => {
                        const store = getMockStoreById(reservation.storeId)
                        return (
                          <Card key={reservation.id} variant="outline">
                            <CardContent p={5}>
                              <HStack justify="space-between">
                                <HStack gap={4}>
                                  <Box
                                    w={12}
                                    h={12}
                                    bg="primary.50"
                                    borderRadius="lg"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Text fontSize="lg">✂️</Text>
                                  </Box>
                                  <VStack align="start" gap={1}>
                                    <Text fontWeight="semibold" color="gray.900">
                                      {store?.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                      {formatDate(reservation.date)} {formatTime(reservation.startTime)}
                                    </Text>
                                  </VStack>
                                </HStack>
                                <VStack align="end" gap={2}>
                                  {getStatusBadge(reservation.status)}
                                  <Text fontSize="sm" fontWeight="bold" color="gray.900">
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
                <Card variant="outline">
                  <CardContent p={6}>
                    <VStack gap={4} align="stretch">
                      <Heading size="md" color="gray.900" fontWeight="semibold">
                        今後の予約
                      </Heading>

                      {upcomingReservations.length === 0 ? (
                        <VStack gap={4} py={6}>
                          <Text fontSize="3xl">📅</Text>
                          <Text fontSize="sm" color="gray.500" textAlign="center">
                            予約はありません
                          </Text>
                          <Link href="/stores">
                            <Button variant="primary" size="sm">
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
                                p={4}
                                bg="primary.50"
                                borderRadius="lg"
                                border="1px solid"
                                borderColor="primary.200"
                              >
                                <VStack align="start" gap={2}>
                                  <Text fontSize="sm" fontWeight="semibold" color="gray.900">
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
                <Card variant="outline">
                  <CardContent p={6}>
                    <VStack gap={4} align="stretch">
                      <Heading size="md" color="gray.900" fontWeight="semibold">
                        クイックアクション
                      </Heading>

                      <VStack gap={3} align="stretch">
                        <Link href="/stores">
                          <Button variant="primary" size="md" fullWidth>
                            サロンを探す
                          </Button>
                        </Link>

                        <Link href="/my/reservations">
                          <Button variant="outline" size="md" fullWidth>
                            予約を確認
                          </Button>
                        </Link>

                        <Link href="/my/account">
                          <Button variant="outline" size="md" fullWidth>
                            プロフィール編集
                          </Button>
                        </Link>
                      </VStack>
                    </VStack>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card variant="outline">
                  <CardContent p={6}>
                    <VStack gap={4} align="stretch">
                      <Heading size="md" color="gray.900" fontWeight="semibold">
                        お知らせ
                      </Heading>

                      <VStack gap={3} align="stretch">
                        <Box
                          p={4}
                          bg="orange.50"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="orange.200"
                        >
                          <VStack align="start" gap={2}>
                            <Text fontSize="sm" fontWeight="semibold" color="orange.800">
                              キャンペーン情報
                            </Text>
                            <Text fontSize="xs" color="orange.700" lineHeight="1.4">
                              初回限定20%OFFクーポンが利用可能です
                            </Text>
                          </VStack>
                        </Box>

                        <Box
                          p={4}
                          bg="primary.50"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="primary.200"
                        >
                          <VStack align="start" gap={2}>
                            <Text fontSize="sm" fontWeight="semibold" color="primary.800">
                              システム更新
                            </Text>
                            <Text fontSize="xs" color="primary.700" lineHeight="1.4">
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