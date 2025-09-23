'use client'

import { useState, useMemo, useEffect } from 'react'
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
  SimpleGrid
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockStores } from '../../../data/mockData'

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState('recommended')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories = [
    { value: '', label: 'すべてのカテゴリ' },
    { value: 'HAIR_SALON', label: '美容室・ヘアサロン' },
    { value: 'NAIL_SALON', label: 'ネイルサロン' },
    { value: 'EYELASH', label: 'まつげエクステ' },
    { value: 'RELAXATION', label: 'リラクゼーション・マッサージ' },
    { value: 'ESTHETIC', label: 'エステティック' }
  ]

  const sortOptions = [
    { value: 'recommended', label: 'おすすめ順' },
    { value: 'rating', label: '評価の高い順' },
    { value: 'reviews', label: 'レビューの多い順' },
    { value: 'name', label: '店名順' }
  ]

  const filteredAndSortedStores = useMemo(() => {
    let filtered = mockStores.filter(store => {
      const matchesSearch = !searchQuery || 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = !selectedCategory || store.category === selectedCategory
      
      return matchesSearch && matchesCategory && store.isActive && store.isPublic
    })

    // Sort stores
    switch (sortBy) {
      case 'rating':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'reviews':
        return filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name, 'ja'))
      default:
        return filtered // recommended order (original order)
    }
  }, [searchQuery, selectedCategory, sortBy])

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
    const found = categories.find(cat => cat.value === category)
    return found ? found.label : 'サロン'
  }

  return (
    <MainLayout>
      <Container maxW="7xl" py={8}>
        <VStack gap={8} align="stretch">
          
          {/* Header */}
          <VStack gap={6} textAlign="center" py={16}>
            <VStack gap={4} maxW="2xl">
              <Heading
                size="2xl"
                color="gray.900"
                fontWeight="bold"
                lineHeight="1.2"
              >
                サロン一覧
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                lineHeight="1.6"
              >
                あなたにぴったりの美容サロンを見つけてください
              </Text>
            </VStack>
          </VStack>

          Filters
          <Box bg="white" borderRadius="xl" p={{ base: 4, md: 6 }} shadow="sm" border="1px solid" borderColor="gray.200">
            <VStack gap={6}>

              {/* Search */}
              <VStack align="stretch" w="full">
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                  検索
                </Text>
                <Input
                  placeholder="サロン名、エリア、キーワードで検索"
                  size="lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </VStack>

              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 4, md: 6 }} w="full">

                {/* Category Filter */}
                <GridItem>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    カテゴリ
                  </Text>
                  <Box position="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '12px 16px',
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        color: '#374151',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#f9fafb';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </Box>
                </GridItem>

                {/* Sort */}
                <GridItem>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    並び替え
                  </Text>
                  <Box position="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '12px 16px',
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        color: '#374151',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#f9fafb';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Box>
                </GridItem>

              </Grid>

            </VStack>
          </Box>

          {/* Results Count */}
          <HStack justify="space-between" align="center">
            <Text color="gray.600" fontSize="md" fontWeight="medium">
              {filteredAndSortedStores.length}件のサロンが見つかりました
            </Text>
            <HStack gap={2}>
              <Text fontSize="sm" color="gray.500">表示:</Text>
              <Badge
                bg="primary.50"
                color="primary.700"
                px={3}
                py={1}
                borderRadius="full"
                fontWeight="medium"
              >
                {filteredAndSortedStores.length}件
              </Badge>
            </HStack>
          </HStack>

          {/* Store Grid */}
          {filteredAndSortedStores.length === 0 ? (
            <Center py={20}>
              <VStack gap={6} maxW="md" textAlign="center">
                <Box fontSize="4xl" color="gray.400">
                  🔍
                </Box>
                <VStack gap={3}>
                  <Heading
                    size="lg"
                    color="gray.800"
                    fontWeight="semibold"
                  >
                    該当するサロンが見つかりません
                  </Heading>
                  <Text color="gray.600" lineHeight="1.6">
                    検索条件を変更して再度お試しください
                  </Text>
                </VStack>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('')
                    setSortBy('recommended')
                  }}
                >
                  検索条件をリセット
                </Button>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={{ base: 6, md: 8 }}>
              {filteredAndSortedStores.map((store) => (
                <Link key={store.id} href={`/store/${store.id}`}>
                  <Card
                    variant="outline"
                    cursor="pointer"
                    height="full"
                    overflow="hidden"
                    bg="white"
                    borderColor="gray.200"
                    shadow="sm"
                    _hover={{
                      shadow: "lg",
                      borderColor: "primary.300"
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardContent p={0}>

                      {/* Image */}
                      <Box
                        h="200px"
                        bg="gray.100"
                        position="relative"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="gray.500"
                      >
                        <VStack gap={3}>
                          <Text fontSize="4xl">
                            {getCategoryIcon(store.category)}
                          </Text>
                          <Badge
                            bg="white"
                            color="gray.700"
                            fontSize="xs"
                            px={3}
                            py={1}
                            borderRadius="md"
                            fontWeight="medium"
                            shadow="sm"
                          >
                            {getCategoryLabel(store.category)}
                          </Badge>
                        </VStack>

                        {/* Rating Badge */}
                        <Box
                          position="absolute"
                          top={3}
                          right={3}
                          bg="white"
                          px={3}
                          py={1}
                          borderRadius="full"
                          shadow="md"
                        >
                          <HStack gap={1} fontSize="sm">
                            <Text color="orange.400">★</Text>
                            <Text color="gray.700" fontWeight="semibold">
                              {store.rating?.toFixed(1) || '4.0'}
                            </Text>
                          </HStack>
                        </Box>
                      </Box>

                      {/* Content */}
                      <VStack align="stretch" p={{ base: 4, md: 6 }} gap={4}>

                        <VStack align="stretch" gap={3}>
                          <Heading
                            size="md"
                            color="gray.900"
                            fontWeight="semibold"
                          >
                            {store.name}
                          </Heading>

                          <Text
                            color="gray.600"
                            fontSize="sm"
                            lineHeight="1.6"
                          >
                            {store.description}
                          </Text>

                          <HStack gap={4} fontSize="sm" color="gray.500">
                            <HStack gap={1}>
                              <Text>📍</Text>
                              <Text>渋谷駅徒歩5分</Text>
                            </HStack>
                            <HStack gap={1}>
                              <Box w={2} h={2} bg="green.400" borderRadius="full" />
                              <Text color="green.600" fontWeight="medium">営業中</Text>
                            </HStack>
                          </HStack>
                        </VStack>

                        {/* Tags */}
                        <HStack gap={2} flexWrap="wrap">
                          {store.tags?.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              bg={index === 0 ? "primary.50" : "gray.100"}
                              color={index === 0 ? "primary.700" : "gray.700"}
                              fontSize="xs"
                              px={3}
                              py={1}
                              borderRadius="md"
                              fontWeight="medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>

                        {/* Bottom Info */}
                        <HStack justify="space-between" align="center" pt={2}>
                          <HStack gap={1}>
                            <Text fontSize="xs" color="gray.500">
                              {store.reviewCount || 0}件のレビュー
                            </Text>
                          </HStack>
                          <Text
                            fontSize="sm"
                            color="primary.600"
                            fontWeight="medium"
                            _groupHover={{
                              color: "primary.700"
                            }}
                          >
                            詳細を見る →
                          </Text>
                        </HStack>

                      </VStack>

                    </CardContent>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>
          )}

          {/* Load More */}
          {filteredAndSortedStores.length > 0 && (
            <Center pt={12}>
              <Button
                variant="outline"
                size="lg"
              >
                さらに読み込む
              </Button>
            </Center>
          )}

        </VStack>
      </Container>
    </MainLayout>
  )
}