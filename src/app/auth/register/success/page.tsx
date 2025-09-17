'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function RegisterSuccessPage() {
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
              <Text fontSize="3xl" color="white">✓</Text>
            </Box>

            <Heading size="lg" color="gray.800">
              会員登録完了！
            </Heading>

            <Text color="gray.600" lineHeight="1.7">
              SalonHubへのご登録ありがとうございます。
              <br />
              確認メールをお送りしましたので、メールアドレスの認証を完了してください。
            </Text>
          </VStack>

          {/* Information Card */}
          <Card>
            <CardContent p={6}>
              <VStack gap={4} align="stretch">
                <Heading size="sm" color="gray.800">
                  次のステップ
                </Heading>

                <VStack gap={3} align="stretch">
                  <HStack gap={3}>
                    <Box
                      w={8}
                      h={8}
                      bg="blue.100"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Text fontSize="sm" fontWeight="600" color="blue.600">1</Text>
                    </Box>
                    <Text fontSize="sm" color="gray.700">
                      メールボックスを確認し、認証リンクをクリック
                    </Text>
                  </HStack>

                  <HStack gap={3}>
                    <Box
                      w={8}
                      h={8}
                      bg="blue.100"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Text fontSize="sm" fontWeight="600" color="blue.600">2</Text>
                    </Box>
                    <Text fontSize="sm" color="gray.700">
                      ログインしてプロフィールを完成させる
                    </Text>
                  </HStack>

                  <HStack gap={3}>
                    <Box
                      w={8}
                      h={8}
                      bg="blue.100"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Text fontSize="sm" fontWeight="600" color="blue.600">3</Text>
                    </Box>
                    <Text fontSize="sm" color="gray.700">
                      お気に入りのサロンを見つけて予約開始
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <VStack gap={3}>
            <Link href="/auth/login">
              <Button variant="primary" size="lg" fullWidth>
                ログインページへ
              </Button>
            </Link>

            <Link href="/">
              <Button variant="ghost">
                ホームに戻る
              </Button>
            </Link>
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
              <HStack gap={2}>
                <Text fontSize="lg">📧</Text>
                <Text fontSize="sm" fontWeight="600" color="yellow.800">
                  メールが届かない場合
                </Text>
              </HStack>
              <Text fontSize="sm" color="yellow.700" lineHeight="1.6">
                迷惑メールフォルダをご確認いただくか、数分お待ちいただいてから再度ご確認ください。
                それでもメールが届かない場合は、お問い合わせフォームよりご連絡ください。
              </Text>
            </VStack>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}