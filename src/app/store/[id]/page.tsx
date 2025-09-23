'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
  Center,
  Badge,
  SimpleGrid,
  Image
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import {
  getMockStoreById,
  getMockMenusByStoreId,
  getMockStaffByStoreId,
  getMockReviewsByStoreId
} from '../../../../data/mockData'

export default function StoreDetailPage() {
  const params = useParams()
  const storeId = params.id as string
  const [isClient, setIsClient] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const store = getMockStoreById(storeId)
  const menus = getMockMenusByStoreId(storeId)
  const staff = getMockStaffByStoreId(storeId)
  const reviews = getMockReviewsByStoreId(storeId)

  // Hydration エラーを防ぐため、クライアントサイドでのマウント後まで待機
  if (!isClient) {
    return (
      <MainLayout>
        <Container maxW="7xl" py={8}>
          <Center py={20}>
            <Text>Loading...</Text>
          </Center>
        </Container>
      </MainLayout>
    )
  }

  if (!store) {
    return (
      <MainLayout>
        <Container maxW="7xl" py={8}>
          <Center py={20}>
            <VStack gap={4}>
              <Text fontSize="6xl">🔍</Text>
              <Heading size="md" color="gray.600">
                サロンが見つかりません
              </Heading>
              <Text color="gray.500" textAlign="center">
                指定されたサロンは存在しないか、非公開になっています
              </Text>
              <Link href="/stores">
                <Button variant="outline">
                  サロン一覧に戻る
                </Button>
              </Link>
            </VStack>
          </Center>
        </Container>
      </MainLayout>
    )
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'HAIR_SALON': return '✂️'
      case 'NAIL_SALON': return '💅'
      case 'EYELASH': return '👁️'
      case 'RELAXATION': return '🌸'
      case 'ESTHETIC': return '✨'
      default: return '🏪'
    }
  }

  const getCategoryLabel = (category?: string) => {
    const categories = [
      { value: 'HAIR_SALON', label: '美容室・ヘアサロン' },
      { value: 'NAIL_SALON', label: 'ネイルサロン' },
      { value: 'EYELASH', label: 'まつげエクステ' },
      { value: 'RELAXATION', label: 'リラクゼーション・マッサージ' },
      { value: 'ESTHETIC', label: 'エステティック' }
    ]
    const found = categories.find(cat => cat.value === category)
    return found ? found.label : 'サロン'
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
  }

  const formatDuration = (duration: number) => {
    if (duration >= 60) {
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60
      return minutes > 0 ? `${hours}時間${minutes}分` : `${hours}時間`
    }
    return `${duration}分`
  }

  return (
    <MainLayout>
      <Container maxW="7xl" py={8}>
        <VStack gap={8} align="stretch">
          
          {/* Breadcrumb */}
          <HStack
            color="gray.600"
            fontSize="sm"
            fontWeight="medium"
          >
            <Link href="/stores">
              <Text
                _hover={{
                  color: 'primary.600',
                  textDecoration: 'underline'
                }}
                transition="color 0.2s ease"
                cursor="pointer"
              >
                サロン一覧
              </Text>
            </Link>
            <Text color="gray.400">›</Text>
            <Text color="gray.900" fontWeight="semibold">
              {store.name}
            </Text>
          </HStack>

          {/* Store Header */}
          <Box
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            p={8}
            shadow="lg"
          >
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            
              {/* Cosmic Images */}
              <GridItem>
                <VStack gap={4}>
                  {/* Main Image */}
                  <Box
                    w="full"
                    h="400px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="gray.100"
                  >
                    {store.images && store.images.length > 0 ? (
                      <Image
                        src={store.images[selectedImageIndex]}
                        alt={store.name}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    ) : (
                      <Center h="full" bg="gray.100">
                        <VStack gap={3}>
                          <Box fontSize="6xl" color="gray.500">
                            {getCategoryIcon(store.category)}
                          </Box>
                          <Badge
                            bg="white"
                            color="gray.700"
                            fontSize="sm"
                            px={4}
                            py={2}
                            borderRadius="md"
                            fontWeight="medium"
                            shadow="sm"
                          >
                            {getCategoryLabel(store.category)}
                          </Badge>
                        </VStack>
                      </Center>
                    )}
                  </Box>

                  {/* Thumbnail Images */}
                  {store.images && store.images.length > 1 && (
                    <HStack gap={3} w="full" overflow="auto" pb={2}>
                      {store.images.map((image, index) => (
                        <Box
                          key={index}
                          w="80px"
                          h="60px"
                          borderRadius="md"
                          overflow="hidden"
                          cursor="pointer"
                          border="2px solid"
                          borderColor={selectedImageIndex === index ? 'primary.500' : 'gray.200'}
                          onClick={() => setSelectedImageIndex(index)}
                          transition="all 0.2s ease"
                          _hover={{
                            borderColor: selectedImageIndex === index ? 'primary.600' : 'gray.300'
                          }}
                        >
                          <Image
                            src={image}
                            alt={`${store.name} ${index + 1}`}
                            w="full"
                            h="full"
                            objectFit="cover"
                          />
                        </Box>
                      ))}
                    </HStack>
                  )}
              </VStack>
            </GridItem>

              {/* Cosmic Store Info */}
              <GridItem>
                <VStack align="stretch" gap={6} position="relative">
                
                {/* Title and Rating */}
                <VStack align="stretch" gap={4}>
                  <VStack align="start" gap={3}>
                    <Badge
                      bg="primary.50"
                      color="primary.700"
                      fontSize="sm"
                      px={4}
                      py={2}
                      borderRadius="md"
                      fontWeight="medium"
                    >
                      {getCategoryLabel(store.category)}
                    </Badge>
                    <Heading
                      color="gray.800"
                      fontWeight="800"
                      fontSize="3xl"
                      lineHeight="1.1"
                      letterSpacing="-0.02em"
                    >
                      {store.name}
                    </Heading>
                  </VStack>

                  <HStack gap={6}>
                    <Box
                      bg="gray.50"
                      px={4}
                      py={3}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <HStack gap={2}>
                        <Text color="orange.500" fontSize="lg" fontWeight="semibold">
                          ★ {store.rating?.toFixed(1) || '4.0'}
                        </Text>
                        <Text color="gray.600" fontSize="sm" fontWeight="medium">
                          ({store.reviewCount || 0}件)
                        </Text>
                      </HStack>
                    </Box>
                  </HStack>
                </VStack>

                {/* Description */}
                <Text
                  color="gray.700"
                  lineHeight="1.8"
                  fontSize="md"
                  fontWeight="500"
                  bg="gray.50"
                  p={4}
                  borderRadius="16px"
                  border="2px solid"
                  borderColor="gray.100"
                >
                  {store.description}
                </Text>

                {/* Tags */}
                <HStack gap={3} flexWrap="wrap">
                  {store.tags?.map((tag, index) => (
                    <Badge
                      key={index}
                      bg={index === 0 ? "primary.50" : "gray.100"}
                      color={index === 0 ? "primary.700" : "gray.700"}
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontWeight="medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>

                {/* Contact Info */}
                <Card variant="outline">
                  <CardContent p={6}>
                    <VStack align="stretch" gap={4}>
                      <Heading
                        size="sm"
                        color="gray.900"
                        fontWeight="semibold"
                        mb={2}
                      >
                        店舗情報
                      </Heading>
                      <VStack align="stretch" gap={3}>
                        <HStack gap={3} align="start">
                          <Text fontSize="sm" color="gray.600" fontWeight="medium" minW="50px">住所:</Text>
                          <Text fontSize="sm" color="gray.800">{store.address}</Text>
                        </HStack>
                        <HStack gap={3} align="start">
                          <Text fontSize="sm" color="gray.600" fontWeight="medium" minW="50px">電話:</Text>
                          <Text fontSize="sm" color="gray.800">{store.phone}</Text>
                        </HStack>
                        {store.website && (
                          <HStack gap={3} align="start">
                            <Text fontSize="sm" color="gray.600" fontWeight="medium" minW="50px">Web:</Text>
                            <Text
                              fontSize="sm"
                              color="primary.600"
                              fontWeight="medium"
                              _hover={{
                                textDecoration: 'underline',
                                color: 'primary.700'
                              }}
                              cursor="pointer"
                            >
                              {store.website}
                            </Text>
                          </HStack>
                        )}
                        <HStack gap={3} align="start">
                          <Text fontSize="sm" color="gray.600" fontWeight="medium" minW="50px">営業:</Text>
                          <Badge
                            bg="green.50"
                            color="green.700"
                            fontSize="xs"
                            px={3}
                            py={1}
                            borderRadius="md"
                            fontWeight="medium"
                          >
                            営業中 • 20:00まで
                          </Badge>
                        </HStack>
                      </VStack>
                    </VStack>
                  </CardContent>
                </Card>

                {/* Reservation Button */}
                <Link href={`/store/${storeId}/reservation`}>
                  <Button
                    variant="primary"
                    fullWidth={true}
                  >
                    今すぐ予約する
                  </Button>
                </Link>

              </VStack>
            </GridItem>
            </Grid>
          </Box>

          {/* Menu Section */}
          <VStack gap={12} align="stretch">
              
            {/* Menu */}
            <Box>
                <VStack gap={6} align="stretch">
                  <Heading size="md" color="gray.800">メニュー一覧</Heading>
                  
                  {menus.length === 0 ? (
                    <Center py={12}>
                      <VStack gap={3}>
                        <Text fontSize="4xl">📋</Text>
                        <Text color="gray.500">メニュー情報がまだ登録されていません</Text>
                      </VStack>
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                      {menus.map((menu) => (
                        <Box
                          key={menu.id}
                          bg="white"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="gray.200"
                          shadow="sm"
                          p={6}
                          _hover={{
                            shadow: 'md',
                            borderColor: 'primary.300'
                          }}
                          transition="all 0.2s ease"
                        >
                          <VStack align="stretch" gap={4}>
                            <HStack justify="space-between" align="start">
                              <VStack align="start" gap={2} flex="1">
                                <Heading
                                  size="md"
                                  color="gray.900"
                                  fontWeight="semibold"
                                >
                                  {menu.name}
                                </Heading>
                                <Text color="gray.600" fontSize="sm" lineHeight="1.6" fontWeight="500">
                                  {menu.description}
                                </Text>
                              </VStack>
                              <VStack align="end" gap={1}>
                                <Text
                                  color="gray.900"
                                  fontWeight="bold"
                                  fontSize="xl"
                                >
                                  {formatPrice(menu.price)}
                                </Text>
                                <Badge
                                  bg="gray.100"
                                  color="gray.700"
                                  fontSize="xs"
                                  px={3}
                                  py={1}
                                  borderRadius="md"
                                  fontWeight="medium"
                                >
                                  {formatDuration(menu.duration)}
                                </Badge>
                              </VStack>
                            </HStack>
                            <HStack justify="space-between" align="center">
                              <Badge
                                bg="primary.50"
                                color="primary.700"
                                fontSize="sm"
                                px={4}
                                py={2}
                                borderRadius="md"
                                fontWeight="medium"
                              >
                                {menu.category}
                              </Badge>
                              <Button
                                variant="primary"
                                size="sm"
                              >
                                予約する
                              </Button>
                            </HStack>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
            </Box>

            {/* Staff Section */}
            <Box
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              p={8}
              shadow="sm"
            >
              <VStack gap={6} align="stretch">
                <Heading size="lg" color="gray.900" fontWeight="semibold">
                  スタッフ紹介
                </Heading>
                  
                  {staff.length === 0 ? (
                    <Center py={12}>
                      <VStack gap={3}>
                        <Text fontSize="4xl">👥</Text>
                        <Text color="gray.500">スタッフ情報がまだ登録されていません</Text>
                      </VStack>
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                      {staff.map((member, index) => (
                        <Box
                          key={member.id}
                          bg="gray.50"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="gray.200"
                          p={6}
                        >
                          <VStack gap={4}>
                            <Box
                              w="60px"
                              h="60px"
                              borderRadius="full"
                              bg="gray.200"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text fontSize="2xl" color="gray.500">
                                👤
                              </Text>
                            </Box>
                            <VStack gap={3}>
                              <VStack gap={2}>
                                <Heading
                                  size="sm"
                                  color="gray.900"
                                  textAlign="center"
                                >
                                  {member.name}
                                </Heading>
                                <Badge
                                  bg={member.role === 'MANAGER' ? 'primary.50' :
                                      member.role === 'OWNER' ? 'orange.50' : 'gray.100'}
                                  color={member.role === 'MANAGER' ? 'primary.700' :
                                         member.role === 'OWNER' ? 'orange.700' : 'gray.700'}
                                  fontSize="xs"
                                  px={3}
                                  py={1}
                                  borderRadius="md"
                                  fontWeight="medium"
                                >
                                  {member.role === 'MANAGER' ? 'マネージャー' :
                                   member.role === 'OWNER' ? 'オーナー' : 'スタッフ'}
                                </Badge>
                              </VStack>
                              <Text
                                color="gray.600"
                                fontSize="sm"
                                textAlign="center"
                                lineHeight="1.6"
                              >
                                {member.bio}
                              </Text>
                              <HStack gap={2} flexWrap="wrap" justify="center">
                                {member.specialties?.map((specialty, specIndex) => (
                                  <Badge
                                    key={specIndex}
                                    bg="gray.100"
                                    color="gray.700"
                                    fontSize="xs"
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                    fontWeight="medium"
                                  >
                                    {specialty}
                                  </Badge>
                                ))}
                              </HStack>
                            </VStack>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
            </Box>

            {/* Reviews */}
            <Box>
                <VStack gap={6} align="stretch">
                  <HStack justify="space-between" align="center">
                    <Heading size="md" color="gray.800">レビュー</Heading>
                    <Button variant="outline" size="sm">
                      レビューを書く
                    </Button>
                  </HStack>
                  
                  {/* Review Summary */}
                  <Card variant="outline">
                    <CardContent p={6}>
                      <HStack gap={8} justify="center">
                        <VStack gap={2}>
                          <Text fontSize="3xl" fontWeight="bold" color="gray.900">
                            {store.rating?.toFixed(1) || '4.0'}
                          </Text>
                          <HStack gap={1}>
                            <Text color="orange.400">★★★★★</Text>
                          </HStack>
                          <Text color="gray.500" fontSize="sm">
                            {store.reviewCount || 0}件のレビュー
                          </Text>
                        </VStack>
                        <Box h="80px" w="1px" bg="gray.200" />
                        <VStack gap={2} align="start">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <HStack key={rating} gap={2}>
                              <Text fontSize="sm" color="gray.600" minW="20px">
                                {rating}
                              </Text>
                              <Box w="100px" h="4px" bg="gray.100" borderRadius="full">
                                <Box 
                                  w={`${rating === 5 ? 80 : rating === 4 ? 15 : 5}%`} 
                                  h="full" 
                                  bg="orange.400" 
                                  borderRadius="full" 
                                />
                              </Box>
                              <Text fontSize="xs" color="gray.500">
                                ({rating === 5 ? Math.floor((reviews.length || 0) * 0.8) : 
                                  rating === 4 ? Math.floor((reviews.length || 0) * 0.15) : 
                                  Math.floor((reviews.length || 0) * 0.05)})
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </HStack>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  {reviews.length === 0 ? (
                    <Center py={12}>
                      <VStack gap={3}>
                        <Text fontSize="4xl">💬</Text>
                        <Text color="gray.500">レビューがまだ投稿されていません</Text>
                      </VStack>
                    </Center>
                  ) : (
                    <VStack gap={4} align="stretch">
                      {reviews.map((review) => (
                        <Card key={review.id} variant="outline">
                          <CardContent p={5}>
                            <VStack align="stretch" gap={3}>
                              <HStack justify="space-between" align="start">
                                <HStack gap={3}>
                          
                                  <Box
                                    w="32px"
                                    h="32px"
                                    borderRadius="full"
                                    bg="gray.100"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Text fontSize="sm">👤</Text>
                                  </Box>
                                  <VStack align="start" gap={0}>
                                    <Text fontWeight="medium" fontSize="sm">
                                      匿名ユーザー
                                    </Text>
                                    <HStack gap={1}>
                                      <Text color="orange.400" fontSize="sm">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                      </Text>
                                      <Text color="gray.500" fontSize="xs">
                                        {review.createdAt.toLocaleDateString('ja-JP')}
                                      </Text>
                                    </HStack>
                                  </VStack>
                                </HStack>
                              </HStack>
                              <Text color="gray.700" fontSize="sm" lineHeight="1.6">
                                {review.comment}
                              </Text>
                            </VStack>
                          </CardContent>
                        </Card>
                      ))}
                    </VStack>
                  )}
                </VStack>
            </Box>

            {/* Access */}
            <Box>
                <VStack gap={6} align="stretch">
                  <Heading size="md" color="gray.800">アクセス・営業時間</Heading>
                  
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
                    
                    {/* Access Info */}
                    <GridItem>
                      <Card variant="outline">
                        <CardContent p={6}>
                          <VStack align="stretch" gap={4}>
                            <Heading size="sm" color="gray.800">アクセス情報</Heading>
                            
                            <VStack align="stretch" gap={3}>
                              <HStack gap={3} align="start">
                                <Text fontSize="sm" color="gray.500" minW="60px">住所</Text>
                                <Text fontSize="sm" color="gray.700">{store.address}</Text>
                              </HStack>
                              <HStack gap={3} align="start">
                                <Text fontSize="sm" color="gray.500" minW="60px">最寄駅</Text>
                                <VStack align="start" gap={1}>
                                  <Text fontSize="sm" color="gray.700">渋谷駅 徒歩5分</Text>
                                  <Text fontSize="sm" color="gray.700">表参道駅 徒歩8分</Text>
                                </VStack>
                              </HStack>
                              <HStack gap={3} align="start">
                                <Text fontSize="sm" color="gray.500" minW="60px">電話</Text>
                                <Text fontSize="sm" color="gray.700">{store.phone}</Text>
                              </HStack>
                            </VStack>

                            <Button variant="outline" size="sm" fullWidth={true}>
                              地図を表示
                            </Button>
                          </VStack>
                        </CardContent>
                      </Card>
                    </GridItem>

                    {/* Business Hours */}
                    <GridItem>
                      <Card variant="outline">
                        <CardContent p={6}>
                          <VStack align="stretch" gap={4}>
                            <Heading size="sm" color="gray.800">営業時間</Heading>
                            
                            <VStack align="stretch" gap={2}>
                              {[
                                { day: '月曜日', time: '10:00 - 20:00' },
                                { day: '火曜日', time: '10:00 - 20:00' },
                                { day: '水曜日', time: '10:00 - 20:00' },
                                { day: '木曜日', time: '10:00 - 20:00' },
                                { day: '金曜日', time: '10:00 - 21:00' },
                                { day: '土曜日', time: '09:00 - 21:00' },
                                { day: '日曜日', time: '09:00 - 19:00' }
                              ].map((schedule, index) => (
                                <HStack key={index} justify="space-between">
                                  <Text fontSize="sm" color="gray.600">{schedule.day}</Text>
                                  <Text fontSize="sm" color="gray.700" fontWeight="medium">
                                    {schedule.time}
                                  </Text>
                                </HStack>
                              ))}
                            </VStack>

                            <Box pt={2}>
                              <Text fontSize="xs" color="gray.500">
                                ※祝日は営業時間が異なる場合があります
                              </Text>
                            </Box>
                          </VStack>
                        </CardContent>
                      </Card>
                    </GridItem>
                  </Grid>
                </VStack>
            </Box>
          </VStack>

        </VStack>
      </Container>
    </MainLayout>
  )
}