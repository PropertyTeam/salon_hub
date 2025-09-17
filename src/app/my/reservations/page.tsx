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
} from '@chakra-ui/react'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockReservations, getMockStoreById, mockUsers } from '../../../../data/mockData'

export default function ReservationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const currentUser = mockUsers[0]
  const userReservations = mockReservations.filter(r => r.userId === currentUser.id)

  const upcomingReservations = userReservations.filter(r =>
    new Date(r.date) > new Date() && r.status !== 'CANCELLED'
  )

  const pastReservations = userReservations.filter(r =>
    new Date(r.date) <= new Date() || r.status === 'CANCELLED'
  )

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
        return <Badge bg="green.500" color="white" px={3} py={1} borderRadius="full">確定</Badge>
      case 'PENDING':
        return <Badge bg="yellow.500" color="white" px={3} py={1} borderRadius="full">保留中</Badge>
      case 'COMPLETED':
        return <Badge bg="blue.500" color="white" px={3} py={1} borderRadius="full">完了</Badge>
      case 'CANCELLED':
        return <Badge bg="gray.500" color="white" px={3} py={1} borderRadius="full">キャンセル</Badge>
      default:
        return <Badge bg="gray.500" color="white" px={3} py={1} borderRadius="full">{status}</Badge>
    }
  }

  const handleCancelReservation = (reservationId: string) => {
    // Simulate cancellation
    router.push(`/my/reservations/${reservationId}/cancel`)
  }

  const ReservationCard = ({ reservation }: { reservation: any }) => {
    const store = getMockStoreById(reservation.storeId)
    const isUpcoming = new Date(reservation.date) > new Date() && reservation.status !== 'CANCELLED'
    const canCancel = isUpcoming && reservation.status === 'CONFIRMED'

    return (
      <Card key={reservation.id}>
        <CardContent p={6}>
          <VStack gap={4} align="stretch">

            {/* Header */}
            <HStack justify="space-between" align="start">
              <VStack align="start" gap={2}>
                <HStack gap={3}>
                  <Box
                    w={12}
                    h={12}
                    bg="blue.100"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="xl">✂️</Text>
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text fontWeight="600" color="gray.800" fontSize="lg">
                      {store?.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      予約ID: {reservation.id}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>

              <VStack align="end" gap={2}>
                {getStatusBadge(reservation.status)}
                <Text fontSize="lg" fontWeight="600" color="blue.600">
                  {formatPrice(reservation.totalPrice)}
                </Text>
              </VStack>
            </HStack>

            {/* Details */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <VStack align="start" gap={3}>
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.500">📅</Text>
                  <Text fontSize="sm" color="gray.700">
                    {formatDate(reservation.date)}
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.500">🕐</Text>
                  <Text fontSize="sm" color="gray.700">
                    {formatTime(reservation.startTime)} 〜 {formatTime(reservation.endTime)}
                  </Text>
                </HStack>
              </VStack>

              <VStack align="start" gap={3}>
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.500">📍</Text>
                  <Text fontSize="sm" color="gray.700">
                    {store?.address}
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.500">📞</Text>
                  <Text fontSize="sm" color="gray.700">
                    {store?.phone}
                  </Text>
                </HStack>
              </VStack>
            </SimpleGrid>

            {/* Notes */}
            {reservation.notes && (
              <Box
                p={3}
                bg="gray.50"
                borderRadius="8px"
                border="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.700">
                  <Text as="span" fontWeight="600">備考: </Text>
                  {reservation.notes}
                </Text>
              </Box>
            )}

            {/* Actions */}
            <HStack gap={3} justify="end">
              <Link href={`/my/reservations/${reservation.id}`}>
                <Button variant="outline" size="sm">
                  詳細を見る
                </Button>
              </Link>

              {canCancel && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleCancelReservation(reservation.id)}
                >
                  キャンセル
                </Button>
              )}

              {reservation.status === 'COMPLETED' && (
                <Link href={`/stores/${reservation.storeId}/review`}>
                  <Button variant="primary" size="sm">
                    レビューを書く
                  </Button>
                </Link>
              )}
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
              予約管理
            </Heading>
            <Text color="gray.600">
              予約の確認、変更、キャンセルができます
            </Text>
          </VStack>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="green.600">
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
                  <Text fontSize="2xl" fontWeight="800" color="blue.600">
                    {userReservations.filter(r => r.status === 'COMPLETED').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    完了済み
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="red.600">
                    {userReservations.filter(r => r.status === 'CANCELLED').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    キャンセル済み
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="purple.600">
                    {userReservations.reduce((sum, r) => r.status === 'COMPLETED' ? sum + r.totalPrice : sum, 0).toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    総利用金額（円）
                  </Text>
                </VStack>
              </CardContent>
            </Card>
          </SimpleGrid>

          {/* Tabs */}
          <Tabs>
            <TabList>
              <Tab>今後の予約 ({upcomingReservations.length})</Tab>
              <Tab>過去の予約 ({pastReservations.length})</Tab>
            </TabList>

            <TabPanels>
              {/* Upcoming Reservations */}
              <TabPanel px={0}>
                <VStack gap={6} align="stretch">
                  {upcomingReservations.length === 0 ? (
                    <Card>
                      <CardContent p={12} textAlign="center">
                        <VStack gap={4}>
                          <Text fontSize="5xl">📅</Text>
                          <Heading size="md" color="gray.600">
                            今後の予約はありません
                          </Heading>
                          <Text color="gray.500">
                            新しい予約を作成して、お気に入りのサロンを利用しましょう
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
                    <VStack gap={4} align="stretch">
                      {upcomingReservations.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} />
                      ))}
                    </VStack>
                  )}
                </VStack>
              </TabPanel>

              {/* Past Reservations */}
              <TabPanel px={0}>
                <VStack gap={6} align="stretch">
                  {pastReservations.length === 0 ? (
                    <Card>
                      <CardContent p={12} textAlign="center">
                        <VStack gap={4}>
                          <Text fontSize="5xl">📋</Text>
                          <Heading size="md" color="gray.600">
                            過去の予約はありません
                          </Heading>
                          <Text color="gray.500">
                            サロンを利用すると、ここに履歴が表示されます
                          </Text>
                        </VStack>
                      </CardContent>
                    </Card>
                  ) : (
                    <VStack gap={4} align="stretch">
                      {pastReservations.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} />
                      ))}
                    </VStack>
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

        </VStack>
      </Container>
    </MainLayout>
  )
}