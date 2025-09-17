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
import { Checkbox } from '@chakra-ui/checkbox'
import { Alert } from '@chakra-ui/alert'
import {
  Field
} from '@/components/forms/field'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setLoginError('')

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Simulate login validation
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        router.push('/my')
      } else {
        setLoginError('メールアドレスまたはパスワードが正しくありません')
      }
    }, 1500)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    if (loginError) {
      setLoginError('')
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
              <Text fontSize="2xl" color="white">🔐</Text>
            </Box>
            <Heading size="lg" color="gray.800">
              ログイン
            </Heading>
            <Text color="gray.600">
              アカウントにログインして、サロンの予約を管理しましょう
            </Text>
          </VStack>

          {/* Login Error */}
          {loginError && (
            <Alert status="error" borderRadius="12px">
              {loginError}
            </Alert>
          )}

          {/* Login Form */}
          <Card>
            <CardContent p={8}>
              <form onSubmit={handleSubmit}>
                <VStack gap={6} align="stretch">

                  <Field label="メールアドレス" invalid={!!errors.email} errorText={errors.email}>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </Field>

                  <Field label="パスワード" invalid={!!errors.password} errorText={errors.password}>
                    <Input
                      type="password"
                      placeholder="パスワードを入力"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </Field>

                  <HStack justify="space-between">
                    <Checkbox
                      isChecked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    >
                      <Text fontSize="sm">ログイン状態を保持</Text>
                    </Checkbox>

                    <Link href="/auth/password-reset">
                      <Text fontSize="sm" color="blue.600" textDecoration="underline">
                        パスワードを忘れた方
                      </Text>
                    </Link>
                  </HStack>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                  >
                    ログイン
                  </Button>

                </VStack>
              </form>
            </CardContent>
          </Card>

          {/* Social Login */}
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
                      <Text>Googleでログイン</Text>
                    </HStack>
                  </Button>

                  <Button variant="outline" size="lg" fullWidth>
                    <HStack gap={3}>
                      <Text fontSize="lg">📱</Text>
                      <Text>LINEでログイン</Text>
                    </HStack>
                  </Button>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Box
            bg="blue.50"
            border="1px solid"
            borderColor="blue.200"
            borderRadius="12px"
            p={4}
          >
            <VStack gap={2} align="start">
              <HStack gap={2}>
                <Text fontSize="lg">🎯</Text>
                <Text fontSize="sm" fontWeight="600" color="blue.800">
                  デモアカウント
                </Text>
              </HStack>
              <VStack gap={1} align="start">
                <Text fontSize="sm" color="blue.700">
                  メール: test@example.com
                </Text>
                <Text fontSize="sm" color="blue.700">
                  パスワード: password
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Register Link */}
          <VStack gap={2}>
            <Text color="gray.600" fontSize="sm">
              アカウントをお持ちでない方
            </Text>
            <Link href="/auth/register">
              <Button variant="ghost">
                新規会員登録はこちら
              </Button>
            </Link>
          </VStack>

        </VStack>
      </Container>
    </MainLayout>
  )
}