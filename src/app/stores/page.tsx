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
          <VStack gap={8} textAlign="center" py={12} position="relative">
            {/* 星雲エフェクト */}
            <Box
              position="absolute"
              top="-20px"
              left="50%"
              transform="translateX(-50%)"
              w="300px"
              h="150px"
              bg="radial-gradient(ellipse at center, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)"
              borderRadius="50%"
              animation="nebula 20s ease-in-out infinite"
              filter="blur(2px)"
              zIndex={0}
            />
            
            <VStack gap={4} position="relative" zIndex={1}>
              <HStack gap={3}>
                <Text fontSize="3xl" animation="pulse 2s infinite">🌟</Text>
                <Box
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
                  bgClip="text"
                  color="transparent"
                  fontWeight="900"
                  fontSize="5xl"
                  lineHeight="1.1"
                  letterSpacing="-0.03em"
                  filter="drop-shadow(0 0 20px rgba(102, 126, 234, 0.3))"
                >
                  COSMIC SALON
                </Box>
                <Text fontSize="3xl" animation="pulse 2s infinite 0.5s">🌟</Text>
              </HStack>
              
              <Box
                bg="transparent"
                px={8}
                py={4}
                borderRadius="25px"
                border="1px solid rgba(255, 255, 255, 0.3)"
                backdropFilter="blur(10px)"
                shadow="0 8px 32px rgba(102, 126, 234, 0.2)"
              >
                <Text 
                  color="rgba(102, 126, 234, 0.8)" 
                  fontSize="xl" 
                  fontWeight="600"
                  maxW="3xl"
                  lineHeight="1.7"
                >
                  🚀 宇宙に輝く美容サロンを探索しよう 🚀
                  <br />
                  <Text as="span" fontSize="lg" color="rgba(118, 75, 162, 0.7)">
                    あなたの美しさが星のように輝く特別な場所を見つけてください ✨
                  </Text>
                </Text>
              </Box>
              
              {/* 浮遊する装飾要素 */}
              <HStack gap={8} mt={4}>
                <Box
                  w="20px"
                  h="20px"
                  bg="linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(147, 51, 234, 0.3))"
                  borderRadius="50%"
                  animation="float 6s ease-in-out infinite"
                />
                <Box
                  w="12px"
                  h="12px"
                  bg="linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.4))"
                  borderRadius="50%"
                  animation="float 8s ease-in-out infinite reverse"
                />
                <Box
                  w="16px"
                  h="16px"
                  bg="linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(6, 182, 212, 0.4))"
                  borderRadius="50%"
                  animation="float 7s ease-in-out infinite"
                />
              </HStack>
            </VStack>
          </VStack>

          {/* Filters */}
          <Card variant="outline">
            <CardContent p={8}>
              <VStack gap={8}>
                
                {/* Search */}
                <Box position="relative">
                  <Box
                    bg="transparent"
                    borderColor="rgba(6, 182, 212, 0.3)"
                    borderRadius="20px"
                    border="1px solid"
                    _hover={{
                      borderColor: "rgba(6, 182, 212, 0.5)",
                      bg: "transparent"
                    }}
                    _focusWithin={{
                      borderColor: "cyan.400",
                      boxShadow: "0 0 0 3px rgba(6, 182, 212, 0.1)",
                      bg: "white"
                    }}
                    backdropFilter="blur(10px)"
                    transition="all 0.3s ease"
                  >
                    <Input
                      placeholder="サロン名、エリア、キーワードで検索"
                      size="lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      variant="flushed"
                    />
                  </Box>
                </Box>
                
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
                  
                  {/* Category Filter */}
                  <GridItem>
                    <Text fontSize="sm" fontWeight="600" color="slate.700" mb={3}>
                      🎯 カテゴリ
                    </Text>
                    <Box position="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '16px',
                          backgroundColor: 'transparent',
                          border: '2px solid rgba(6, 182, 212, 0.2)',
                          borderRadius: '16px',
                          fontSize: '16px',
                          color: '#334155',
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                          e.target.style.backgroundColor = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                          e.target.style.backgroundColor = 'transparent';
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
                    <Text fontSize="sm" fontWeight="600" color="slate.700" mb={3}>
                      🔄 並び替え
                    </Text>
                    <Box position="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '16px',
                          backgroundColor: 'transparent',
                          border: '2px solid rgba(6, 182, 212, 0.2)',
                          borderRadius: '16px',
                          fontSize: '16px',
                          color: '#334155',
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                          e.target.style.backgroundColor = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                          e.target.style.backgroundColor = 'transparent';
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
            </CardContent>
          </Card>

          {/* Results Count */}
          <HStack justify="center" align="center">
            <Box
              bg="linear-gradient(135deg, cyan.400, sky.500)"
              bgClip="text"
              color="transparent"
              fontWeight="700"
              fontSize="lg"
            >
              ✨ {filteredAndSortedStores.length}件のサロンが見つかりました ✨
            </Box>
          </HStack>

          {/* Store Grid */}
          {filteredAndSortedStores.length === 0 ? (
            <Center py={20}>
              <Card variant="outline" maxW="md">
                <CardContent p={8}>
                  <VStack gap={6}>
                    <Box fontSize="6xl" animation="bounce 2s infinite">
                      😢
                    </Box>
                    <VStack gap={3}>
                      <Box
                        bg="linear-gradient(135deg, cyan.400, sky.500)"
                        bgClip="text"
                        color="transparent"
                        fontWeight="700"
                        fontSize="xl"
                        textAlign="center"
                      >
                        該当するサロンが見つかりません
                      </Box>
                      <Text color="slate.600" textAlign="center" lineHeight="1.6">
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
                </CardContent>
              </Card>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {filteredAndSortedStores.map((store) => (
                <Link key={store.id} href={`/store/${store.id}`}>
                  <Card 
                    variant="outline"
                    cursor="pointer"
                    height="full"
                    overflow="hidden"
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
                          top={4}
                          right={4}
                          bg="rgba(255, 255, 255, 0.95)"
                          backdropFilter="blur(10px)"
                          px={3}
                          py={2}
                          borderRadius="20px"
                          shadow="0 8px 20px rgba(0, 0, 0, 0.1)"
                          border="1px solid rgba(255, 255, 255, 0.2)"
                        >
                          <HStack gap={1} fontSize="sm">
                            <Box color="orange.400" fontSize="lg">✨</Box>
                            <Text 
                              color="slate.700" 
                              fontWeight="700"
                              bg="linear-gradient(135deg, orange.400, pink.400)"
                              bgClip="text"
                            >
                              {store.rating?.toFixed(1) || '4.0'}
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                      
                      {/* Content */}
                      <VStack align="stretch" p={6} gap={4}>
                        
                        <VStack align="stretch" gap={3}>
                          <Text
                            bg="linear-gradient(135deg, slate.800, slate.600)"
                            bgClip="text"
                            color="transparent"
                            fontWeight="700"
                            fontSize="lg"
                            truncate
                          >
                            {store.name}
                          </Text>
                          
                          <Text 
                            color="slate.600" 
                            fontSize="sm" 
                            lineHeight="1.6"
                            display="-webkit-box"
                            style={{
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}
                            overflow="hidden"
                            fontWeight="500"
                          >
                            {store.description}
                          </Text>
                          
                          <HStack gap={4} fontSize="xs" color="slate.500" fontWeight="500">
                            <HStack gap={1}>
                              <Text fontSize="sm">📍</Text>
                              <Text>渋谷駅徒歩5分</Text>
                            </HStack>
                            <HStack gap={1}>
                              <Box 
                                fontSize="sm" 
                                className="pulse"
                                animation="pulse 2s infinite"
                              >
                                🟢
                              </Box>
                              <Text color="green.600" fontWeight="600">営業中</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                        
                        {/* Tags */}
                        <HStack gap={2} flexWrap="wrap">
                          {store.tags?.slice(0, 3).map((tag, index) => (
                            <Badge 
                              key={index} 
                              bg="linear-gradient(135deg, cyan.400, sky.500)" 
                              color="white"
                              fontSize="xs"
                              px="3"
                              py="1"
                              borderRadius="12px"
                              fontWeight="600"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>
                        
                        {/* Reviews */}
                        <HStack justify="space-between" align="center" pt={3}>
                          <HStack gap={1}>
                            <Text fontSize="xs" color="orange.400">⭐</Text>
                            <Text fontSize="xs" color="slate.600" fontWeight="500">
                              {store.reviewCount || 0}件のレビュー
                            </Text>
                          </HStack>
                          <Box
                            bg="linear-gradient(135deg, cyan.400, sky.500)"
                            bgClip="text"
                            color="transparent"
                            fontSize="sm" 
                            fontWeight="700"
                            _hover={{
                              transform: "translateX(4px)"
                            }}
                            transition="transform 0.2s ease"
                          >
                            詳細を見る ✨
                          </Box>
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