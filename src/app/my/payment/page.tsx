'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Badge
} from '@chakra-ui/react'
import { Alert } from '@chakra-ui/alert'
import {
  Field
} from '@/components/forms/field'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function PaymentPage() {
  const router = useRouter()
  const [showAddCard, setShowAddCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    postalCode: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock payment methods
  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      brand: 'mastercard',
      last4: '5555',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ]

  // Mock payment history
  const paymentHistory = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      amount: 5000,
      storeName: 'Hair Studio TOKYO',
      status: 'completed',
      method: '****4242'
    },
    {
      id: '2',
      date: new Date('2024-01-10'),
      amount: 8000,
      storeName: 'Relax Spa & Massage',
      status: 'completed',
      method: '****5555'
    },
    {
      id: '3',
      date: new Date('2024-01-05'),
      amount: 6000,
      storeName: 'Nail Art Paradise',
      status: 'completed',
      method: '****4242'
    }
  ]

  const validateCardForm = () => {
    const newErrors: Record<string, string> = {}

    if (!cardData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'カード番号を入力してください'
    } else if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = '正しいカード番号を入力してください'
    }

    if (!cardData.expiryDate) {
      newErrors.expiryDate = '有効期限を入力してください'
    }

    if (!cardData.cvv) {
      newErrors.cvv = 'セキュリティコードを入力してください'
    } else if (cardData.cvv.length !== 3) {
      newErrors.cvv = '3桁のセキュリティコードを入力してください'
    }

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'カード名義人を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCardForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setShowAddCard(false)
      setCardData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: '',
        postalCode: ''
      })
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value

    // Format card number
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim()
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').substr(0, 5)
    }

    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 3)
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const getBrandIcon = (brand: string) => {
    switch (brand) {
      case 'visa': return '💳'
      case 'mastercard': return '💳'
      case 'amex': return '💳'
      default: return '💳'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge bg="green.500" color="white" px={2} py={1} borderRadius="full">完了</Badge>
      case 'pending':
        return <Badge bg="yellow.500" color="white" px={2} py={1} borderRadius="full">処理中</Badge>
      case 'failed':
        return <Badge bg="red.500" color="white" px={2} py={1} borderRadius="full">失敗</Badge>
      default:
        return <Badge bg="gray.500" color="white" px={2} py={1} borderRadius="full">{status}</Badge>
    }
  }

  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={4} align="start">
            <HStack gap={4}>
              <Button variant="ghost" onClick={() => router.back()}>
                ← 戻る
              </Button>
            </HStack>
            <Heading size="lg" color="gray.800">
              支払い情報
            </Heading>
            <Text color="gray.600">
              クレジットカード情報と決済履歴を管理できます
            </Text>
          </VStack>

          {/* Success Alert */}
          {showSuccess && (
            <Alert status="success" borderRadius="12px">
              クレジットカードを追加しました
            </Alert>
          )}

          {/* Payment Methods */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <HStack justify="space-between" align="center">
                  <Heading size="md" color="gray.800">
                    登録済みクレジットカード
                  </Heading>
                  {!showAddCard && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowAddCard(true)}
                    >
                      カードを追加
                    </Button>
                  )}
                </HStack>

                {/* Add Card Form */}
                {showAddCard && (
                  <Box
                    p={6}
                    bg="gray.50"
                    borderRadius="12px"
                    border="2px solid"
                    borderColor="gray.200"
                  >
                    <form onSubmit={handleAddCard}>
                      <VStack gap={6} align="stretch">
                        <Heading size="sm" color="gray.800">
                          新しいクレジットカードを追加
                        </Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                          <Field label="カード番号" invalid={!!errors.cardNumber} errorText={errors.cardNumber}>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              value={cardData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            />
                          </Field>

                          <Field label="カード名義人" invalid={!!errors.cardholderName} errorText={errors.cardholderName}>
                            <Input
                              placeholder="YAMADA TARO"
                              value={cardData.cardholderName}
                              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                            />
                          </Field>

                          <Field label="有効期限" invalid={!!errors.expiryDate} errorText={errors.expiryDate}>
                            <Input
                              placeholder="MM/YY"
                              value={cardData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                                          />
                          </Field>

                          <Field label="セキュリティコード" invalid={!!errors.cvv} errorText={errors.cvv}>
                            <Input
                              placeholder="123"
                              value={cardData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                                                            type="password"
                            />
                          </Field>
                        </SimpleGrid>

                        <HStack justify="space-between" pt={4}>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setShowAddCard(false)
                              setErrors({})
                              setCardData({
                                cardNumber: '',
                                expiryDate: '',
                                cvv: '',
                                cardholderName: '',
                                billingAddress: '',
                                postalCode: ''
                              })
                            }}
                          >
                            キャンセル
                          </Button>
                          <Button
                            type="submit"
                            variant="primary"
                            isLoading={isLoading}
                          >
                            カードを追加
                          </Button>
                        </HStack>
                      </VStack>
                    </form>
                  </Box>
                )}

                {/* Card List */}
                <VStack gap={4} align="stretch">
                  {paymentMethods.map((method) => (
                    <Box
                      key={method.id}
                      p={4}
                      bg="white"
                      borderRadius="12px"
                      border="2px solid"
                      borderColor={method.isDefault ? "blue.200" : "gray.200"}
                      position="relative"
                    >
                      {method.isDefault && (
                        <Box
                          position="absolute"
                          top={-2}
                          right={4}
                        >
                          <Badge bg="blue.500" color="white" px={3} py={1} borderRadius="full">
                            デフォルト
                          </Badge>
                        </Box>
                      )}

                      <HStack justify="space-between">
                        <HStack gap={4}>
                          <Box
                            w={12}
                            h={8}
                            bg="gray.100"
                            borderRadius="4px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="lg">{getBrandIcon(method.brand)}</Text>
                          </Box>
                          <VStack align="start" gap={1}>
                            <Text fontWeight="600" color="gray.800">
                              **** **** **** {method.last4}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                            </Text>
                          </VStack>
                        </HStack>

                        <HStack gap={2}>
                          {!method.isDefault && (
                            <Button variant="ghost" size="sm">
                              デフォルトに設定
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            編集
                          </Button>
                          <Button variant="danger" size="sm">
                            削除
                          </Button>
                        </HStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="gray.800">
                  決済履歴
                </Heading>

                <VStack gap={4} align="stretch">
                  {paymentHistory.map((payment) => (
                    <Box
                      key={payment.id}
                      p={4}
                      bg="gray.50"
                      borderRadius="12px"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <HStack justify="space-between">
                        <VStack align="start" gap={2}>
                          <Text fontWeight="600" color="gray.800">
                            {payment.storeName}
                          </Text>
                          <HStack gap={4}>
                            <Text fontSize="sm" color="gray.600">
                              {formatDate(payment.date)}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {payment.method}
                            </Text>
                          </HStack>
                        </VStack>

                        <VStack align="end" gap={2}>
                          <Text fontSize="lg" fontWeight="600" color="gray.800">
                            {formatPrice(payment.amount)}
                          </Text>
                          {getStatusBadge(payment.status)}
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>

                <HStack justify="center" pt={4}>
                  <Button variant="outline">
                    もっと見る
                  </Button>
                </HStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Box
            bg="blue.50"
            border="1px solid"
            borderColor="blue.200"
            borderRadius="12px"
            p={6}
          >
            <VStack gap={4} align="start">
              <HStack gap={3}>
                <Text fontSize="xl">🔒</Text>
                <Heading size="sm" color="blue.800">
                  セキュリティについて
                </Heading>
              </HStack>
              <VStack gap={2} align="start">
                <Text fontSize="sm" color="blue.700">
                  • すべての決済情報は暗号化されて保存されます
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • SalonHubはクレジットカード情報を直接保存しません
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • 決済処理は信頼できる決済プロバイダーを通じて行われます
                </Text>
              </VStack>
            </VStack>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}