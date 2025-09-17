'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  Textarea
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import {
  getMockStoreById,
  getMockMenusByStoreId
} from '../../../../../data/mockData'

export default function ReservationPage() {
  const params = useParams()
  const router = useRouter()
  const storeId = params.id as string
  
  const [selectedMenu, setSelectedMenu] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [notes, setNotes] = useState('')

  const store = getMockStoreById(storeId)
  const menus = getMockMenusByStoreId(storeId)

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

  const handleSubmit = () => {
    alert('予約が完了しました！確認メールをお送りします。')
    router.push(`/store/${storeId}`)
  }

  const selectedMenuData = menus.find(m => m.id === selectedMenu)

  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        <VStack gap={8} align="stretch">
          
          {/* Cosmic Breadcrumb */}
          <HStack 
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            px={6}
            py={4}
            borderRadius="20px"
            border="1px solid rgba(255, 255, 255, 0.2)"
            color="slate.600" 
            fontSize="sm" 
            fontWeight="600"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1))',
              zIndex: -1
            }}
          >
            <Link href="/stores">
              <Text _hover={{ color: 'cyan.500', textDecoration: 'underline', transform: 'translateX(-2px)' }}
                transition="all 0.3s ease"
                cursor="pointer"
              >
                サロン一覧
              </Text>
            </Link>
            <Text color="slate.600" fontSize="lg">›</Text>
            <Link href={`/store/${storeId}`}>
              <Text _hover={{ color: 'cyan.500', textDecoration: 'underline', transform: 'translateX(-2px)' }}
                transition="all 0.3s ease"
                cursor="pointer"
              >
                {store.name}
              </Text>
            </Link>
            <Text color="slate.600" fontSize="lg">›</Text>
            <Text 
              color="slate.700" 
              fontWeight="700"
              bg="linear-gradient(135deg, slate.600, slate.800)"
              bgClip="text"
            >
              予約
            </Text>
          </HStack>

          {/* Cosmic Header */}
          <VStack 
            gap={6} 
            textAlign="center"
            position="relative"
          >
            <Box
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                w: '200px',
                h: '200px',
                bg: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                animation: 'pulse 3s ease-in-out infinite'
              }}
            >
              <VStack gap={4}>
                <Box
                  w={16}
                  h={16}
                  bg="linear-gradient(135deg, cyan.400, purple.500)"
                  borderRadius="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="0 12px 24px rgba(6, 182, 212, 0.3)"
                  animation="float 4s ease-in-out infinite"
                >
                  <Box w={12} h={12} bg="white" borderRadius="50%" opacity={0.9}></Box>
                </Box>
                <Box
                  bg="linear-gradient(135deg, cyan.500, purple.500, pink.500)"
                  bgClip="text"
                  color="transparent"
                  fontWeight="800"
                  fontSize="4xl"
                  letterSpacing="-0.02em"
                  textAlign="center"
                >
                  予約フォーム
                </Box>
                <HStack gap={3} align="center">
                  <Box
                    w={8}
                    h={8}
                    bg="linear-gradient(135deg, cyan.400, sky.500)"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    shadow="0 4px 8px rgba(6, 182, 212, 0.3)"
                  >
                    <Box w={4} h={4} bg="white" borderRadius="4px" opacity={0.9}></Box>
                  </Box>
                  <Text 
                    color="slate.700" 
                    fontSize="xl" 
                    fontWeight="700"
                    bg="linear-gradient(135deg, slate.600, slate.800)"
                    bgClip="text"
                  >
                    {store.name}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>

          {/* Cosmic Form */}
          <Box
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(30px)"
            borderRadius="24px"
            border="1px solid rgba(255, 255, 255, 0.15)"
            p={10}
            position="relative"
            overflow="hidden"
            shadow="0 25px 50px rgba(0, 0, 0, 0.1)"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: `
                radial-gradient(circle at 10% 20%, rgba(147, 51, 234, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)
              `,
              zIndex: -1
            }}
          >
              <VStack gap={6} align="stretch">
                
                {/* Cosmic Menu Selection */}
                <VStack gap={6} align="stretch">
                  <HStack gap={4} align="center">
                    <Box
                      w={10}
                      h={10}
                      bg="linear-gradient(135deg, purple.400, pink.400)"
                      borderRadius="16px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      shadow="0 6px 12px rgba(147, 51, 234, 0.3)"
                      animation="pulse 2s ease-in-out infinite"
                    >
                      <Box w={8} h={8} bg="white" borderRadius="50%" opacity={0.9}></Box>
                    </Box>
                    <Box
                      bg="linear-gradient(135deg, purple.500, pink.500)"
                      bgClip="text"
                      color="transparent"
                      fontWeight="800"
                      fontSize="xl"
                      letterSpacing="-0.02em"
                    >
                      メニュー選択
                    </Box>
                  </HStack>
                  
                  {menus.length === 0 ? (
                    <Center py={8}>
                      <Text color="gray.500">メニューが登録されていません</Text>
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                      {menus.map((menu, index) => (
                        <Box 
                          key={menu.id}
                          bg={selectedMenu === menu.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.1)'}
                          backdropFilter="blur(20px)"
                          borderRadius="20px"
                          border={selectedMenu === menu.id ? '2px solid' : '1px solid rgba(255, 255, 255, 0.2)'}
                          borderColor={selectedMenu === menu.id ? 'cyan.400' : 'transparent'}
                          p={6}
                          cursor="pointer"
                          onClick={() => setSelectedMenu(menu.id)}
                          position="relative"
                          overflow="hidden"
                          _hover={{
                            transform: 'translateY(-3px)',
                            shadow: '0 12px 24px rgba(6, 182, 212, 0.2)',
                            borderColor: 'cyan.300'
                          }}
                          transition="all 0.3s ease"
                          _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bg: selectedMenu === menu.id ? 
                              'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1))' :
                              'linear-gradient(135deg, rgba(6, 182, 212, 0.03), rgba(147, 51, 234, 0.03))',
                            zIndex: -1
                          }}
                        >
                          <VStack align="stretch" gap={4}>
                            <HStack justify="space-between" align="start">
                              <VStack align="start" gap={2} flex="1">
                                <HStack gap={2}>
                                  <Box 
                                    w={6} 
                                    h={6} 
                                    bg={selectedMenu === menu.id ? "cyan.400" : "slate.300"}
                                    borderRadius="50%" 
                                    opacity={0.8}
                                  ></Box>
                                  <Box
                                    bg={selectedMenu === menu.id ? 'linear-gradient(135deg, cyan.500, purple.500)' : 'linear-gradient(135deg, slate.600, slate.800)'}
                                    bgClip="text"
                                    color="transparent"
                                    fontWeight="700"
                                    fontSize="md"
                                  >
                                    {menu.name}
                                  </Box>
                                </HStack>
                                <Text color="slate.700" fontSize="sm" lineHeight="1.5" fontWeight="500">
                                  {menu.description}
                                </Text>
                              </VStack>
                              <VStack align="end" gap={1}>
                                <Box
                                  bg="linear-gradient(135deg, orange.400, pink.500)"
                                  bgClip="text"
                                  color="transparent"
                                  fontWeight="800"
                                  fontSize="lg"
                                >
                                  {formatPrice(menu.price)}
                                </Box>
                                <Badge
                                  bg="linear-gradient(135deg, blue.400, purple.400)"
                                  color="white"
                                  fontSize="xs"
                                  px={3}
                                  py={1}
                                  borderRadius="12px"
                                  fontWeight="600"
                                >
                                  {formatDuration(menu.duration)}
                                </Badge>
                              </VStack>
                            </HStack>
                            <HStack justify="space-between" align="center">
                              <Badge 
                                bg="linear-gradient(135deg, green.400, teal.400)"
                                color="white"
                                fontSize="sm"
                                px={4}
                                py={2}
                                borderRadius="14px"
                                fontWeight="600"
                                shadow="0 4px 8px rgba(34, 197, 94, 0.2)"
                              >
                                {menu.category}
                              </Badge>
                              {selectedMenu === menu.id && (
                                <Box
                                  bg="linear-gradient(135deg, cyan.400, purple.500)"
                                  color="white"
                                  px={4}
                                  py={2}
                                  borderRadius="14px"
                                  fontSize="sm"
                                  fontWeight="600"
                                  shadow="0 0 20px rgba(6, 182, 212, 0.4)"
                                  animation="pulse 2s ease-in-out infinite"
                                >
                                  選択中
                                </Box>
                              )}
                            </HStack>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>

                {/* Cosmic Date and Time */}
                <VStack gap={6} align="stretch">
                  <HStack gap={4} align="center">
                    <Box
                      w={10}
                      h={10}
                      bg="linear-gradient(135deg, orange.400, pink.400)"
                      borderRadius="16px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      shadow="0 6px 12px rgba(251, 146, 60, 0.3)"
                      animation="pulse 2.5s ease-in-out infinite"
                    >
                      <Text fontSize="xl">📅</Text>
                    </Box>
                    <Box
                      bg="linear-gradient(135deg, orange.500, pink.500)"
                      bgClip="text"
                      color="transparent"
                      fontWeight="800"
                      fontSize="xl"
                      letterSpacing="-0.02em"
                    >
                      日時選択
                    </Box>
                  </HStack>
                  
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="md" fontWeight="700" color="slate.800" bg="transparent" px={3} py={2} borderRadius="8px">
                          予約日
                        </Text>
                        <Box 
                          bg="transparent"
                          backdropFilter="blur(10px)"
                          borderRadius="16px"
                          border="2px solid rgba(6, 182, 212, 0.2)"
                          _hover={{ borderColor: 'cyan.400' }}
                          _focusWithin={{ borderColor: 'cyan.500', shadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                          transition="all 0.3s ease"
                        >
                          <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            variant="flushed"
                          />
                        </Box>
                      </VStack>
                    </GridItem>
                    
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="md" fontWeight="700" color="slate.800" bg="transparent" px={3} py={2} borderRadius="8px">
                          予約時間
                        </Text>
                        <Box 
                          bg="transparent"
                          backdropFilter="blur(10px)"
                          borderRadius="16px"
                          border="2px solid rgba(6, 182, 212, 0.2)"
                          _hover={{ borderColor: 'cyan.400' }}
                          _focusWithin={{ borderColor: 'cyan.500', shadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                          transition="all 0.3s ease"
                        >
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            style={{
                              width: '100%',
                              height: '48px',
                              padding: '0 16px',
                              background: 'transparent',
                              border: 'none',
                              outline: 'none',
                              fontWeight: '600',
                              color: '#475569',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="">時間を選択</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                          </select>
                        </Box>
                      </VStack>
                    </GridItem>
                  </Grid>
                </VStack>

                {/* Cosmic Customer Information */}
                <VStack gap={6} align="stretch">
                  <HStack gap={4} align="center">
                    <Box
                      w={10}
                      h={10}
                      bg="linear-gradient(135deg, blue.400, indigo.500)"
                      borderRadius="16px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      shadow="0 6px 12px rgba(59, 130, 246, 0.3)"
                      animation="pulse 3s ease-in-out infinite"
                    >
                      <Text fontSize="xl">👤</Text>
                    </Box>
                    <Box
                      bg="linear-gradient(135deg, blue.500, indigo.500)"
                      bgClip="text"
                      color="transparent"
                      fontWeight="800"
                      fontSize="xl"
                      letterSpacing="-0.02em"
                    >
                      お客様情報
                    </Box>
                  </HStack>
                  
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="700" color="slate.800" bg="transparent" px={3} py={2} borderRadius="8px">
                          お名前 *
                        </Text>
                        <Box 
                          bg="transparent"
                          backdropFilter="blur(10px)"
                          borderRadius="16px"
                          border="2px solid rgba(6, 182, 212, 0.2)"
                          _hover={{ borderColor: 'cyan.400' }}
                          _focusWithin={{ borderColor: 'cyan.500', shadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                          transition="all 0.3s ease"
                        >
                          <Input
                            placeholder="山田 太郎"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            variant="flushed"
                          />
                        </Box>
                      </VStack>
                    </GridItem>
                    
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="700" color="slate.800" bg="transparent" px={3} py={2} borderRadius="8px">
                          電話番号 *
                        </Text>
                        <Box 
                          bg="transparent"
                          backdropFilter="blur(10px)"
                          borderRadius="16px"
                          border="2px solid rgba(6, 182, 212, 0.2)"
                          _hover={{ borderColor: 'cyan.400' }}
                          _focusWithin={{ borderColor: 'cyan.500', shadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                          transition="all 0.3s ease"
                        >
                          <Input
                            placeholder="090-1234-5678"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            variant="flushed"
                          />
                        </Box>
                      </VStack>
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="700" color="slate.800" bg="transparent" px={3} py={2} borderRadius="8px">
                          メールアドレス *
                        </Text>
                        <Box 
                          bg="transparent"
                          backdropFilter="blur(10px)"
                          borderRadius="16px"
                          border="2px solid rgba(6, 182, 212, 0.2)"
                          _hover={{ borderColor: 'cyan.400' }}
                          _focusWithin={{ borderColor: 'cyan.500', shadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                          transition="all 0.3s ease"
                        >
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            variant="flushed"
                          />
                        </Box>
                      </VStack>
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="700" color="slate.800" bg="transparent" px={3} py={2} borderRadius="8px">
                          ご要望・備考
                        </Text>
                        <Box 
                          bg="transparent"
                          backdropFilter="blur(10px)"
                          borderRadius="16px"
                          border="2px solid rgba(6, 182, 212, 0.2)"
                          _hover={{ borderColor: 'cyan.400' }}
                          _focusWithin={{ borderColor: 'cyan.500', shadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                          transition="all 0.3s ease"
                        >
                          <Textarea
                            placeholder="何かご要望やご質問がございましたらお書きください"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            variant="flushed"
                            resize="none"
                          />
                        </Box>
                      </VStack>
                    </GridItem>
                  </Grid>
                </VStack>

                {/* Cosmic Selected Info Summary */}
                {selectedMenuData && (
                  <Box
                    bg="linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1))"
                    backdropFilter="blur(20px)"
                    borderRadius="20px"
                    border="2px solid"
                    borderColor="cyan.300"
                    p={6}
                    position="relative"
                    overflow="hidden"
                    shadow="0 12px 24px rgba(6, 182, 212, 0.2)"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(147, 51, 234, 0.05))',
                      zIndex: -1
                    }}
                  >
                    <VStack gap={4} align="stretch">
                      <HStack gap={3} justify="center">
                        <Box
                          w={8}
                          h={8}
                          bg="linear-gradient(135deg, cyan.400, purple.500)"
                          borderRadius="12px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          shadow="0 4px 8px rgba(6, 182, 212, 0.3)"
                          animation="pulse 2s ease-in-out infinite"
                        >
                          <Text fontSize="lg" color="white">✨</Text>
                        </Box>
                        <Box
                          bg="linear-gradient(135deg, cyan.500, purple.500)"
                          bgClip="text"
                          color="transparent"
                          fontWeight="800"
                          fontSize="lg"
                          letterSpacing="-0.02em"
                        >
                          予約内容
                        </Box>
                      </HStack>
                      <VStack gap={3} align="stretch">
                        <HStack justify="space-between" bg="transparent" p={3} borderRadius="12px">
                          <Text fontSize="sm" fontWeight="700" color="slate.600">🎆 メニュー:</Text>
                          <Text fontSize="sm" fontWeight="600" color="slate.800">{selectedMenuData.name}</Text>
                        </HStack>
                        <HStack justify="space-between" bg="transparent" p={3} borderRadius="12px">
                          <Text fontSize="sm" fontWeight="700" color="slate.600">💰 料金:</Text>
                          <Text fontSize="sm" fontWeight="800" color="orange.600">{formatPrice(selectedMenuData.price)}</Text>
                        </HStack>
                        <HStack justify="space-between" bg="transparent" p={3} borderRadius="12px">
                          <Text fontSize="sm" fontWeight="700" color="slate.600">⏱️ 所要時間:</Text>
                          <Text fontSize="sm" fontWeight="600" color="slate.800">{formatDuration(selectedMenuData.duration)}</Text>
                        </HStack>
                        {selectedDate && selectedTime && (
                          <HStack justify="space-between" bg="transparent" p={3} borderRadius="12px">
                            <Text fontSize="sm" fontWeight="700" color="slate.600">日時:</Text>
                            <Text fontSize="sm" fontWeight="800" color="purple.600">
                              {new Date(selectedDate).toLocaleDateString('ja-JP')} {selectedTime}
                            </Text>
                          </HStack>
                        )}
                      </VStack>
                    </VStack>
                  </Box>
                )}

                {/* Cosmic Submit Button */}
                <Box
                  w="full"
                  h="64px"
                  bg={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ?
                    'linear-gradient(135deg, gray.300, gray.400)' :
                    'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #06b6d4 50%, #8b5cf6 100%)'
                  }
                  borderRadius="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ? 'not-allowed' : 'pointer'}
                  position="relative"
                  overflow="hidden"
                  shadow={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ?
                    '0 8px 16px rgba(0, 0, 0, 0.1)' :
                    '0 16px 32px rgba(6, 182, 212, 0.4)'
                  }
                  _hover={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ? {} : {
                    transform: 'translateY(-4px) scale(1.02)',
                    shadow: '0 20px 40px rgba(6, 182, 212, 0.5)'
                  }}
                  _before={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ? {} : {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    w: 'full',
                    h: 'full',
                    bg: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'shimmer 2s ease-in-out infinite'
                  }}
                  transition="all 0.3s ease"
                  onClick={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ? undefined : handleSubmit}
                >
                  <HStack gap={4}>
                    <Box
                      fontSize="2xl"
                      animation={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ? 'none' : 'pulse 1.5s ease-in-out infinite'}
                      filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))"
                    >
                      ""
                    </Box>
                    <Text
                      color="white"
                      fontSize="xl"
                      fontWeight="800"
                      letterSpacing="0.02em"
                    >
                      {(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ?
                        '必須項目を入力してください' :
                        '予約を確定する'
                      }
                    </Text>
                    <Box
                      fontSize="2xl"
                      animation={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ? 'none' : 'pulse 1.5s ease-in-out infinite 0.5s'}
                      filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))"
                    >
                      ""
                    </Box>
                  </HStack>
                </Box>

              </VStack>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}