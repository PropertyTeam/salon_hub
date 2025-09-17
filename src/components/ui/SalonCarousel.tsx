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
    <Box py={12} bg="gray.50" position="relative" overflow="hidden">
      {/* Background decoration */}
      <Box
        position="absolute"
        top="20px"
        left="10%"
        w="100px"
        h="100px"
        bg="radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
        borderRadius="50%"
        animation="float 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="20px"
        right="15%"
        w="80px"
        h="80px"
        bg="radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)"
        borderRadius="50%"
        animation="float 6s ease-in-out infinite reverse"
      />

      <Container maxW="6xl" position="relative" zIndex={1}>
        <VStack gap={8} align="stretch">
          
          {/* Header */}
          <VStack gap={2} textAlign="center">
            <HStack gap={2} justify="center" align="center">
              <Text fontSize="2xl" animation="pulse 2s infinite">⭐</Text>
              <Heading 
                size="lg" 
                color="gray.800" 
                fontWeight="700"
                bg="linear-gradient(135deg, blue.600, purple.600)"
                bgClip="text"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              >
                {title}
              </Heading>
              <Text fontSize="2xl" animation="pulse 2s infinite 0.5s">⭐</Text>
            </HStack>
            <Text color="gray.600" fontSize="md" fontWeight="500">
              {subtitle}
            </Text>
          </VStack>

          {/* Carousel Container */}
          <Box position="relative">
            
            {/* Navigation Buttons */}
            <IconButton
              aria-label="前へ"
              position="absolute"
              left="-20px"
              top="50%"
              transform="translateY(-50%)"
              zIndex={10}
              size="lg"
              borderRadius="50%"
              bg="white"
              shadow="lg"
              border="2px solid rgba(59, 130, 246, 0.2)"
              color="blue.600"
              _hover={{
                bg: "blue.50",
                borderColor: "blue.400",
                transform: "translateY(-50%) scale(1.1)"
              }}
              transition="all 0.3s ease"
              onClick={prevSlide}
            >
              <Text fontSize="lg" fontWeight="bold">‹</Text>
            </IconButton>

            <IconButton
              aria-label="次へ"
              position="absolute"
              right="-20px"
              top="50%"
              transform="translateY(-50%)"
              zIndex={10}
              size="lg"
              borderRadius="50%"
              bg="white"
              shadow="lg"
              border="2px solid rgba(59, 130, 246, 0.2)"
              color="blue.600"
              _hover={{
                bg: "blue.50",
                borderColor: "blue.400",
                transform: "translateY(-50%) scale(1.1)"
              }}
              transition="all 0.3s ease"
              onClick={nextSlide}
            >
              <Text fontSize="lg" fontWeight="bold">›</Text>
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
                          transform: "translateY(-4px)",
                          borderColor: "blue.200"
                        }}
                        transition="all 0.3s ease"
                        overflow="hidden"
                      >
                        <CardContent p={0}>
                          
                          {/* Image */}
                          <Box
                            h="180px"
                            bgGradient={`linear(45deg, ${
                              ['blue.400', 'purple.400', 'teal.400', 'green.400', 'pink.400', 'orange.400'][index % 6]
                            }, ${
                              ['blue.600', 'purple.600', 'teal.600', 'green.600', 'pink.600', 'orange.600'][index % 6]
                            })`}
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <VStack gap={2}>
                              <Text fontSize="3xl" color="white">
                                {getCategoryIcon(salon.category)}
                              </Text>
                              <Badge colorScheme="whiteAlpha" variant="solid" fontSize="xs">
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
                              bg="rgba(255, 255, 255, 0.95)"
                              backdropFilter="blur(10px)"
                              px={2}
                              py={1}
                              borderRadius="lg"
                              shadow="sm"
                            >
                              <HStack gap={1} fontSize="sm">
                                <Text color="orange.400">⭐</Text>
                                <Text color="gray.700" fontWeight="600">
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
                                noOfLines={1}
                              >
                                {salon.name}
                              </Text>
                              
                              <Text
                                color="gray.600"
                                fontSize="sm"
                                lineHeight="1.4"
                                noOfLines={2}
                              >
                                {salon.description || 'サロンの詳細情報'}
                              </Text>
                            </VStack>
                            
                            {/* Tags */}
                            <HStack gap={1} flexWrap="wrap">
                              {salon.tags?.slice(0, 2).map((tag, tagIndex) => (
                                <Badge 
                                  key={tagIndex} 
                                  colorScheme="blue" 
                                  variant="subtle" 
                                  fontSize="xs"
                                  px={2}
                                  py={1}
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
                                color="blue.600" 
                                fontWeight="600"
                                _hover={{ color: "blue.700" }}
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
                  w={currentIndex === index ? "24px" : "8px"}
                  h="8px"
                  borderRadius="full"
                  bg={currentIndex === index ? "blue.500" : "gray.300"}
                  cursor="pointer"
                  transition="all 0.3s ease"
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoSliding(false)
                  }}
                  _hover={{
                    bg: currentIndex === index ? "blue.600" : "gray.400"
                  }}
                />
              ))}
            </HStack>
          </Box>

        </VStack>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </Box>
  )
}