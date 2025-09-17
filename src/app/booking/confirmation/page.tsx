'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Image,
  Alert
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockStores, mockMenus } from '../../../../data/mockData'

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(true)

  const storeId = searchParams.get('storeId')
  const menuId = searchParams.get('menuId')

  const store = mockStores.find(s => s.id === storeId)
  const menu = mockMenus.find(m => m.id === menuId)

  // Mock booking data
  const booking = {
    id: 'RES-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date(Date.now() + 86400000), // Tomorrow
    time: '14:00',
    endTime: '15:30',
    status: 'CONFIRMED',
    totalPrice: menu?.price || 0,
    paymentMethod: 'クレジットカード ****4242',
    staff: 'おまかせ',
    notes: ''
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date)
  }

  if (!store || !menu) {
    return <div>Booking information not found</div>
  }

  return (
    <MainLayout>
      <Container maxW="3xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Success Alert */}
          {showSuccess && (
            <Alert status="success" borderRadius="12px" bg="green.50" border="1px solid" borderColor="green.200">
              <VStack align="start" gap={1}>
                <Text fontWeight="600" color="green.800">
                  予約が完了しました！
                </Text>
                <Text fontSize="sm" color="green.700">
                  確認メールを送信いたしました。
                </Text>
              </VStack>
            </Alert>
          )}

          {/* Success Icon */}
          <VStack gap={4} textAlign="center">
            <Box
              w={20}
              h={20}
              bg="green.100"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="4xl">✅</Text>
            </Box>
            <Heading size="xl" color="gray.800">
              予約完了
            </Heading>
            <Text color="gray.600" fontSize="lg">
              予約ID: {booking.id}
            </Text>
          </VStack>

          {/* Booking Details */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="lg" color="gray.800">
                  予約詳細
                </Heading>

                {/* Store Info */}
                <HStack gap={4}>
                  <Image
                    src={store.image}
                    alt={store.name}
                    w={16}
                    h={16}
                    objectFit="cover"
                    borderRadius="12px"
                  />
                  <VStack align="start" gap={2}>
                    <Text fontWeight="600" color="gray.800" fontSize="lg">
                      {store.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {store.address}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      📞 {store.phone}
                    </Text>
                  </VStack>
                </HStack>

                <Box h="1px" bg="gray.200" />

                {/* Booking Details Grid */}
                <VStack gap={4} align="stretch">
                  <HStack justify="space-between">
                    <Text color="gray.600">メニュー</Text>
                    <Text fontWeight="600">{menu.name}</Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">日時</Text>
                    <VStack align="end" gap={1}>
                      <Text fontWeight="600">
                        {formatDate(booking.date)}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {booking.time} 〜 {booking.endTime}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">担当スタッフ</Text>
                    <Text fontWeight="600">{booking.staff}</Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">ステータス</Text>
                    <Badge bg="green.500" color="white" px={3} py={1} borderRadius="full">
                      予約確定
                    </Badge>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">料金</Text>
                    <Text fontWeight="600" fontSize="lg" color="blue.600">
                      {formatPrice(booking.totalPrice)}
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text color="gray.600">支払い方法</Text>
                    <Text fontWeight="600">{booking.paymentMethod}</Text>
                  </HStack>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card>
            <CardContent p={6}>
              <VStack gap={4} align="stretch">
                <HStack gap={3}>
                  <Text fontSize="xl">📋</Text>
                  <Heading size="md" color="gray.800">
                    ご来店前にご確認ください
                  </Heading>
                </HStack>

                <VStack gap={3} align="start">
                  <Text fontSize="sm" color="gray.700">
                    • ご予約時間の5分前にはご来店ください
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    • 遅刻される場合は必ずお電話でご連絡ください
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    • キャンセルは前日の20時までにお願いします
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    • 体調不良の場合は無理をせずご連絡ください
                  </Text>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent p={6}>
              <VStack gap={4} align="stretch">
                <Heading size="md" color="gray.800">
                  次のステップ
                </Heading>

                <VStack gap={3} align="stretch">
                  <Box
                    p={4}
                    bg="blue.50"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="blue.200"
                  >
                    <HStack justify="space-between" align="center">
                      <VStack align="start" gap={1}>
                        <Text fontWeight="600" color="blue.800">
                          確認メールをチェック
                        </Text>
                        <Text fontSize="sm" color="blue.700">
                          予約詳細が記載されたメールを送信しました
                        </Text>
                      </VStack>
                      <Text fontSize="2xl">📧</Text>
                    </HStack>
                  </Box>

                  <Box
                    p={4}
                    bg="green.50"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="green.200"
                  >
                    <HStack justify="space-between" align="center">
                      <VStack align="start" gap={1}>
                        <Text fontWeight="600" color="green.800">
                          リマインダー通知
                        </Text>
                        <Text fontSize="sm" color="green.700">
                          予約日の前日にお知らせします
                        </Text>
                      </VStack>
                      <Text fontSize="2xl">🔔</Text>
                    </HStack>
                  </Box>

                  <Box
                    p={4}
                    bg="purple.50"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="purple.200"
                  >
                    <HStack justify="space-between" align="center">
                      <VStack align="start" gap={1}>
                        <Text fontWeight="600" color="purple.800">
                          アフターケア
                        </Text>
                        <Text fontSize="sm" color="purple.700">
                          施術後のケア方法をご案内します
                        </Text>
                      </VStack>
                      <Text fontSize="2xl">💆‍♀️</Text>
                    </HStack>
                  </Box>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <VStack gap={4} align="stretch">
            <HStack gap={4} justify="center">
              <Link href="/my/reservations">
                <Button variant="primary" size="lg">
                  予約一覧を見る
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  ホームに戻る
                </Button>
              </Link>
            </HStack>

            <Text textAlign="center" fontSize="sm" color="gray.600">
              何かご不明な点がございましたら、
              <Link href="/contact" style={{ color: '#3182ce', textDecoration: 'underline' }}>
                お問い合わせ
              </Link>
              からご連絡ください。
            </Text>
          </VStack>

        </VStack>
      </Container>
    </MainLayout>
  )
}