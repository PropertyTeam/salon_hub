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
  SimpleGrid,
  Center,
  Badge
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { SalonCarousel } from '@/components/ui/SalonCarousel'
const mockStores = [
  {
    id: '1',
    name: 'Hair Studio TOKYO',
    description: '東京で最高のヘアサロン体験を提供します。経験豊富なスタイリストがお客様のご要望にお応えします。',
    address: '東京都渋谷区神南1-15-3',
    phone: '03-1234-5678',
    email: 'info@hairstudio.com',
    website: 'https://hairstudio.com',
    isActive: true,
    isPublic: true,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop'
    ],
    ownerId: '3',
    category: 'HAIR_SALON' as const,
    tags: ['カット', 'カラー', 'パーマ', 'トリートメント'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Nail Art Paradise',
    description: 'プロフェッショナルなネイルアーティストによる美しいネイルアートをご提供。',
    address: '東京都新宿区歌舞伎町2-25-8',
    phone: '03-2345-6789',
    email: 'info@nailart.com',
    website: 'https://nailart-paradise.com',
    isActive: true,
    isPublic: true,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop'
    ],
    ownerId: '3',
    category: 'NAIL_SALON' as const,
    tags: ['ネイルアート', 'ジェルネイル', 'マニキュア', 'ケア'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Relax Spa & Massage',
    description: 'リラクゼーションとマッサージで心身ともにリフレッシュしていただけるサロンです。',
    address: '東京都港区青山3-10-5',
    phone: '03-3456-7890',
    email: 'info@relaxspa.com',
    website: 'https://relaxspa.com',
    isActive: true,
    isPublic: true,
    rating: 4.9,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    ],
    ownerId: '3',
    category: 'RELAXATION' as const,
    tags: ['マッサージ', 'リラクゼーション', 'アロマ', 'フェイシャル'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-12'),
  },
];

export default function HomePage() {
  const [searchArea, setSearchArea] = useState('')
  const [searchService, setSearchService] = useState('')
  const [searchDate, setSearchDate] = useState('')
  
  // Get salons for display (using fixed order to prevent hydration errors)
  const randomSalons = mockStores

  const services = [
    { value: '', label: 'すべてのサービス' },
    { value: 'hair', label: '美容室・ヘアサロン' },
    { value: 'nail', label: 'ネイルサロン' },
    { value: 'eyelash', label: 'まつげエクステ' },
    { value: 'massage', label: 'リラクゼーション' },
    { value: 'esthetic', label: 'エステティック' }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <Box
        position="relative"
        bg="white"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="6xl" position="relative" zIndex={1}>
          <VStack gap={12} align="center">
            {/* Main Heading */}
            <VStack gap={6} textAlign="center" maxW="4xl">
              <Heading
                size={{ base: '2xl', md: '4xl' }}
                fontWeight="bold"
                color="gray.900"
                lineHeight="1.2"
              >
                理想のサロンを見つけよう
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.600"
                fontWeight="medium"
                lineHeight="1.6"
              >
                美容室からネイル、エステまで。あなたにぴったりのサロンを簡単予約
              </Text>
            </VStack>

            {/* Search Box */}
            <Box
              bg="white"
              borderRadius="xl"
              p={8}
              shadow="lg"
              border="1px solid"
              borderColor="gray.200"
              w="full"
              maxW="4xl"
            >
              <Grid 
                templateColumns={{ base: '1fr', md: '2fr 1fr 1fr auto' }} 
                gap={4}
                alignItems="end"
              >
                <GridItem>
                  <Input
                    placeholder="目的地を入力"
                    size="lg"
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                  />
                </GridItem>
                
                <GridItem>
                  <Box position="relative">
                    <select
                      value={searchService}
                      onChange={(e) => setSearchService(e.target.value)}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '16px',
                        backgroundColor: '#f7fafc',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        color: '#4a5568',
                        outline: 'none'
                      }}
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </Box>
                </GridItem>
                
                <GridItem>
                  <Input
                    type="date"
                    size="lg"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                </GridItem>
                
                <GridItem>
                  <Button
                    variant="primary"
                    size="lg"
                  >
                    検索
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Quick Filters */}
      <Box bg="gray.50" py={6}>
        <Container maxW="6xl">
          <HStack gap={3} flexWrap="wrap" justify="center">
            <Text fontSize="sm" color="gray.600" fontWeight="medium">人気の検索:</Text>
            {['渋谷の美容室', 'ネイルサロン 新宿', '表参道 カット', 'エステ 銀座'].map((term) => (
              <Button
                key={term}
                variant="ghost"
                size="sm"
              >
                {term}
              </Button>
            ))}
          </HStack>
        </Container>
      </Box>

      {/* News & Announcements */}
      <Box py={16} bg="primary.50">
        <Container maxW="6xl">
          <VStack gap={8} align="stretch">

            {/* Header */}
            <VStack gap={3} textAlign="center">
              <Heading
                size="lg"
                color="gray.900"
                fontWeight="bold"
              >
                お知らせ
              </Heading>
              <Text color="gray.600" fontSize="lg">
                最新のキャンペーンやニュースをお届けします
              </Text>
            </VStack>

            {/* News Cards */}
            <VStack gap={4} align="stretch">
              {[
                {
                  id: 1,
                  date: "2024.01.15",
                  category: "キャンペーン",
                  title: "新春キャンペーン開催中！対象メニューが最大30%OFF",
                  description: "1月末まで期間限定で人気メニューがお得に。この機会をお見逃しなく！",
                  isNew: true
                },
                {
                  id: 2,
                  date: "2024.01.10",
                  category: "新機能",
                  title: "オンライン予約システムがさらに便利に",
                  description: "24時間いつでも予約・変更・キャンセルが可能になりました。",
                  isNew: true
                },
                {
                  id: 3,
                  date: "2024.01.05",
                  category: "お知らせ",
                  title: "営業時間変更のご案内",
                  description: "一部店舗で営業時間を変更いたします。詳細は各店舗ページをご確認ください。",
                  isNew: false
                }
              ].map((news, index) => (
                <Box
                  key={news.id}
                  bg="white"
                  borderRadius="lg"
                  p={6}
                  border="1px solid"
                  borderColor="gray.200"
                  shadow="sm"
                  _hover={{
                    shadow: "md",
                    borderColor: "primary.300"
                  }}
                  transition="all 0.2s ease"
                  cursor="pointer"
                >
                  <HStack gap={4} align="start">
                    <VStack align="start" gap={1} minW="80px">
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        {news.date}
                      </Text>
                      <Badge
                        bg={news.category === "キャンペーン" ? "orange.50" :
                            news.category === "新機能" ? "primary.50" : "gray.100"}
                        color={news.category === "キャンペーン" ? "orange.700" :
                               news.category === "新機能" ? "primary.700" : "gray.700"}
                        fontSize="xs"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontWeight="medium"
                      >
                        {news.category}
                      </Badge>
                    </VStack>

                    <VStack align="start" gap={2} flex="1">
                      <HStack gap={2} align="center">
                        <Heading size="sm" color="gray.900" fontWeight="semibold">
                          {news.title}
                        </Heading>
                        {news.isNew && (
                          <Badge
                            bg="red.500"
                            color="white"
                            fontSize="xs"
                            px={2}
                            py={1}
                            borderRadius="full"
                            fontWeight="medium"
                          >
                            NEW
                          </Badge>
                        )}
                      </HStack>
                      <Text color="gray.600" fontSize="sm" lineHeight="1.6">
                        {news.description}
                      </Text>
                    </VStack>

                    <Text color="primary.600" fontSize="sm" fontWeight="medium">
                      詳細 →
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>

          </VStack>
        </Container>
      </Box>

      {/* Results Section */}
      <Box py={12} bg="white">
        <Container maxW="6xl">
          <VStack gap={8} align="stretch">
            
            {/* Header */}
            <HStack justify="space-between" align="center">
              <VStack align="start" gap={1}>
                <Heading size="lg" color="gray.800" fontWeight="600">
                  おすすめサロン
                </Heading>
                <Text color="gray.600" fontSize="md">
                  {mockStores.length}件のサロンが見つかりました
                </Text>
              </VStack>
              
              <HStack gap={3}>
                <Text fontSize="sm" color="gray.600">並び替え:</Text>
                <Box
                  as="select"
                  fontSize="sm"
                  borderColor="gray.300"
                  borderRadius="md"
                  p={2}
                  bg="white"
                >
                  <option value="recommended">おすすめ順</option>
                  <option value="price">料金の安い順</option>
                  <option value="rating">評価の高い順</option>
                  <option value="distance">距離の近い順</option>
                </Box>
              </HStack>
            </HStack>

            {/* Salon Cards */}
            <VStack gap={6} align="stretch">
              {mockStores.slice(0, 8).map((store, index) => (
                <Link key={store.id} href={`/store/${store.id}`}>
                  <Card 
                    variant="outline"
                    _hover={{
                      borderColor: 'blue.300',
                      shadow: 'lg'
                    }}
                    transition="all 0.2s ease"
                    cursor="pointer"
                  >
                  <CardContent p={0}>
                    <Grid templateColumns={{ base: '1fr', md: '300px 1fr auto' }} gap={0}>
                      
                      {/* Image */}
                      <Box
                        h={{ base: '200px', md: '180px' }}
                        bg="gray.100"
                        position="relative"
                        borderLeftRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="gray.500"
                      >
                        <VStack gap={2}>
                          <Box fontSize="3xl">
                            ✂️
                          </Box>
                          <Badge
                            bg="white"
                            color="gray.700"
                            fontSize="xs"
                            px={3}
                            py={1}
                            borderRadius="md"
                            fontWeight="medium"
                          >
                            美容室
                          </Badge>
                        </VStack>
                      </Box>
                      
                      {/* Content */}
                      <Box p={6}>
                        <VStack align="start" gap={4} h="full">
                          <VStack align="start" gap={2}>
                            <HStack gap={2}>
                              <Heading size="md" color="gray.800">
                                {store.name}
                              </Heading>
                              <HStack gap={1} fontSize="sm">
                                <Text color="orange.400">★</Text>
                                <Text color="gray.600" fontWeight="medium">
                                  {store.rating?.toFixed(1) || '4.0'}
                                </Text>
                                <Text color="gray.500">(124件)</Text>
                              </HStack>
                            </HStack>
                            
                            <Text color="gray.600" fontSize="sm" lineHeight="1.4">
                              {store.description}
                            </Text>
                            
                            <HStack gap={4} fontSize="sm" color="gray.500">
                              <HStack gap={1}>
                                <Text>📍</Text>
                                <Text>徒歩5分</Text>
                              </HStack>
                              <HStack gap={1}>
                                <Text>🚇</Text>
                                <Text>渋谷駅</Text>
                              </HStack>
                              <HStack gap={1}>
                                <Text>⏰</Text>
                                <Text>営業中</Text>
                              </HStack>
                            </HStack>
                          </VStack>
                          
                          <HStack gap={2} flexWrap="wrap">
                            <Badge
                              bg="primary.50"
                              color="primary.700"
                              px={3}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              カット
                            </Badge>
                            <Badge
                              bg="gray.100"
                              color="gray.700"
                              px={3}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              カラー
                            </Badge>
                            <Badge
                              bg="gray.100"
                              color="gray.700"
                              px={3}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              パーマ
                            </Badge>
                          </HStack>
                        </VStack>
                      </Box>
                      
                      {/* Price & Action */}
                      <Box p={6} borderLeftWidth={1} borderColor="gray.100">
                        <VStack gap={4} align="end" h="full" justify="space-between">
                          <VStack align="end" gap={1}>
                            <Text fontSize="xs" color="gray.500">最安値</Text>
                            <Heading size="lg" color="blue.600">
                              ¥5,000
                            </Heading>
                            <Text fontSize="xs" color="gray.500">カット・シャンプー</Text>
                          </VStack>
                          
                          <VStack gap={2} w="full">
                            <Button
                              variant="primary"
                              size="sm"
                              fullWidth
                            >
                              予約する
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              詳細を見る
                            </Button>
                          </VStack>
                        </VStack>
                      </Box>
                      
                    </Grid>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </VStack>

            {/* Load More */}
            <Center pt={8}>
              <Button
                variant="outline"
                size="lg"
              >
                もっと見る
              </Button>
            </Center>
          </VStack>
        </Container>
      </Box>

      {/* Random Salons Section */}
      <Box py={16} bg="white">
        <Container maxW="6xl">
          <VStack gap={8} align="stretch">
            
            {/* Header */}
            <VStack gap={2} textAlign="center">
              <Heading size="lg" color="gray.800" fontWeight="600">
                その他のサロン
              </Heading>
              <Text color="gray.600">
                新しいサロンを発見してみませんか？
              </Text>
            </VStack>

            {/* Random Salon Cards - Grid Layout */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {randomSalons.slice(0, 6).map((store, index) => (
                <Link key={store.id} href={`/store/${store.id}`}>
                  <Card 
                    variant="outline"
                    _hover={{
                      borderColor: 'blue.300',
                      shadow: 'lg'
                    }}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    height="full"
                  >
                    <CardContent p={0}>
                      
                      {/* Image */}
                      <Box
                        h="180px"
                        bg="gray.100"
                        borderTopRadius="lg"
                        position="relative"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="gray.500"
                      >
                        <VStack gap={2}>
                          <Box fontSize="3xl">
                            {store.category === 'HAIR_SALON' ? '✂️' :
                             store.category === 'NAIL_SALON' ? '💅' :
                             store.category === 'RELAXATION' ? '🌸' : '✨'}
                          </Box>
                          <Badge
                            bg="white"
                            color="gray.700"
                            fontSize="xs"
                            px={3}
                            py={1}
                            borderRadius="md"
                            fontWeight="medium"
                          >
                            {store.category === 'HAIR_SALON' ? '美容室' :
                             store.category === 'NAIL_SALON' ? 'ネイル' :
                             store.category === 'RELAXATION' ? 'リラク' : 'サロン'}
                          </Badge>
                        </VStack>

                        {/* Rating Badge */}
                        <Box
                          position="absolute"
                          top={3}
                          right={3}
                          bg="white"
                          px={2}
                          py={1}
                          borderRadius="md"
                          shadow="sm"
                        >
                          <HStack gap={1} fontSize="xs">
                            <Text color="orange.400">★</Text>
                            <Text color="gray.700" fontWeight="medium">
                              {store.rating?.toFixed(1) || '4.0'}
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                      
                      {/* Content */}
                      <VStack align="stretch" p={5} gap={3}>
                        
                        <VStack align="stretch" gap={2}>
                          <Heading size="sm" color="gray.800" truncate>
                            {store.name}
                          </Heading>
                          
                          <Text 
                            color="gray.600" 
                            fontSize="sm" 
                            lineHeight="1.4"
                            display="-webkit-box"
                            style={{
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}
                            overflow="hidden"
                          >
                            {store.description}
                          </Text>
                          
                          <HStack gap={3} fontSize="xs" color="gray.500">
                            <HStack gap={1}>
                              <Text>📍</Text>
                              <Text>駅近</Text>
                            </HStack>
                            <HStack gap={1}>
                              <Text>⏰</Text>
                              <Text>営業中</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                        
                        {/* Tags */}
                        <HStack gap={2} flexWrap="wrap">
                          {store.tags?.slice(0, 2).map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              bg="gray.100"
                              color="gray.700"
                              px={3}
                              py={1}
                              borderRadius="md"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>
                        
                        {/* Bottom Info */}
                        <HStack justify="space-between" align="center" pt={2}>
                          <Text fontSize="xs" color="gray.500">
                            ({store.reviewCount || 0}件)
                          </Text>
                          <Text fontSize="sm" color="blue.600" fontWeight="medium">
                            詳細 →
                          </Text>
                        </HStack>
                        
                      </VStack>
                      
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>

            {/* View All Button */}
            <Center pt={6}>
              <Link href="/stores">
                <Button
                  variant="outline"
                  size="lg"
                >
                  すべてのサロンを見る
                </Button>
              </Link>
            </Center>

          </VStack>
        </Container>
      </Box>

      {/* Why Choose Us - Minimal */}
      <Box py={20} bg="gray.50">
        <Container maxW="6xl">
          <VStack gap={12}>
            <VStack gap={2} textAlign="center">
              <Heading size="lg" color="gray.800" fontWeight="600">
                SalonHubを選ぶ理由
              </Heading>
              <Text color="gray.600">
                安心してサロンを選んでいただけます
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10} w="full">
              {[
                {
                  icon: '🔍',
                  title: 'かんたん比較',
                  description: '複数のサロンの料金やサービスを一度に比較できます。'
                },
                {
                  icon: '💰',
                  title: '最安値保証',
                  description: 'いつでも最もお得な価格でサロンを予約できます。'
                },
                {
                  icon: '📱',
                  title: '即座に予約',
                  description: 'リアルタイムの空き状況で即座に予約が完了します。'
                }
              ].map((feature, index) => (
                <VStack key={index} gap={4} textAlign="center">
                  <Box fontSize="3xl">{feature.icon}</Box>
                  <VStack gap={2}>
                    <Heading size="md" color="gray.800" fontWeight="600">
                      {feature.title}
                    </Heading>
                    <Text color="gray.600" lineHeight="1.6">
                      {feature.description}
                    </Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </MainLayout>
  )
}