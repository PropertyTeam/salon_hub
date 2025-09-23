'use client'

import { useState } from 'react'
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
import {
  Field
} from '@/components/forms/field'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockUsers } from '../../../../data/mockData'

export default function AccountPage() {
  const router = useRouter()
  const currentUser = mockUsers[0]

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
    avatar: currentUser.avatar || ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

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

    if (!formData.phone.trim()) {
      newErrors.phone = '電話番号を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {}

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = '現在のパスワードを入力してください'
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = '新しいパスワードを入力してください'
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'パスワードは8文字以上で入力してください'
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません'
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
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswordForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setShowPasswordForm(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <MainLayout>
      <Container maxW="2xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={4} align="start">
            <HStack gap={4}>
              <Button variant="ghost" onClick={() => router.back()}>
                ← 戻る
              </Button>
            </HStack>
            <Heading size="lg" color="gray.800">
              アカウント情報
            </Heading>
            <Text color="gray.600">
              プロフィール情報とセキュリティ設定を管理できます
            </Text>
          </VStack>

          {/* Success Alert */}
          {showSuccess && (
            <Alert status="success" borderRadius="12px">
              アカウント情報を更新しました
            </Alert>
          )}

          {/* Profile Section */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="gray.800">
                  基本情報
                </Heading>

                {/* Avatar */}
                <VStack gap={4}>
                  <Box
                    w={20}
                    h={20}
                    borderRadius="full"
                    bg="blue.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="3xl"
                    fontWeight="600"
                    color="white"
                  >
                    {formData.name?.[0] || '👤'}
                  </Box>
                  <Button variant="outline" size="sm">
                    プロフィール画像を変更
                  </Button>
                </VStack>

                <form onSubmit={handleSubmit}>
                  <VStack gap={6} align="stretch">

                    <Field label="お名前" invalid={!!errors.name} errorText={errors.name}>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </Field>

                    <Field label="メールアドレス" invalid={!!errors.email} errorText={errors.email}>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </Field>

                    <Field label="電話番号" invalid={!!errors.phone} errorText={errors.phone}>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </Field>

                    <HStack justify="space-between" pt={4}>
                      <Button variant="ghost" onClick={() => router.back()}>
                        キャンセル
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                      >
                        変更を保存
                      </Button>
                    </HStack>

                  </VStack>
                </form>
              </VStack>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <HStack justify="space-between" align="center">
                  <VStack align="start" gap={1}>
                    <Heading size="md" color="gray.800">
                      セキュリティ
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      パスワードとセキュリティ設定
                    </Text>
                  </VStack>
                  {!showPasswordForm && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPasswordForm(true)}
                    >
                      パスワード変更
                    </Button>
                  )}
                </HStack>

                {showPasswordForm && (
                  <form onSubmit={handlePasswordSubmit}>
                    <VStack gap={6} align="stretch">

                      <Field label="現在のパスワード" invalid={!!errors.currentPassword} errorText={errors.currentPassword}>
                        <Input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        />
                      </Field>

                      <Field label="新しいパスワード" invalid={!!errors.newPassword} errorText={errors.newPassword}>
                        <Input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        />
                      </Field>

                      <Field label="新しいパスワード（確認）" invalid={!!errors.confirmPassword} errorText={errors.confirmPassword}>
                        <Input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        />
                      </Field>

                      <HStack justify="space-between" pt={4}>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowPasswordForm(false)
                            setPasswordData({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: ''
                            })
                            setErrors({})
                          }}
                        >
                          キャンセル
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          isLoading={isLoading}
                        >
                          パスワードを変更
                        </Button>
                      </HStack>

                    </VStack>
                  </form>
                )}

                {!showPasswordForm && (
                  <VStack gap={4} align="stretch">
                    <Box
                      p={4}
                      bg="gray.50"
                      borderRadius="8px"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <HStack justify="space-between">
                        <VStack align="start" gap={1}>
                          <Text fontSize="sm" fontWeight="600" color="gray.800">
                            パスワード
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            最終変更: 2024年1月1日
                          </Text>
                        </VStack>
                        <Text fontSize="sm" color="gray.600">
                          ••••••••
                        </Text>
                      </HStack>
                    </Box>

                    <Box
                      p={4}
                      bg="gray.50"
                      borderRadius="8px"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <HStack justify="space-between">
                        <VStack align="start" gap={1}>
                          <Text fontSize="sm" fontWeight="600" color="gray.800">
                            二段階認証
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            追加のセキュリティ保護
                          </Text>
                        </VStack>
                        <Button variant="outline" size="sm">
                          有効にする
                        </Button>
                      </HStack>
                    </Box>
                  </VStack>
                )}
              </VStack>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="gray.800">
                  アカウント操作
                </Heading>

                <VStack gap={4} align="stretch">
                  <Box
                    p={4}
                    bg="red.50"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="red.200"
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" fontWeight="600" color="red.800">
                          アカウント削除
                        </Text>
                        <Text fontSize="xs" color="red.700">
                          すべてのデータが完全に削除されます
                        </Text>
                      </VStack>
                      <Button variant="danger" size="sm">
                        削除する
                      </Button>
                    </HStack>
                  </Box>

                  <Box
                    p={4}
                    bg="yellow.50"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="yellow.200"
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" fontWeight="600" color="yellow.800">
                          データのエクスポート
                        </Text>
                        <Text fontSize="xs" color="yellow.700">
                          個人データをダウンロード
                        </Text>
                      </VStack>
                      <Button variant="outline" size="sm">
                        エクスポート
                      </Button>
                    </HStack>
                  </Box>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

        </VStack>
      </Container>
    </MainLayout>
  )
}