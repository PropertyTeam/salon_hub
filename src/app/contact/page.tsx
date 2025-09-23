'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Textarea
} from '@chakra-ui/react'
import { Alert } from '@chakra-ui/alert'
import {
  Field
} from '@/components/forms/field'
import {
  NativeSelectField,
  NativeSelectRoot
} from '@/components/forms/native-select'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = [
    { value: 'reservation', label: '予約について' },
    { value: 'payment', label: '決済について' },
    { value: 'account', label: 'アカウントについて' },
    { value: 'technical', label: 'システム・技術的な問題' },
    { value: 'store', label: '店舗について' },
    { value: 'service', label: 'サービス・メニューについて' },
    { value: 'complaint', label: '苦情・要望' },
    { value: 'other', label: 'その他' }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    if (!formData.category) {
      newErrors.category = 'お問い合わせ種類を選択してください'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '件名を入力してください'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '10文字以上で入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: ''
      })
      setTimeout(() => setShowSuccess(false), 5000)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={6} align="stretch">
            <VStack gap={4} align="center" textAlign="center">
              <Heading size="xl" color="gray.800">
                お問い合わせ
              </Heading>
              <Text color="gray.600" fontSize="lg" maxW="2xl">
                ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
                通常24時間以内にご返信いたします。
              </Text>
            </VStack>
          </VStack>

          {/* Success Alert */}
          {showSuccess && (
            <Alert status="success" borderRadius="12px">
              <VStack align="start" gap={1}>
                <Text fontWeight="600">お問い合わせを受け付けました</Text>
                <Text fontSize="sm">
                  24時間以内にご返信いたします。お急ぎの場合はお電話でお問い合わせください。
                </Text>
              </VStack>
            </Alert>
          )}

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>

            {/* Contact Information */}
            <VStack gap={6} align="stretch">
              <Card>
                <CardContent p={6}>
                  <VStack gap={4} align="stretch">
                    <Heading size="md" color="gray.800">
                      📞 お電話でのお問い合わせ
                    </Heading>
                    <VStack align="start" gap={3}>
                      <VStack align="start" gap={1}>
                        <Text fontWeight="600" color="gray.800">
                          カスタマーサポート
                        </Text>
                        <Text fontSize="xl" fontWeight="800" color="gray.800">
                          0120-123-456
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          受付時間: 9:00 - 18:00（年中無休）
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardContent p={6}>
                  <VStack gap={4} align="stretch">
                    <Heading size="md" color="gray.800">
                      📧 メールでのお問い合わせ
                    </Heading>
                    <VStack align="start" gap={3}>
                      <VStack align="start" gap={1}>
                        <Text fontWeight="600" color="gray.800">
                          一般のお問い合わせ
                        </Text>
                        <Text color="gray.700" fontSize="sm">
                          support@salonhub.jp
                        </Text>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <Text fontWeight="600" color="gray.800">
                          店舗様からのお問い合わせ
                        </Text>
                        <Text color="gray.700" fontSize="sm">
                          business@salonhub.jp
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                </CardContent>
              </Card>

              <Card>
                <CardContent p={6}>
                  <VStack gap={4} align="stretch">
                    <Heading size="md" color="gray.800">
                      💬 チャットサポート
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      平日 10:00 - 17:00<br />
                      画面右下のチャットボタンからご利用いただけます
                    </Text>
                    <Button variant="outline" size="sm">
                      チャットを開始
                    </Button>
                  </VStack>
                </CardContent>
              </Card>
            </VStack>

            {/* Contact Form */}
            <Box gridColumn={{ base: '1', lg: '2 / 4' }}>
              <Card>
                <CardContent p={8}>
                  <form onSubmit={handleSubmit}>
                    <VStack gap={6} align="stretch">
                      <Heading size="md" color="gray.800">
                        お問い合わせフォーム
                      </Heading>

                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                        <Field label="お名前 *" invalid={!!errors.name} errorText={errors.name}>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="山田 太郎"
                          />
                        </Field>

                        <Field label="メールアドレス *" invalid={!!errors.email} errorText={errors.email}>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="example@email.com"
                          />
                        </Field>
                      </SimpleGrid>

                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                        <Field label="電話番号（任意）">
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="090-1234-5678"
                          />
                        </Field>

                        <Field label="お問い合わせ種類 *" invalid={!!errors.category} errorText={errors.category}>
                          <NativeSelectRoot>
                            <NativeSelectField
                              value={formData.category}
                              onChange={(e) => handleInputChange('category', e.target.value)}
                              placeholder="選択してください"
                            >
                              <option value="">選択してください</option>
                              {categories.map((category) => (
                                <option key={category.value} value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </NativeSelectField>
                          </NativeSelectRoot>
                        </Field>
                      </SimpleGrid>

                      <Field label="件名 *" invalid={!!errors.subject} errorText={errors.subject}>
                        <Input
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="例: 予約のキャンセルについて"
                        />
                      </Field>

                      <Field label="お問い合わせ内容 *" invalid={!!errors.message} errorText={errors.message}>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="お問い合わせ内容を詳しくご記入ください"
                          rows={6}
                        />
                      </Field>

                      <Box
                        p={4}
                        bg="yellow.50"
                        borderRadius="8px"
                        border="1px solid"
                        borderColor="yellow.200"
                      >
                        <VStack align="start" gap={2}>
                          <Text fontSize="sm" fontWeight="600" color="yellow.800">
                            お問い合わせ前にご確認ください
                          </Text>
                          <Text fontSize="sm" color="yellow.700">
                            • よくある質問もご確認ください
                          </Text>
                          <Text fontSize="sm" color="yellow.700">
                            • 予約関連のお問い合わせには予約IDをご記入ください
                          </Text>
                          <Text fontSize="sm" color="yellow.700">
                            • 個人情報は暗号化されて送信されます
                          </Text>
                        </VStack>
                      </Box>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isLoading}
                      >
                        {isLoading ? '送信中...' : '送信する'}
                      </Button>
                    </VStack>
                  </form>
                </CardContent>
              </Card>
            </Box>

          </SimpleGrid>

          {/* FAQ Section */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="lg" color="gray.800">
                  よくある質問
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                  <VStack gap={4} align="stretch">
                    <Box>
                      <Text fontWeight="600" color="gray.800" mb={2}>
                        Q. 予約をキャンセルしたいのですが？
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        マイページの予約管理からキャンセルできます。前日20時以降のキャンセルは手数料が発生する場合があります。
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.800" mb={2}>
                        Q. 支払い方法を変更したいのですが？
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        マイページの支払い情報から変更できます。クレジットカードやデビットカードをご利用いただけます。
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.800" mb={2}>
                        Q. アカウントを削除したいのですが？
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        マイページのアカウント情報から削除できます。削除すると全ての情報が失われますのでご注意ください。
                      </Text>
                    </Box>
                  </VStack>

                  <VStack gap={4} align="stretch">
                    <Box>
                      <Text fontWeight="600" color="gray.800" mb={2}>
                        Q. 店舗の営業時間が知りたいのですが？
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        各店舗の詳細ページで営業時間をご確認いただけます。店舗によって異なりますのでご注意ください。
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.800" mb={2}>
                        Q. クーポンの利用方法は？
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        予約時にクーポンコードを入力するか、クーポンページからご利用ください。一部併用不可のクーポンがあります。
                      </Text>
                    </Box>

                    <Box>
                      <Text fontWeight="600" color="gray.800" mb={2}>
                        Q. 遅刻しそうな場合はどうすればいいですか？
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        必ず店舗に直接お電話でご連絡ください。大幅な遅刻の場合、予約をキャンセルさせていただく場合があります。
                      </Text>
                    </Box>
                  </VStack>
                </SimpleGrid>

                <HStack justify="center">
                  <Button variant="outline">
                    もっと見る
                  </Button>
                </HStack>
              </VStack>
            </CardContent>
          </Card>

        </VStack>
      </Container>
    </MainLayout>
  )
}