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
  SimpleGrid
} from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/checkbox'
import { Alert } from '@chakra-ui/alert'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function NotificationsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [settings, setSettings] = useState({
    email: {
      reservationConfirmation: true,
      reservationReminder: true,
      reservationChanges: true,
      promotions: false,
      newsletter: true,
      systemUpdates: false
    },
    push: {
      reservationConfirmation: true,
      reservationReminder: true,
      reservationChanges: true,
      promotions: false,
      chatMessages: true,
      systemUpdates: false
    },
    sms: {
      reservationConfirmation: false,
      reservationReminder: true,
      reservationChanges: true,
      emergencyOnly: true
    }
  })

  const handleSettingChange = (category: keyof typeof settings, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const notificationTypes = {
    email: {
      title: 'メール通知',
      description: 'メールアドレスに通知を送信',
      icon: '📧',
      color: 'blue'
    },
    push: {
      title: 'プッシュ通知',
      description: 'ブラウザ・アプリに通知を表示',
      icon: '🔔',
      color: 'green'
    },
    sms: {
      title: 'SMS通知',
      description: '携帯電話に短メッセージを送信',
      icon: '📱',
      color: 'purple'
    }
  }

  const settingsConfig = {
    reservationConfirmation: {
      label: '予約確認',
      description: '予約が確定した際の通知'
    },
    reservationReminder: {
      label: '予約リマインダー',
      description: '予約日の前日・当日の通知'
    },
    reservationChanges: {
      label: '予約変更・キャンセル',
      description: '予約の変更やキャンセル時の通知'
    },
    promotions: {
      label: 'プロモーション',
      description: '特別オファーやクーポン情報'
    },
    newsletter: {
      label: 'ニュースレター',
      description: '新機能やサロン情報のお知らせ'
    },
    systemUpdates: {
      label: 'システム更新',
      description: 'メンテナンスやアップデート情報'
    },
    chatMessages: {
      label: 'チャットメッセージ',
      description: 'サロンからのメッセージ'
    },
    emergencyOnly: {
      label: '緊急時のみ',
      description: '重要な変更や緊急事態のみ'
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
              通知設定
            </Heading>
            <Text color="gray.600">
              通知の受信方法と内容をカスタマイズできます
            </Text>
          </VStack>

          {/* Success Alert */}
          {showSuccess && (
            <Alert status="success" borderRadius="12px">
              通知設定を更新しました
            </Alert>
          )}

          {/* Quick Settings */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="gray.800">
                  クイック設定
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev,
                        email: Object.keys(prev.email).reduce((acc, key) => ({
                          ...acc,
                          [key]: true
                        }), {} as any),
                        push: Object.keys(prev.push).reduce((acc, key) => ({
                          ...acc,
                          [key]: true
                        }), {} as any),
                        sms: Object.keys(prev.sms).reduce((acc, key) => ({
                          ...acc,
                          [key]: true
                        }), {} as any)
                      }))
                    }}
                  >
                    すべて有効
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, promotions: false, newsletter: false, systemUpdates: false },
                        push: { ...prev.push, promotions: false, systemUpdates: false },
                        sms: { ...prev.sms, reservationConfirmation: false, emergencyOnly: true }
                      }))
                    }}
                  >
                    必要最小限
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev,
                        email: Object.keys(prev.email).reduce((acc, key) => ({
                          ...acc,
                          [key]: false
                        }), {} as any),
                        push: Object.keys(prev.push).reduce((acc, key) => ({
                          ...acc,
                          [key]: false
                        }), {} as any),
                        sms: Object.keys(prev.sms).reduce((acc, key) => ({
                          ...acc,
                          [key]: false
                        }), {} as any)
                      }))
                    }}
                  >
                    すべて無効
                  </Button>
                </SimpleGrid>
              </VStack>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          {Object.entries(notificationTypes).map(([type, config]) => (
            <Card key={type}>
              <CardContent p={8}>
                <VStack gap={6} align="stretch">
                  <HStack gap={4}>
                    <Box
                      w={12}
                      h={12}
                      bg={`${config.color}.100`}
                      borderRadius="12px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xl"
                    >
                      {config.icon}
                    </Box>
                    <VStack align="start" gap={1}>
                      <Heading size="md" color="gray.800">
                        {config.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        {config.description}
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack gap={4} align="stretch">
                    {Object.entries(settings[type as keyof typeof settings]).map(([setting, enabled]) => {
                      const settingConfig = settingsConfig[setting as keyof typeof settingsConfig]
                      if (!settingConfig) return null

                      return (
                        <HStack key={setting} justify="space-between" align="center">
                          <VStack align="start" gap={1} flex="1">
                            <Text fontWeight="600" color="gray.800">
                              {settingConfig.label}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {settingConfig.description}
                            </Text>
                          </VStack>
                          <Checkbox
                            size="lg"
                            isChecked={enabled as boolean}
                            onChange={(e) => handleSettingChange(
                              type as keyof typeof settings,
                              setting,
                              e.target.checked
                            )}
                          />
                        </HStack>
                      )
                    })}
                  </VStack>
                </VStack>
              </CardContent>
            </Card>
          ))}

          {/* Notification Schedule */}
          <Card>
            <CardContent p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="gray.800">
                  通知スケジュール
                </Heading>

                <VStack gap={4} align="stretch">
                  <HStack justify="space-between" align="center">
                    <VStack align="start" gap={1}>
                      <Text fontWeight="600" color="gray.800">
                        マナーモード（22:00-8:00）
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        夜間はプッシュ通知を停止
                      </Text>
                    </VStack>
                    <Checkbox size="lg" defaultChecked colorScheme="blue" />
                  </HStack>

                  <HStack justify="space-between" align="center">
                    <VStack align="start" gap={1}>
                      <Text fontWeight="600" color="gray.800">
                        週末の通知制限
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        土日はプロモーション通知を停止
                      </Text>
                    </VStack>
                    <Checkbox size="lg" defaultChecked colorScheme="blue" />
                  </HStack>

                  <HStack justify="space-between" align="center">
                    <VStack align="start" gap={1}>
                      <Text fontWeight="600" color="gray.800">
                        通知頻度制限
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        同じ種類の通知は1日1回まで
                      </Text>
                    </VStack>
                    <Checkbox size="lg" defaultChecked colorScheme="blue" />
                  </HStack>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Information */}
          <Box
            bg="yellow.50"
            border="1px solid"
            borderColor="yellow.200"
            borderRadius="12px"
            p={6}
          >
            <VStack gap={4} align="start">
              <HStack gap={3}>
                <Text fontSize="xl">💡</Text>
                <Heading size="sm" color="yellow.800">
                  通知設定について
                </Heading>
              </HStack>
              <VStack gap={2} align="start">
                <Text fontSize="sm" color="yellow.700">
                  • 予約に関する重要な通知は設定に関わらず送信される場合があります
                </Text>
                <Text fontSize="sm" color="yellow.700">
                  • SMS通知には通信料金が発生する場合があります
                </Text>
                <Text fontSize="sm" color="yellow.700">
                  • ブラウザのプッシュ通知を有効にしている場合のみプッシュ通知が届きます
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Save Button */}
          <HStack justify="center" pt={4}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSaveSettings}
              isLoading={isLoading}
            >
              設定を保存
            </Button>
          </HStack>

        </VStack>
      </Container>
    </MainLayout>
  )
}