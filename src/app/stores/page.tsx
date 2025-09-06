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
import { mockStores } from '@/data/mockData'

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
          <VStack gap={4} textAlign="center">
            <Heading size="xl" color="gray.800" fontWeight="600">
              サロン一覧
            </Heading>
            <Text color="gray.600" fontSize="lg">
              あなたにぴったりのサロンを見つけましょう
            </Text>
          </VStack>

          {/* Filters */}
          <Card variant="outline">
            <CardContent p={6}>
              <VStack gap={6}>
                
                {/* Search */}
                <Input
                  placeholder="サロン名、エリア、キーワードで検索"
                  size="lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
                  
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
                          padding: '16px',
                          backgroundColor: '#f7fafc',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '16px',
                          color: '#4a5568',
                          outline: 'none'
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
                          padding: '16px',
                          backgroundColor: '#f7fafc',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '16px',
                          color: '#4a5568',
                          outline: 'none'
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
            </CardContent>
          </Card>

          {/* Results Count */}
          <HStack justify="space-between" align="center">
            <Text color="gray.600" fontSize="md">
              {filteredAndSortedStores.length}件のサロンが見つかりました
            </Text>
          </HStack>

          {/* Store Grid */}
          {filteredAndSortedStores.length === 0 ? (
            <Center py={20}>
              <VStack gap={4}>
                <Text fontSize="6xl">🔍</Text>
                <Heading size="md" color="gray.600">
                  該当するサロンが見つかりません
                </Heading>
                <Text color="gray.500" textAlign="center">
                  検索条件を変更して再度お試しください
                </Text>
                <Button
                  variant="outline"
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
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {filteredAndSortedStores.map((store) => (
                <Link key={store.id} href={`/store/${store.id}`}>
                  <Card 
                    variant="outline"
                    _hover={{ 
                      borderColor: 'blue.300',
                      shadow: 'lg',
                      transform: 'translateY(-4px)'
                    }}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    height="full"
                  >
                    <CardContent p={0}>
                      
                      {/* Image */}
                      <Box
                        h="200px"
                        backgroundImage={store.images?.[0] || `linear-gradient(45deg, blue.400, teal.400)`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        borderTopRadius="lg"
                        position="relative"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {!store.images?.[0] && (
                          <VStack gap={2}>
                            <Text fontSize="4xl">{getCategoryIcon(store.category)}</Text>
                            <Badge colorScheme="white" variant="solid" fontSize="xs">
                              {getCategoryLabel(store.category)}
                            </Badge>
                          </VStack>
                        )}
                        
                        {/* Rating Badge */}
                        <Box
                          position="absolute"
                          top={3}
                          right={3}
                          bg="white"
                          px={2}
                          py={1}
                          borderRadius="md"
                          shadow="md"
                        >
                          <HStack gap={1} fontSize="sm">
                            <Text color="orange.400">★</Text>
                            <Text color="gray.700" fontWeight="medium">
                              {isClient ? (store.rating?.toFixed(1) || '4.0') : '4.0'}
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                      
                      {/* Content */}
                      <VStack align="stretch" p={5} gap={3}>
                        
                        <VStack align="stretch" gap={2}>
                          <Heading size="md" color="gray.800" truncate>
                            {store.name}
                          </Heading>
                          
                          <Text 
                            color="gray.600" 
                            fontSize="sm" 
                            lineHeight="1.5"
                            display="-webkit-box"
                            style={{
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}
                            overflow="hidden"
                          >
                            {store.description}
                          </Text>
                          
                          <HStack gap={4} fontSize="xs" color="gray.500">
                            <HStack gap={1}>
                              <Text>📍</Text>
                              <Text>渋谷駅徒歩5分</Text>
                            </HStack>
                            <HStack gap={1}>
                              <Text>⏰</Text>
                              <Text>営業中</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                        
                        {/* Tags */}
                        <HStack gap={2} flexWrap="wrap">
                          {store.tags?.slice(0, 3).map((tag, index) => (
                            <Badge key={index} colorScheme="blue" variant="subtle" fontSize="xs">
                              {tag}
                            </Badge>
                          ))}
                        </HStack>
                        
                        {/* Reviews */}
                        <HStack justify="space-between" align="center" pt={2}>
                          <Text fontSize="xs" color="gray.500">
                            ({store.reviewCount || 0}件のレビュー)
                          </Text>
                          <Text fontSize="sm" color="blue.600" fontWeight="medium">
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
            <Center pt={8}>
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