'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Center,
  Separator
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard or home
      console.log('Login attempt:', { email, password })
    }, 2000)
  }

  return (
    <MainLayout>
      <Container maxW="md" py={20}>
        <VStack gap={8} align="stretch">
          
          {/* Header */}
          <VStack gap={2} textAlign="center">
            <Heading size="lg" color="gray.800" fontWeight="600">
              ログイン
            </Heading>
            <Text color="gray.600" fontSize="md">
              アカウントにログインしてサロンを予約しましょう
            </Text>
          </VStack>

          {/* Login Form */}
          <Card variant="outline">
            <CardContent p={8}>
              <form onSubmit={handleSubmit}>
                <VStack gap={6} align="stretch">
                  
                  <Input
                    label="メールアドレス"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  
                  <Input
                    label="パスワード"
                    type="password"
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  
                  <VStack gap={4} align="stretch">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isLoading}
                    >
                      ログイン
                    </Button>
                    
                    <Center>
                      <Link href="/password/reset">
                        <Text 
                          fontSize="sm" 
                          color="blue.600" 
                          _hover={{ textDecoration: 'underline' }}
                          cursor="pointer"
                        >
                          パスワードを忘れた方はこちら
                        </Text>
                      </Link>
                    </Center>
                  </VStack>
                  
                </VStack>
              </form>
            </CardContent>
          </Card>

          {/* Separator */}
          <HStack>
            <Separator flex="1" />
            <Text fontSize="sm" color="gray.500" px={4}>または</Text>
            <Separator flex="1" />
          </HStack>

          {/* Social Login */}
          <VStack gap={3}>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={
                <Box fontSize="lg">📧</Box>
              }
            >
              Googleでログイン
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={
                <Box fontSize="lg">📱</Box>
              }
            >
              LINEでログイン
            </Button>
          </VStack>

          {/* Sign Up Link */}
          <Box 
            bg="gray.50" 
            p={6} 
            borderRadius="lg" 
            textAlign="center"
          >
            <Text color="gray.700" fontSize="md">
              まだアカウントをお持ちでない方は{' '}
              <Link href="/register">
                <Text 
                  as="span"
                  color="blue.600" 
                  fontWeight="medium"
                  _hover={{ textDecoration: 'underline' }}
                  cursor="pointer"
                >
                  新規登録
                </Text>
              </Link>
            </Text>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}