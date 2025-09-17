'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading
} from '@chakra-ui/react'
import { Alert } from '@chakra-ui/alert'
import { Checkbox } from '@chakra-ui/checkbox'
import {
  Field
} from '@/components/forms/field'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

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

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください'
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '電話番号を入力してください'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = '利用規約とプライバシーポリシーに同意してください'
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
      router.push('/auth/register/success')
    }, 2000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <MainLayout>
      <Container maxW="md" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={4} textAlign="center">
            <Box
              w={16}
              h={16}
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              borderRadius="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              shadow="0 8px 25px rgba(102, 126, 234, 0.4)"
            >
              <Text fontSize="2xl" color="white">👤</Text>
            </Box>
            <Heading size="lg" color="gray.800">
              新規会員登録
            </Heading>
            <Text color="gray.600">
              SalonHubアカウントを作成して、お気に入りのサロンを見つけましょう
            </Text>
          </VStack>

          {/* Registration Form */}
          <Card>
            <CardContent p={8}>
              <form onSubmit={handleSubmit}>
                <VStack gap={6} align="stretch">

                  <Field label="お名前" invalid={!!errors.name} errorText={errors.name}>
                    <Input
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </Field>

                  <Field label="メールアドレス" invalid={!!errors.email} errorText={errors.email}>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </Field>

                  <Field label="電話番号" invalid={!!errors.phone} errorText={errors.phone}>
                    <Input
                      placeholder="090-1234-5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </Field>

                  <Field label="パスワード" invalid={!!errors.password} errorText={errors.password}>
                    <Input
                      type="password"
                      placeholder="8文字以上"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </Field>

                  <Field label="パスワード（確認）" invalid={!!errors.confirmPassword} errorText={errors.confirmPassword}>
                    <Input
                      type="password"
                      placeholder="パスワードを再入力"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                  </Field>

                  <Field invalid={!!errors.acceptTerms} errorText={errors.acceptTerms}>
                    <Checkbox
                      isChecked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    >
                      <Text fontSize="sm">
                        <Link href="/terms">
                          <Text as="span" color="blue.600" textDecoration="underline">
                            利用規約
                          </Text>
                        </Link>
                        および
                        <Link href="/privacy">
                          <Text as="span" color="blue.600" textDecoration="underline">
                            プライバシーポリシー
                          </Text>
                        </Link>
                        に同意します
                      </Text>
                    </Checkbox>
                  </Field>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                  >
                    アカウントを作成
                  </Button>

                </VStack>
              </form>
            </CardContent>
          </Card>

          {/* Social Registration */}
          <Card>
            <CardContent p={6}>
              <VStack gap={4}>
                <HStack w="full" align="center">
                  <Box flex={1} h="1px" bg="gray.200" />
                  <Text color="gray.500" fontSize="sm" whiteSpace="nowrap" px={4}>
                    または
                  </Text>
                  <Box flex={1} h="1px" bg="gray.200" />
                </HStack>

                <VStack gap={3} w="full">
                  <Button variant="outline" size="lg" fullWidth>
                    <HStack gap={3}>
                      <Text fontSize="lg">🔍</Text>
                      <Text>Googleで登録</Text>
                    </HStack>
                  </Button>

                  <Button variant="outline" size="lg" fullWidth>
                    <HStack gap={3}>
                      <Text fontSize="lg">📱</Text>
                      <Text>LINEで登録</Text>
                    </HStack>
                  </Button>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Login Link */}
          <VStack gap={2}>
            <Text color="gray.600" fontSize="sm">
              すでにアカウントをお持ちですか？
            </Text>
            <Link href="/auth/login">
              <Button variant="ghost">
                ログインはこちら
              </Button>
            </Link>
          </VStack>

        </VStack>
      </Container>
    </MainLayout>
  )
}