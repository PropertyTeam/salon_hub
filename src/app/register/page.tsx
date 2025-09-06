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
  Separator,
} from '@chakra-ui/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('パスワードが一致しません')
      return
    }
    
    if (!agreeTerms) {
      alert('利用規約に同意してください')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to success page
      console.log('Registration attempt:', formData)
    }, 2000)
  }

  return (
    <MainLayout>
      <Container maxW="md" py={20}>
        <VStack gap={8} align="stretch">
          
          {/* Header */}
          <VStack gap={2} textAlign="center">
            <Heading size="lg" color="gray.800" fontWeight="600">
              新規登録
            </Heading>
            <Text color="gray.600" fontSize="md">
              アカウントを作成してサロン予約を始めましょう
            </Text>
          </VStack>

          {/* Registration Form */}
          <Card variant="outline">
            <CardContent p={8}>
              <form onSubmit={handleSubmit}>
                <VStack gap={6} align="stretch">
                  
                  <Input
                    label="お名前"
                    type="text"
                    placeholder="山田 太郎"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                  />
                  
                  <Input
                    label="メールアドレス"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                  />
                  
                  <Input
                    label="電話番号"
                    type="tel"
                    placeholder="090-1234-5678"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    helperText="予約確認のため使用します"
                  />
                  
                  <Input
                    label="パスワード"
                    type="password"
                    placeholder="8文字以上で入力"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    required
                    helperText="英数字を含む8文字以上で設定してください"
                  />
                  
                  <Input
                    label="パスワード（確認）"
                    type="password"
                    placeholder="パスワードを再入力"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    required
                  />
                  
                  {/* Terms and Conditions */}
                  <Box>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        style={{ marginTop: '2px' }}
                      />
                      <Text fontSize="sm" color="gray.700">
                        <Link href="/terms">
                          <Text 
                            as="span"
                            color="blue.600"
                            _hover={{ textDecoration: 'underline' }}
                            cursor="pointer"
                          >
                            利用規約
                          </Text>
                        </Link>
                        {' '}および{' '}
                        <Link href="/privacy">
                          <Text 
                            as="span"
                            color="blue.600"
                            _hover={{ textDecoration: 'underline' }}
                            cursor="pointer"
                          >
                            プライバシーポリシー
                          </Text>
                        </Link>
                        に同意します
                      </Text>
                    </label>
                  </Box>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    disabled={!agreeTerms}
                  >
                    アカウントを作成
                  </Button>
                  
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

          {/* Social Registration */}
          <VStack gap={3}>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={
                <Box fontSize="lg">📧</Box>
              }
            >
              Googleで登録
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={
                <Box fontSize="lg">📱</Box>
              }
            >
              LINEで登録
            </Button>
          </VStack>

          {/* Login Link */}
          <Box 
            bg="gray.50" 
            p={6} 
            borderRadius="lg" 
            textAlign="center"
          >
            <Text color="gray.700" fontSize="md">
              すでにアカウントをお持ちの方は{' '}
              <Link href="/login">
                <Text 
                  as="span"
                  color="blue.600" 
                  fontWeight="medium"
                  _hover={{ textDecoration: 'underline' }}
                  cursor="pointer"
                >
                  ログイン
                </Text>
              </Link>
            </Text>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}