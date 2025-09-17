'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  Text,
  Heading
} from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control'
import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function PasswordResetPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
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
      setIsSuccess(true)
    }, 2000)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  if (isSuccess) {
    return (
      <MainLayout>
        <Container maxW="md" py={8}>
          <VStack gap={8} align="stretch">

            {/* Success Icon */}
            <VStack gap={6} textAlign="center">
              <Box
                w={20}
                h={20}
                bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                shadow="0 12px 30px rgba(16, 185, 129, 0.4)"
                animation="scaleIn 0.5s ease-out"
              >
                <Text fontSize="3xl" color="white">📧</Text>
              </Box>

              <Heading size="lg" color="gray.800">
                リセットメール送信完了
              </Heading>

              <Text color="gray.600" lineHeight="1.7">
                <Text as="span" fontWeight="600">{email}</Text>
                <br />
                宛にパスワードリセット用のメールをお送りしました。
              </Text>
            </VStack>

            {/* Instructions */}
            <Card>
              <CardContent p={6}>
                <VStack gap={4} align="stretch">
                  <Heading size="sm" color="gray.800">
                    次のステップ
                  </Heading>

                  <VStack gap={3} align="start">
                    <Text fontSize="sm" color="gray.700">
                      • メールボックスを確認してください
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      • メール内のリンクをクリックしてパスワードをリセット
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      • 新しいパスワードでログインしてください
                    </Text>
                  </VStack>
                </VStack>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <VStack gap={3}>
              <Link href="/auth/login">
                <Button variant="primary" size="lg" fullWidth>
                  ログインページに戻る
                </Button>
              </Link>

              <Button variant="ghost" onClick={() => setIsSuccess(false)}>
                別のメールアドレスで試す
              </Button>
            </VStack>

            {/* Help */}
            <Box
              bg="yellow.50"
              border="1px solid"
              borderColor="yellow.200"
              borderRadius="12px"
              p={4}
            >
              <VStack gap={2} align="start">
                <Text fontSize="sm" fontWeight="600" color="yellow.800">
                  メールが届かない場合
                </Text>
                <Text fontSize="sm" color="yellow.700" lineHeight="1.6">
                  迷惑メールフォルダをご確認いただくか、数分お待ちください。
                  メールアドレスが間違っている可能性もあります。
                </Text>
              </VStack>
            </Box>

          </VStack>
        </Container>
      </MainLayout>
    )
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
              <Text fontSize="2xl" color="white">🔑</Text>
            </Box>
            <Heading size="lg" color="gray.800">
              パスワードリセット
            </Heading>
            <Text color="gray.600" textAlign="center">
              登録済みのメールアドレスを入力してください。
              <br />
              パスワードリセット用のリンクをお送りします。
            </Text>
          </VStack>

          {/* Reset Form */}
          <Card>
            <CardContent p={8}>
              <form onSubmit={handleSubmit}>
                <VStack gap={6} align="stretch">

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input
                      type="email"
                      placeholder="登録済みのメールアドレス"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                  >
                    リセットメールを送信
                  </Button>

                </VStack>
              </form>
            </CardContent>
          </Card>

          {/* Information */}
          <Alert status="info" borderRadius="12px">
            <VStack align="start" gap={1}>
              <Text fontSize="sm" fontWeight="600">
                パスワードリセットについて
              </Text>
              <Text fontSize="sm">
                セキュリティのため、リセットリンクは24時間で無効になります。
              </Text>
            </VStack>
          </Alert>

          {/* Back Link */}
          <VStack gap={2}>
            <Text color="gray.600" fontSize="sm">
              パスワードを思い出しましたか？
            </Text>
            <Link href="/auth/login">
              <Button variant="ghost">
                ログインページに戻る
              </Button>
            </Link>
          </VStack>

        </VStack>
      </Container>
    </MainLayout>
  )
}