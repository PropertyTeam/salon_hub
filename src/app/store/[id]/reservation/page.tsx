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
          
          {/* Breadcrumb */}
          <HStack
            color="gray.600"
            fontSize="sm"
            fontWeight="medium"
          >
            <Link href="/stores">
              <Text _hover={{ color: "primary.600" }}
                transition="color 0.2s"
                cursor="pointer"
              >
                サロン一覧
              </Text>
            </Link>
            <Text color="gray.400">›</Text>
            <Link href={`/store/${storeId}`}>
              <Text _hover={{ color: "primary.600" }}
                transition="color 0.2s"
                cursor="pointer"
              >
                {store.name}
              </Text>
            </Link>
            <Text color="gray.400">›</Text>
            <Text color="gray.900" fontWeight="semibold">
              予約
            </Text>
          </HStack>

          {/* Header */}
          <VStack gap={4} textAlign="center">
            <Heading size="xl" color="gray.900" fontWeight="bold">
              予約フォーム
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {store.name}
            </Text>
          </VStack>

          {/* Form */}
          <Box
            bg="white"
            borderRadius="xl"
            p={{ base: 6, md: 8 }}
            shadow="sm"
            border="1px solid"
            borderColor="gray.200"
          >
              <VStack gap={6} align="stretch">
                
                {/* Menu Selection */}
                <VStack gap={6} align="stretch">
                  <Heading size="lg" color="gray.900" fontWeight="semibold">
                    メニュー選択
                  </Heading>
                  
                  {menus.length === 0 ? (
                    <Center py={8}>
                      <Text color="gray.500">メニューが登録されていません</Text>
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      {menus.map((menu, index) => (
                        <Card
                          key={menu.id}
                          variant={selectedMenu === menu.id ? "outline" : "outline"}
                          bg={selectedMenu === menu.id ? 'primary.50' : 'white'}
                          borderColor={selectedMenu === menu.id ? 'primary.500' : 'gray.200'}
                          cursor="pointer"
                          onClick={() => setSelectedMenu(menu.id)}
                          _hover={{
                            borderColor: selectedMenu === menu.id ? 'primary.600' : 'primary.300',
                            shadow: 'md'
                          }}
                          transition="all 0.2s ease"
                        >
                          <CardContent p={4}>
                            <VStack align="stretch" gap={3}>
                              <HStack justify="space-between" align="start">
                                <VStack align="start" gap={2} flex="1">
                                  <Heading size="sm" color="gray.900" fontWeight="semibold">
                                    {menu.name}
                                  </Heading>
                                  <Text color="gray.600" fontSize="sm" lineHeight="1.5">
                                    {menu.description}
                                  </Text>
                                </VStack>
                                <VStack align="end" gap={1}>
                                  <Text color="gray.900" fontWeight="bold" fontSize="lg">
                                    {formatPrice(menu.price)}
                                  </Text>
                                  <Badge
                                    bg="gray.100"
                                    color="gray.700"
                                    fontSize="xs"
                                    px={2}
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
                                  fontSize="xs"
                                  px={3}
                                  py={1}
                                  borderRadius="md"
                                  fontWeight="medium"
                                >
                                  {menu.category}
                                </Badge>
                                {selectedMenu === menu.id && (
                                  <Badge
                                    bg="primary.500"
                                    color="white"
                                    fontSize="xs"
                                    px={3}
                                    py={1}
                                    borderRadius="md"
                                    fontWeight="medium"
                                  >
                                    選択中
                                  </Badge>
                                )}
                              </HStack>
                            </VStack>
                          </CardContent>
                        </Card>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>

                {/* Date and Time */}
                <VStack gap={6} align="stretch">
                  <Heading size="lg" color="gray.900" fontWeight="semibold">
                    日時選択
                  </Heading>
                  
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          予約日
                        </Text>
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{
                            borderColor: "primary.500",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                            bg: "white"
                          }}
                        />
                      </VStack>
                    </GridItem>
                    
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          予約時間
                        </Text>
                        <Box position="relative">
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
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
                              cursor: 'pointer'
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

                {/* Customer Information */}
                <VStack gap={6} align="stretch">
                  <Heading size="lg" color="gray.900" fontWeight="semibold">
                    お客様情報
                  </Heading>
                  
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          お名前 *
                        </Text>
                        <Input
                          placeholder="山田 太郎"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{
                            borderColor: "primary.500",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                            bg: "white"
                          }}
                        />
                      </VStack>
                    </GridItem>
                    
                    <GridItem>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          電話番号 *
                        </Text>
                        <Input
                          placeholder="090-1234-5678"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{
                            borderColor: "primary.500",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                            bg: "white"
                          }}
                        />
                      </VStack>
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          メールアドレス *
                        </Text>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{
                            borderColor: "primary.500",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                            bg: "white"
                          }}
                        />
                      </VStack>
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          ご要望・備考
                        </Text>
                        <Textarea
                          placeholder="何かご要望やご質問がございましたらお書きください"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={4}
                          resize="none"
                          bg="gray.50"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="lg"
                          _hover={{ borderColor: "gray.300" }}
                          _focus={{
                            borderColor: "primary.500",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                            bg: "white"
                          }}
                        />
                      </VStack>
                    </GridItem>
                  </Grid>
                </VStack>

                {/* Selected Info Summary */}
                {selectedMenuData && (
                  <Box
                    bg="primary.50"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="primary.200"
                    p={6}
                  >
                    <VStack gap={4} align="stretch">
                      <Heading size="md" color="gray.900" fontWeight="semibold" textAlign="center">
                        予約内容確認
                      </Heading>
                      <VStack gap={3} align="stretch">
                        <HStack justify="space-between" p={3} bg="white" borderRadius="md">
                          <Text fontSize="sm" fontWeight="medium" color="gray.600">メニュー</Text>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.900">{selectedMenuData.name}</Text>
                        </HStack>
                        <HStack justify="space-between" p={3} bg="white" borderRadius="md">
                          <Text fontSize="sm" fontWeight="medium" color="gray.600">料金</Text>
                          <Text fontSize="sm" fontWeight="bold" color="gray.900">{formatPrice(selectedMenuData.price)}</Text>
                        </HStack>
                        <HStack justify="space-between" p={3} bg="white" borderRadius="md">
                          <Text fontSize="sm" fontWeight="medium" color="gray.600">所要時間</Text>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.900">{formatDuration(selectedMenuData.duration)}</Text>
                        </HStack>
                        {selectedDate && selectedTime && (
                          <HStack justify="space-between" p={3} bg="white" borderRadius="md">
                            <Text fontSize="sm" fontWeight="medium" color="gray.600">日時</Text>
                            <Text fontSize="sm" fontWeight="bold" color="primary.600">
                              {new Date(selectedDate).toLocaleDateString('ja-JP')} {selectedTime}
                            </Text>
                          </HStack>
                        )}
                      </VStack>
                    </VStack>
                  </Box>
                )}

                {/* Submit Button */}
                <Button
                  variant={(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ? "outline" : "primary"}
                  size="lg"
                  w="full"
                  isDisabled={!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone}
                  onClick={handleSubmit}
                >
                  {(!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) ?
                    '必須項目を入力してください' :
                    '予約を確定する'
                  }
                </Button>

              </VStack>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}