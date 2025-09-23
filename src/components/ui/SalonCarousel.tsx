'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Box, 
  HStack, 
  VStack, 
  Text, 
  Heading, 
  Badge,
  IconButton,
  Container
} from '@chakra-ui/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Store } from '@/types'

interface SalonCarouselProps {
  salons: Store[]
  title?: string
  subtitle?: string
}

export function SalonCarousel({ salons, title = "おすすめ複数サロン", subtitle = "厳選されたサロンをお得に体験" }: SalonCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoSliding, setIsAutoSliding] = useState(true)

  const itemsPerView = 3
  const maxIndex = Math.max(0, salons.length - itemsPerView)

  useEffect(() => {
    if (!isAutoSliding) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [maxIndex, isAutoSliding])

  const nextSlide = () => {
    setIsAutoSliding(false)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setIsAutoSliding(false)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
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

  if (salons.length === 0) return null

  return (
    <Box py={16} bg="white" position="relative">
      <Container maxW="6xl">
        <VStack gap={8} align="stretch">
          
          {/* Header */}
          <VStack gap={3} textAlign="center">
            <Heading
              size="lg"
              color="gray.900"
              fontWeight="bold"
            >
              {title}
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {subtitle}
            </Text>
          </VStack>

          {/* Carousel Container */}
          <Box position="relative">
            
            {/* Navigation Buttons */}
            <IconButton
              aria-label="前へ"
              position="absolute"
              left="-16px"
              top="50%"
              transform="translateY(-50%)"
              zIndex={10}
              size="md"
              borderRadius="full"
              bg="white"
              shadow="md"
              border="1px solid"
              borderColor="gray.200"
              color="gray.600"
              _hover={{
                bg: "gray.50",
                borderColor: "gray.300",
                color: "gray.700"
              }}
              transition="all 0.2s ease"
              onClick={prevSlide}
            >
              <Text fontSize="lg">‹</Text>
            </IconButton>

            <IconButton
              aria-label="次へ"
              position="absolute"
              right="-16px"
              top="50%"
              transform="translateY(-50%)"
              zIndex={10}
              size="md"
              borderRadius="full"
              bg="white"
              shadow="md"
              border="1px solid"
              borderColor="gray.200"
              color="gray.600"
              _hover={{
                bg: "gray.50",
                borderColor: "gray.300",
                color: "gray.700"
              }}
              transition="all 0.2s ease"
              onClick={nextSlide}
            >
              <Text fontSize="lg">›</Text>
            </IconButton>

            {/* Slides Container */}
            <Box
              overflow="hidden"
              borderRadius="xl"
              onMouseEnter={() => setIsAutoSliding(false)}
              onMouseLeave={() => setIsAutoSliding(true)}
            >
              <HStack
                gap={6}
                transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                transform={`translateX(-${currentIndex * (100 / itemsPerView + 2)}%)`}
                w={`${(salons.length / itemsPerView) * 100}%`}
              >
                {salons.map((salon, index) => (
                  <Box
                    key={salon.id}
                    w={`${100 / salons.length * itemsPerView}%`}
                    flexShrink={0}
                  >
                    <Link href={`/store/${salon.id}`}>
                      <Card 
                        variant="outline"
                        cursor="pointer"
                        height="320px"
                        bg="white"
                        borderColor="transparent"
                        shadow="md"
                        _hover={{
                          shadow: "xl",
                          borderColor: "blue.200"
                        }}
                        transition="all 0.3s ease"
                        overflow="hidden"
                      >
                        <CardContent p={0}>
                          
                          {/* Image */}
                          <Box
                            h="180px"
                            bg="gray.100"
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="gray.500"
                          >
                            <VStack gap={2}>
                              <Text fontSize="3xl">
                                {getCategoryIcon(salon.category)}
                              </Text>
                              <Badge
                                bg="white"
                                color="gray.700"
                                fontSize="xs"
                                px={3}
                                py={1}
                                borderRadius="md"
                                fontWeight="medium"
                              >
                                {salon.category === 'HAIR_SALON' ? '美容室' :
                                 salon.category === 'NAIL_SALON' ? 'ネイル' :
                                 salon.category === 'RELAXATION' ? 'リラク' : 'サロン'}
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
                                  {salon.rating?.toFixed(1) || '4.0'}
                                </Text>
                              </HStack>
                            </Box>
                          </Box>
                          
                          {/* Content */}
                          <VStack align="stretch" p={4} gap={3} h="140px">
                            <VStack align="stretch" gap={2} flex={1}>
                              <Text
                                fontWeight="700"
                                fontSize="md"
                                color="gray.800"
                              >
                                {salon.name}
                              </Text>
                              
                              <Text
                                color="gray.600"
                                fontSize="sm"
                                lineHeight="1.4"
                              >
                                {salon.description || 'サロンの詳細情報'}
                              </Text>
                            </VStack>
                            
                            {/* Tags */}
                            <HStack gap={2} flexWrap="wrap">
                              {salon.tags?.slice(0, 2).map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  bg="gray.100"
                                  color="gray.700"
                                  fontSize="xs"
                                  px={2}
                                  py={1}
                                  borderRadius="md"
                                  fontWeight="medium"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </HStack>
                            
                            {/* Reviews */}
                            <HStack justify="space-between" align="center">
                              <Text fontSize="xs" color="gray.500">
                                ({salon.reviewCount || 0}件)
                              </Text>
                              <Text
                                fontSize="sm"
                                color="primary.600"
                                fontWeight="medium"
                                _hover={{ color: "primary.700" }}
                              >
                                詳細 →
                              </Text>
                            </HStack>
                          </VStack>
                          
                        </CardContent>
                      </Card>
                    </Link>
                  </Box>
                ))}
              </HStack>
            </Box>

            {/* Slide Indicators */}
            <HStack
              justify="center"
              gap={2}
              mt={6}
            >
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <Box
                  key={index}
                  w={currentIndex === index ? "20px" : "6px"}
                  h="6px"
                  borderRadius="full"
                  bg={currentIndex === index ? "primary.500" : "gray.300"}
                  cursor="pointer"
                  transition="all 0.2s ease"
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoSliding(false)
                  }}
                  _hover={{
                    bg: currentIndex === index ? "primary.600" : "gray.400"
                  }}
                />
              ))}
            </HStack>
          </Box>

        </VStack>
      </Container>
    </Box>
  )
}