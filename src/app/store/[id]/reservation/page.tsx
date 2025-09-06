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
} from '@/data/mockData'

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
          <HStack color="gray.500" fontSize="sm">
            <Link href="/stores">
              <Text _hover={{ color: 'blue.500', textDecoration: 'underline' }}>
                サロン一覧
              </Text>
            </Link>
            <Text>›</Text>
            <Link href={`/store/${storeId}`}>
              <Text _hover={{ color: 'blue.500', textDecoration: 'underline' }}>
                {store.name}
              </Text>
            </Link>
            <Text>›</Text>
            <Text color="gray.700" fontWeight="medium">予約</Text>
          </HStack>

          {/* Header */}
          <VStack gap={2} textAlign="center">
            <Heading size="xl" color="gray.800">
              予約フォーム
            </Heading>
            <Text color="gray.600">
              {store.name}
            </Text>
          </VStack>

          {/* Form */}
          <Card variant="outline">
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                
                {/* Menu Selection */}
                <VStack gap={4} align="stretch">
                  <Heading size="sm" color="gray.800">メニュー選択</Heading>
                  
                  {menus.length === 0 ? (
                    <Center py={8}>
                      <Text color="gray.500">メニューが登録されていません</Text>
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      {menus.map((menu) => (
                        <Card 
                          key={menu.id} 
                          variant="outline"
                          borderColor={selectedMenu === menu.id ? 'blue.400' : 'gray.200'}
                          bg={selectedMenu === menu.id ? 'blue.50' : 'white'}
                          cursor="pointer"
                          onClick={() => setSelectedMenu(menu.id)}
                          _hover={{ borderColor: 'blue.300' }}
                        >
                          <CardContent p={4}>
                            <VStack align="stretch" gap={2}>
                              <HStack justify="space-between" align="start">
                                <VStack align="start" gap={1} flex="1">
                                  <Heading size="xs" color="gray.800">
                                    {menu.name}
                                  </Heading>
                                  <Text color="gray.600" fontSize="xs">
                                    {menu.description}
                                  </Text>
                                </VStack>
                                <VStack align="end" gap={0}>
                                  <Text color="blue.600" fontWeight="bold" fontSize="sm">
                                    {formatPrice(menu.price)}
                                  </Text>
                                  <Text color="gray.500" fontSize="xs">
                                    {formatDuration(menu.duration)}
                                  </Text>
                                </VStack>
                              </HStack>
                              <Badge colorScheme="blue" variant="subtle" fontSize="xs" alignSelf="start">
                                {menu.category}
                              </Badge>
                            </VStack>
                          </CardContent>
                        </Card>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>

                {/* Date and Time */}
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <GridItem>
                    <VStack gap={2} align="start">
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">予約日</Text>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </VStack>
                  </GridItem>
                  
                  <GridItem>
                    <VStack gap={2} align="start">
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">予約時間</Text>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '4px'
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
                    </VStack>
                  </GridItem>
                </Grid>

                {/* Customer Information */}
                <VStack gap={4} align="stretch">
                  <Heading size="sm" color="gray.800">お客様情報</Heading>
                  
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <GridItem>
                      <VStack gap={2} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">お名前 *</Text>
                        <Input
                          placeholder="山田 太郎"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </VStack>
                    </GridItem>
                    
                    <GridItem>
                      <VStack gap={2} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">電話番号 *</Text>
                        <Input
                          placeholder="090-1234-5678"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                      </VStack>
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <VStack gap={2} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">メールアドレス *</Text>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                      </VStack>
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <VStack gap={2} align="start">
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">ご要望・備考</Text>
                        <Textarea
                          placeholder="何かご要望やご質問がございましたらお書きください"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                        />
                      </VStack>
                    </GridItem>
                  </Grid>
                </VStack>

                {/* Selected Info Summary */}
                {selectedMenuData && (
                  <Card variant="outline" bg="blue.50">
                    <CardContent p={4}>
                      <VStack gap={3} align="start">
                        <Text fontSize="sm" fontWeight="bold" color="blue.700">予約内容</Text>
                        <VStack gap={1} align="start">
                          <Text fontSize="sm" color="blue.600">
                            メニュー: {selectedMenuData.name}
                          </Text>
                          <Text fontSize="sm" color="blue.600">
                            料金: {formatPrice(selectedMenuData.price)}
                          </Text>
                          <Text fontSize="sm" color="blue.600">
                            所要時間: {formatDuration(selectedMenuData.duration)}
                          </Text>
                          {selectedDate && selectedTime && (
                            <Text fontSize="sm" color="blue.600">
                              日時: {new Date(selectedDate).toLocaleDateString('ja-JP')} {selectedTime}
                            </Text>
                          )}
                        </VStack>
                      </VStack>
                    </CardContent>
                  </Card>
                )}

                {/* Submit Button */}
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!selectedMenu || !selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone}
                  fullWidth={true}
                >
                  予約を確定する
                </Button>

              </VStack>
            </CardContent>
          </Card>

        </VStack>
      </Container>
    </MainLayout>
  )
}