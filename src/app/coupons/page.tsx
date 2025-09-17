'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

// Mock data
const mockCoupons = [
  {
    id: '1',
    storeId: '1',
    title: '初回限定割引',
    description: '初回ご利用のお客様限定で10%OFF！',
    type: 'percentage',
    value: 10,
    code: 'FIRST10',
    expiryDate: new Date('2024-12-31'),
    isActive: true,
    conditions: '3000円以上のご利用で適用',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    storeId: '1',
    title: 'リピーター割引',
    description: '2回目以降のお客様に5%OFF',
    type: 'percentage',
    value: 5,
    code: 'REPEAT5',
    expiryDate: new Date('2024-12-31'),
    isActive: true,
    conditions: '5000円以上のご利用で適用',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    storeId: '2',
    title: 'ネイル新規オープン',
    description: '新規オープン記念！初回限定で1000円OFF',
    type: 'fixed',
    value: 1000,
    code: 'NAILOPEN',
    expiryDate: new Date('2024-03-31'),
    isActive: false,
    conditions: '4000円以上のご利用で適用',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=200&fit=crop'
  }
]

const mockStores = [
  { id: '1', name: 'Hair Studio TOKYO', category: 'HAIR_SALON' },
  { id: '2', name: 'Nail Art Paradise', category: 'NAIL_SALON' },
  { id: '3', name: 'Relax Spa & Massage', category: 'RELAXATION' }
]

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const activeCoupons = mockCoupons.filter(c =>
    c.isActive && new Date(c.expiryDate) > new Date()
  )
  const expiredCoupons = mockCoupons.filter(c =>
    !c.isActive || new Date(c.expiryDate) <= new Date()
  )

  const filteredActiveCoupons = activeCoupons.filter(coupon =>
    coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date))
  }

  const getCouponTypeColor = (type: string) => {
    switch (type) {
      case 'percentage': return 'green'
      case 'fixed': return 'blue'
      case 'special': return 'purple'
      default: return 'gray'
    }
  }

  const getCouponTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage': return 'パーセント割引'
      case 'fixed': return '定額割引'
      case 'special': return '特別オファー'
      default: return type
    }
  }

  const CouponCard = ({ coupon, isExpired = false }: { coupon: any, isExpired?: boolean }) => {
    const store = mockStores.find(s => s.id === coupon.storeId)
    const color = getCouponTypeColor(coupon.type)

    return (
      <Card opacity={isExpired ? 0.6 : 1}>
        <CardContent p={0}>
          <VStack gap={0} align="stretch">
            {/* Header */}
            <Box
              position="relative"
              p={6}
              bgGradient={`linear(135deg, ${color}.500, ${color}.600)`}
              color="white"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="-20px"
                right="-20px"
                w="80px"
                h="80px"
                bg="white"
                opacity={0.1}
                borderRadius="full"
              />
              <Box
                position="absolute"
                bottom="-30px"
                left="-30px"
                w="100px"
                h="100px"
                bg="white"
                opacity={0.1}
                borderRadius="full"
              />

              <VStack align="start" gap={2} position="relative">
                <Badge
                  bg="white"
                  color={`${color}.600`}
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                >
                  {getCouponTypeLabel(coupon.type)}
                </Badge>
                <Heading size="md" color="white">
                  {coupon.title}
                </Heading>
                <Text fontSize="sm" opacity={0.9}>
                  {store?.name}
                </Text>
              </VStack>
            </Box>

            {/* Content */}
            <Box p={4}>
              <VStack gap={4} align="stretch">
                <Text color="gray.700" fontSize="sm">
                  {coupon.description}
                </Text>

                <HStack justify="space-between" align="center">
                  <VStack align="start" gap={1}>
                    <Text fontSize="xs" color="gray.500">有効期限</Text>
                    <Text fontSize="sm" fontWeight="600">
                      {formatDate(coupon.expiryDate)}
                    </Text>
                  </VStack>
                  <VStack align="end" gap={1}>
                    <Text fontSize="xs" color="gray.500">クーポンコード</Text>
                    <Badge variant="outline" colorScheme={color}>
                      {coupon.code}
                    </Badge>
                  </VStack>
                </HStack>

                {coupon.conditions && (
                  <Box
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                    border="1px dashed"
                    borderColor="gray.200"
                  >
                    <Text fontSize="xs" color="gray.600" fontWeight="500">
                      利用条件: {coupon.conditions}
                    </Text>
                  </Box>
                )}

                <HStack justify="space-between" gap={3}>
                  {!isExpired ? (
                    <React.Fragment>
                      <Link href={`/stores/${coupon.storeId}`} style={{ flex: 1 }}>
                        <Button variant="outline" size="sm" fullWidth>
                          店舗詳細
                        </Button>
                      </Link>
                      <Button variant="primary" size="sm" flex={1}>
                        クーポンを使う
                      </Button>
                    </React.Fragment>
                  ) : (
                    <Button variant="ghost" size="sm" fullWidth disabled>
                      期限切れ
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </CardContent>
      </Card>
    )
  }

  return (
    <MainLayout>
      <Container maxW="6xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack gap={6} align="stretch">
            <VStack gap={4} align="center" textAlign="center">
              <Heading size="xl" color="gray.800">
                クーポン・キャンペーン
              </Heading>
              <Text color="gray.600" fontSize="lg" maxW="2xl">
                お得なクーポンとキャンペーン情報をチェックしましょう
              </Text>
            </VStack>

            {/* Search */}
            <Box maxW="400px" mx="auto">
              <Input
                placeholder="🔍 クーポンを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
          </VStack>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <Card>
              <CardContent p={6} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">
                    {activeCoupons.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    利用可能クーポン
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={6} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                    {mockStores.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    参加店舗数
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={6} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                    15%
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    最大割引率
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={6} textAlign="center">
                <VStack gap={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                    2,000円
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    最大割引額
                  </Text>
                </VStack>
              </CardContent>
            </Card>
          </SimpleGrid>

          {/* Tabs */}
          <VStack gap={6} align="stretch">
            {/* Tab Buttons */}
            <HStack gap={4}>
              <Button
                variant={activeTab === 0 ? "primary" : "outline"}
                onClick={() => setActiveTab(0)}
              >
                利用可能 ({filteredActiveCoupons.length})
              </Button>
              <Button
                variant={activeTab === 1 ? "primary" : "outline"}
                onClick={() => setActiveTab(1)}
              >
                期限切れ ({expiredCoupons.length})
              </Button>
            </HStack>

            {/* Tab Content */}
            {activeTab === 0 ? (
              /* Active Coupons */
              <VStack gap={6} align="stretch">
                {filteredActiveCoupons.length === 0 ? (
                  <Card>
                    <CardContent p={12} textAlign="center">
                      <VStack gap={4}>
                        <Text fontSize="5xl">🎫</Text>
                        <Heading size="md" color="gray.600">
                          {searchTerm ? '該当するクーポンが見つかりません' : 'クーポンがありません'}
                        </Heading>
                        <Text color="gray.500">
                          {searchTerm
                            ? '検索条件を変更してお試しください'
                            : '新しいクーポンが追加されるまでお待ちください'
                          }
                        </Text>
                        {searchTerm && (
                          <Button variant="outline" onClick={() => setSearchTerm('')}>
                            検索をクリア
                          </Button>
                        )}
                      </VStack>
                    </CardContent>
                  </Card>
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                    {filteredActiveCoupons.map((coupon) => (
                      <CouponCard key={coupon.id} coupon={coupon} />
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            ) : (
              /* Expired Coupons */
              <VStack gap={6} align="stretch">
                {expiredCoupons.length === 0 ? (
                  <Card>
                    <CardContent p={12} textAlign="center">
                      <VStack gap={4}>
                        <Text fontSize="5xl">✅</Text>
                        <Heading size="md" color="gray.600">
                          期限切れのクーポンはありません
                        </Heading>
                        <Text color="gray.500">
                          すべてのクーポンが有効期限内です
                        </Text>
                      </VStack>
                    </CardContent>
                  </Card>
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                    {expiredCoupons.map((coupon) => (
                      <CouponCard key={coupon.id} coupon={coupon} isExpired />
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            )}
          </VStack>

          {/* Information */}
          <Box
            bg="yellow.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="yellow.200"
          >
            <VStack gap={4} align="start">
              <Heading size="md" color="yellow.800">
                📋 クーポンご利用時の注意事項
              </Heading>
              <VStack align="start" gap={2} fontSize="sm" color="yellow.700">
                <Text>• クーポンは1回のご予約につき1枚まで利用可能です</Text>
                <Text>• 他のキャンペーンとの併用はできません</Text>
                <Text>• 有効期限をご確認の上ご利用ください</Text>
                <Text>• クーポンコードは予約時にご入力ください</Text>
                <Text>• 一部サービスではご利用いただけない場合があります</Text>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </MainLayout>
  )
}