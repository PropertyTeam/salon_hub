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
  Avatar,
  Image,
  Textarea
} from '@chakra-ui/react'
import {
  Field
} from '@/components/forms/field'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockStores, mockUsers } from '../../../../data/mockData'

export default function ReviewsPage() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [editingReview, setEditingReview] = useState('')

  const currentUser = mockUsers[0]

  // Mock reviews data
  const myReviews = [
    {
      id: '1',
      storeId: '1',
      storeName: 'Hair Studio TOKYO',
      menuName: 'カット + カラー',
      rating: 5,
      comment: 'とても満足しています。スタッフの方も親切で、仕上がりも期待以上でした。また利用したいと思います。',
      date: new Date('2024-01-10'),
      images: ['/api/placeholder/300/200'],
      helpful: 12,
      status: 'published'
    },
    {
      id: '2',
      storeId: '2',
      storeName: 'Relax Spa & Massage',
      menuName: 'アロマトリートメント 60分',
      rating: 4,
      comment: 'リラックスできました。次回はもう少し長めのコースにしたいと思います。',
      date: new Date('2024-01-05'),
      images: [],
      helpful: 8,
      status: 'published'
    },
    {
      id: '3',
      storeId: '3',
      storeName: 'Nail Art Paradise',
      menuName: 'ジェルネイル + アート',
      rating: 5,
      comment: 'デザインが可愛くて、持ちも良いです。技術力の高さを感じました。',
      date: new Date('2023-12-28'),
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
      helpful: 15,
      status: 'published'
    }
  ]

  const pendingReviews = [
    {
      id: '4',
      storeId: '4',
      storeName: 'Modern Beauty Salon',
      menuName: 'ヘッドスパ + トリートメント',
      date: new Date('2024-01-12'),
      status: 'pending'
    }
  ]

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const handleEditReview = (review: any) => {
    setSelectedReview(review)
    setEditingReview(review.comment)
    onOpen()
  }

  const handleSaveReview = () => {
    // Simulate saving review
    onClose()
    setSelectedReview(null)
    setEditingReview('')
  }

  const ReviewCard = ({ review }: { review: any }) => (
    <Card>
      <CardContent p={6}>
        <VStack gap={4} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" gap={2}>
              <Text fontWeight="600" color="gray.800" fontSize="lg">
                {review.storeName}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {review.menuName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {formatDate(review.date)}
              </Text>
            </VStack>
            <Badge
              bg={review.status === 'published' ? 'green.500' : 'yellow.500'}
              color="white"
              px={3}
              py={1}
              borderRadius="full"
            >
              {review.status === 'published' ? '公開中' : '下書き'}
            </Badge>
          </HStack>

          {/* Rating */}
          <HStack gap={2}>
            <Text fontSize="lg">{getRatingStars(review.rating)}</Text>
            <Text fontSize="sm" color="gray.600">
              {review.rating}/5
            </Text>
          </HStack>

          {/* Comment */}
          <Text color="gray.700" lineHeight="tall">
            {review.comment}
          </Text>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <HStack gap={2} overflowX="auto">
              {review.images.map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  alt={`レビュー画像 ${index + 1}`}
                  w="100px"
                  h="100px"
                  objectFit="cover"
                  borderRadius="8px"
                  flexShrink={0}
                />
              ))}
            </HStack>
          )}

          {/* Stats */}
          <HStack justify="space-between" align="center">
            <HStack gap={4}>
              <HStack gap={1}>
                <Text fontSize="sm">👍</Text>
                <Text fontSize="sm" color="gray.600">
                  {review.helpful}人が参考になったと回答
                </Text>
              </HStack>
            </HStack>

            <HStack gap={2}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditReview(review)}
              >
                編集
              </Button>
              <Button variant="ghost" size="sm">
                削除
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  )

  const PendingReviewCard = ({ review }: { review: any }) => (
    <Card>
      <CardContent p={6}>
        <VStack gap={4} align="stretch">
          <VStack align="start" gap={2}>
            <Text fontWeight="600" color="gray.800" fontSize="lg">
              {review.storeName}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {review.menuName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              利用日: {formatDate(review.date)}
            </Text>
          </VStack>

          <Box
            p={4}
            bg="yellow.50"
            borderRadius="8px"
            border="1px solid"
            borderColor="yellow.200"
          >
            <Text fontSize="sm" color="yellow.800">
              レビューの投稿をお待ちしています。他のお客様の参考になるレビューをお願いします。
            </Text>
          </Box>

          <HStack justify="end">
            <Link href={`/stores/${review.storeId}/review`}>
              <Button variant="primary" size="sm">
                レビューを書く
              </Button>
            </Link>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  )

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
              レビュー管理
            </Heading>
            <Text color="gray.600">
              投稿したレビューの確認と編集ができます
            </Text>
          </VStack>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="yellow.600">
                    {myReviews.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    投稿済みレビュー
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="orange.600">
                    {pendingReviews.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    投稿待ち
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="green.600">
                    {myReviews.reduce((sum, r) => sum + r.helpful, 0)}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    総「参考になった」数
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={4} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="800" color="blue.600">
                    {(myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    平均評価
                  </Text>
                </VStack>
              </CardContent>
            </Card>
          </SimpleGrid>

          {/* Tabs */}
          <Tabs>
            <TabList>
              <Tab>投稿済みレビュー ({myReviews.length})</Tab>
              <Tab>投稿待ち ({pendingReviews.length})</Tab>
            </TabList>

            <TabPanels>
              {/* Published Reviews */}
              <TabPanel px={0}>
                <VStack gap={6} align="stretch">
                  {myReviews.length === 0 ? (
                    <Card>
                      <CardContent p={12} textAlign="center">
                        <VStack gap={4}>
                          <Text fontSize="5xl">⭐</Text>
                          <Heading size="md" color="gray.600">
                            まだレビューがありません
                          </Heading>
                          <Text color="gray.500">
                            サロンを利用してレビューを投稿しましょう
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
                      {myReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </VStack>
                  )}
                </VStack>
              </TabPanel>

              {/* Pending Reviews */}
              <TabPanel px={0}>
                <VStack gap={6} align="stretch">
                  {pendingReviews.length === 0 ? (
                    <Card>
                      <CardContent p={12} textAlign="center">
                        <VStack gap={4}>
                          <Text fontSize="5xl">✅</Text>
                          <Heading size="md" color="gray.600">
                            投稿待ちのレビューはありません
                          </Heading>
                          <Text color="gray.500">
                            すべてのレビューを投稿済みです
                          </Text>
                        </VStack>
                      </CardContent>
                    </Card>
                  ) : (
                    <VStack gap={4} align="stretch">
                      {pendingReviews.map((review) => (
                        <PendingReviewCard key={review.id} review={review} />
                      ))}
                    </VStack>
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Review Guidelines */}
          <Box
            bg="blue.50"
            border="1px solid"
            borderColor="blue.200"
            borderRadius="12px"
            p={6}
          >
            <VStack gap={4} align="start">
              <HStack gap={3}>
                <Text fontSize="xl">📝</Text>
                <Heading size="sm" color="blue.800">
                  レビュー投稿のガイドライン
                </Heading>
              </HStack>
              <VStack gap={2} align="start">
                <Text fontSize="sm" color="blue.700">
                  • 具体的で建設的なレビューを心がけましょう
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • 他の利用者の参考になる情報を含めてください
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • 不適切な内容や個人情報は投稿しないでください
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • 投稿されたレビューは公開前に審査される場合があります
                </Text>
              </VStack>
            </VStack>
          </Box>

        </VStack>
      </Container>

      {/* Edit Review Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>レビューを編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack gap={4} align="stretch">
              {selectedReview && (
                <>
                  <Box>
                    <Text fontWeight="600">{selectedReview.storeName}</Text>
                    <Text fontSize="sm" color="gray.600">{selectedReview.menuName}</Text>
                  </Box>

                  <Field label="評価">
                    <Text fontSize="lg">{getRatingStars(selectedReview.rating)}</Text>
                  </Field>

                  <Field label="コメント">
                    <Textarea
                      value={editingReview}
                      onChange={(e) => setEditingReview(e.target.value)}
                      rows={5}
                      placeholder="レビューを入力してください..."
                    />
                  </Field>

                  <HStack justify="end" gap={3}>
                    <Button variant="ghost" onClick={onClose}>
                      キャンセル
                    </Button>
                    <Button variant="primary" onClick={handleSaveReview}>
                      保存
                    </Button>
                  </HStack>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MainLayout>
  )
}