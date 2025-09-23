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
  Image,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react'
import { Alert } from '@chakra-ui/alert'
import { Divider } from '@chakra-ui/layout'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/modal'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockReservations, getMockStoreById } from '../../../../../data/mockData'

export default function ReservationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { open: isOpen, onOpen, onClose } = useDisclosure()
  const [showCancelSuccess, setShowCancelSuccess] = useState(false)

  const reservation = mockReservations.find(r => r.id === params.id)
  const store = reservation ? getMockStoreById(reservation.storeId) : null

  if (!reservation || !store) {
    return <div>Reservation not found</div>
  }

  const isUpcoming = new Date(reservation.date) > new Date() && reservation.status !== 'CANCELLED'
  const canCancel = isUpcoming && reservation.status === 'CONFIRMED'
  const canModify = isUpcoming && reservation.status === 'CONFIRMED'

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
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

  const handleCancelReservation = () => {
    // Simulate cancellation
    setShowCancelSuccess(true)
    onClose()
    setTimeout(() => {
      router.push('/my/reservations')
    }, 2000)
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
            <HStack justify="space-between" w="100%" align="center">
              <VStack align="start" gap={2}>
                <Heading size="lg" color="gray.800">
                  予約詳細
                </Heading>
                <Text color="gray.600">
                  予約ID: {reservation.id}
                </Text>
              </VStack>
              {getStatusBadge(reservation.status)}
            </HStack>
          </VStack>

          {/* Cancel Success Alert */}
          {showCancelSuccess && (
            <Alert status="success" borderRadius="12px">
              予約をキャンセルしました。予約一覧画面に戻ります...
            </Alert>
          )}

          {/* Store & Reservation Info */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">

                {/* Store Header */}
                <HStack gap={4}>
                  <Image
                    src={store.images?.[0] || '/placeholder-store.jpg'}
                    alt={store.name}
                    w={20}
                    h={20}
                    objectFit="cover"
                    borderRadius="12px"
                  />
                  <VStack align="start" gap={2}>
                    <Text fontWeight="600" color="gray.800" fontSize="xl">
                      {store.name}
                    </Text>
                    <Text color="gray.600">
                      {store.address}
                    </Text>
                    <HStack gap={4}>
                      <Text fontSize="sm" color="gray.600">
                        📞 {store.phone}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        ⭐ {store.rating} ({store.reviewCount}件)
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>

                <Divider />

                {/* Reservation Details */}
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                  <VStack align="start" gap={4}>
                    <Heading size="md" color="gray.800">
                      予約情報
                    </Heading>

                    <VStack align="start" gap={3}>
                      <HStack gap={2}>
                        <Text fontSize="sm" color="gray.500" w="80px">日付:</Text>
                        <Text fontSize="sm" fontWeight="600">
                          {formatDate(reservation.date)}
                        </Text>
                      </HStack>

                      <HStack gap={2}>
                        <Text fontSize="sm" color="gray.500" w="80px">時間:</Text>
                        <Text fontSize="sm" fontWeight="600">
                          {formatTime(reservation.startTime)} 〜 {formatTime(reservation.endTime)}
                        </Text>
                      </HStack>

                      <HStack gap={2}>
                        <Text fontSize="sm" color="gray.500" w="80px">メニュー:</Text>
                        <Text fontSize="sm" fontWeight="600">
                          カット + カラー
                        </Text>
                      </HStack>

                      <HStack gap={2}>
                        <Text fontSize="sm" color="gray.500" w="80px">担当者:</Text>
                        <Text fontSize="sm" fontWeight="600">
                          田中 美香さん
                        </Text>
                      </HStack>

                      <HStack gap={2}>
                        <Text fontSize="sm" color="gray.500" w="80px">料金:</Text>
                        <Text fontSize="lg" fontWeight="600" color="blue.600">
                          {formatPrice(reservation.totalPrice)}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>

                  <VStack align="start" gap={4}>
                    <Heading size="md" color="gray.800">
                      アクセス情報
                    </Heading>

                    <VStack align="start" gap={3}>
                      <VStack align="start" gap={2}>
                        <Text fontSize="sm" fontWeight="600">住所</Text>
                        <Text fontSize="sm" color="gray.700">
                          {store.address}
                        </Text>
                      </VStack>

                      <VStack align="start" gap={2}>
                        <Text fontSize="sm" fontWeight="600">アクセス</Text>
                        <Text fontSize="sm" color="gray.700">
                          JR山手線 渋谷駅 徒歩3分<br />
                          東急東横線 渋谷駅 徒歩5分
                        </Text>
                      </VStack>

                      <VStack align="start" gap={2}>
                        <Text fontSize="sm" fontWeight="600">営業時間</Text>
                        <Text fontSize="sm" color="gray.700">
                          10:00 - 20:00（平日）<br />
                          09:00 - 19:00（土日祝）
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                </SimpleGrid>

                {/* Notes */}
                {reservation.notes && (
                  <>
                    <Divider />
                    <VStack align="start" gap={3}>
                      <Heading size="md" color="gray.800">
                        備考・要望
                      </Heading>
                      <Box
                        p={4}
                        bg="gray.50"
                        borderRadius="8px"
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <Text fontSize="sm" color="gray.700">
                          {reservation.notes}
                        </Text>
                      </Box>
                    </VStack>
                  </>
                )}

              </VStack>
            </CardContent>
          </Card>

          {/* Important Information */}
          {isUpcoming && (
            <Box
              bg="blue.50"
              border="1px solid"
              borderColor="blue.200"
              borderRadius="12px"
              p={6}
            >
              <VStack gap={4} align="start">
                <HStack gap={3}>
                  <Text fontSize="xl">💡</Text>
                  <Heading size="sm" color="blue.800">
                    ご来店前にご確認ください
                  </Heading>
                </HStack>
                <VStack gap={2} align="start">
                  <Text fontSize="sm" color="blue.700">
                    • ご予約時間の5分前にはご来店ください
                  </Text>
                  <Text fontSize="sm" color="blue.700">
                    • 遅刻される場合は必ずお電話でご連絡ください
                  </Text>
                  <Text fontSize="sm" color="blue.700">
                    • キャンセルは前日の20時までにお願いします
                  </Text>
                  <Text fontSize="sm" color="blue.700">
                    • 体調不良の場合は無理をせずご連絡ください
                  </Text>
                </VStack>
              </VStack>
            </Box>
          )}

          {/* Action Buttons */}
          <HStack gap={4} justify="center" wrap="wrap">
            <Link href={`tel:${store.phone}`}>
              <Button variant="outline" size="lg">
                📞 店舗に電話
              </Button>
            </Link>

            {canModify && (
              <Button variant="outline" size="lg">
                ✏️ 予約を変更
              </Button>
            )}

            {canCancel && (
              <Button variant="danger" size="lg" onClick={onOpen}>
                キャンセル
              </Button>
            )}

            {reservation.status === 'COMPLETED' && (
              <Link href={`/stores/${reservation.storeId}/review`}>
                <Button variant="primary" size="lg">
                  ⭐ レビューを書く
                </Button>
              </Link>
            )}

            <Link href="/my/reservations">
              <Button variant="ghost" size="lg">
                予約一覧に戻る
              </Button>
            </Link>
          </HStack>

        </VStack>
      </Container>

      {/* Cancel Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>予約をキャンセルしますか？</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack gap={4} align="stretch">
              <Text color="gray.700">
                以下の予約をキャンセルします。この操作は取り消せません。
              </Text>

              <Box
                p={4}
                bg="gray.50"
                borderRadius="8px"
                border="1px solid"
                borderColor="gray.200"
              >
                <VStack align="start" gap={2}>
                  <Text fontWeight="600">{store.name}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {formatDate(reservation.date)} {formatTime(reservation.startTime)}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {formatPrice(reservation.totalPrice)}
                  </Text>
                </VStack>
              </Box>

              <Box
                p={4}
                bg="red.50"
                borderRadius="8px"
                border="1px solid"
                borderColor="red.200"
              >
                <VStack align="start" gap={2}>
                  <Text fontSize="sm" fontWeight="600" color="red.800">
                    キャンセルポリシー
                  </Text>
                  <Text fontSize="sm" color="red.700">
                    • 前日20時以降のキャンセルは50%のキャンセル料が発生します
                  </Text>
                  <Text fontSize="sm" color="red.700">
                    • 当日キャンセルは100%のキャンセル料が発生します
                  </Text>
                </VStack>
              </Box>

              <HStack justify="end" gap={3}>
                <Button variant="ghost" onClick={onClose}>
                  戻る
                </Button>
                <Button variant="danger" onClick={handleCancelReservation}>
                  キャンセル確定
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MainLayout>
  )
}