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
  Badge
} from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/accordion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import Link from 'next/link'

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const quickActions = [
    {
      title: '電話サポート',
      description: '0120-123-456（9:00-18:00）',
      icon: '📞',
      action: '電話をかける'
    },
    {
      title: 'お問い合わせ',
      description: '24時間受付フォーム',
      icon: '📧',
      action: 'フォームへ'
    }
  ]

  const faqData = [
    {
      category: '予約',
      question: '予約をキャンセルしたい',
      answer: 'マイページの「予約管理」から該当する予約を選択し、「キャンセル」ボタンをクリックしてください。前日20時以降のキャンセルは手数料が発生する場合があります。'
    },
    {
      category: '予約',
      question: '予約の変更はできますか？',
      answer: '予約日時の24時間前まで変更可能です。マイページの予約詳細から「変更」ボタンをクリックしてください。'
    },
    {
      category: '予約',
      question: '遅刻しそうな場合は？',
      answer: '必ず店舗に直接お電話でご連絡ください。大幅な遅刻の場合、予約をキャンセルさせていただく場合があります。'
    },
    {
      category: '支払い',
      question: '利用可能な支払い方法は？',
      answer: 'クレジットカード、デビットカード、電子マネー（一部店舗）をご利用いただけます。'
    },
    {
      category: '支払い',
      question: '返金はいつ頃される？',
      answer: 'クレジットカードの場合は1-2週間、デビットカードの場合は3-5営業日でご返金いたします。'
    },
    {
      category: 'アカウント',
      question: 'パスワードを忘れた',
      answer: 'ログイン画面の「パスワードを忘れた方」をクリックし、メールアドレスを入力してください。リセット用メールが送信されます。'
    },
    {
      category: 'その他',
      question: 'アプリが動作しない',
      answer: 'アプリを再起動してください。解決しない場合は最新版にアップデートするか、端末を再起動してお試しください。'
    }
  ]

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        <VStack gap={10} align="stretch">

          {/* Header */}
          <VStack gap={4} textAlign="center">
            <Heading size="xl" color="gray.900" fontWeight="bold">
              ヘルプ
            </Heading>
            <Text color="gray.600" fontSize="lg">
              よくある質問や困ったときのサポート情報
            </Text>
          </VStack>

          {/* Search */}
          <Box maxW="500px" mx="auto" w="full">
            <InputGroup>
              <InputLeftElement>
                <Text>🔍</Text>
              </InputLeftElement>
              <Input
                placeholder="質問を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="lg"
                bg="gray.50"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                _focus={{
                  borderColor: "primary.500",
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                  bg: "white"
                }}
              />
            </InputGroup>
          </Box>

          {/* Quick Actions */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {quickActions.map((action, index) => (
              <Card key={index} variant="outline">
                <CardContent p={6}>
                  <HStack gap={4}>
                    <Box
                      w={12}
                      h={12}
                      bg="primary.50"
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="2xl"
                    >
                      {action.icon}
                    </Box>
                    <VStack align="start" gap={1} flex="1">
                      <Heading size="sm" color="gray.900">
                        {action.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        {action.description}
                      </Text>
                    </VStack>
                    <Button variant="outline" size="sm">
                      {action.action}
                    </Button>
                  </HStack>
                </CardContent>
              </Card>
            ))}
          </SimpleGrid>

          {/* FAQ Section */}
          <VStack gap={4} align="stretch">
            <Heading size="lg" color="gray.900" fontWeight="semibold">
              {searchTerm ? `検索結果 (${filteredFAQ.length}件)` : 'よくある質問'}
            </Heading>

            {filteredFAQ.length === 0 ? (
              <Box textAlign="center" py={12}>
                <VStack gap={3}>
                  <Text fontSize="4xl">🔍</Text>
                  <Heading size="md" color="gray.600">
                    該当する質問が見つかりません
                  </Heading>
                  <Text color="gray.500">
                    検索条件を変更するか、お問い合わせください
                  </Text>
                  <Button variant="outline" onClick={() => setSearchTerm('')}>
                    検索をクリア
                  </Button>
                </VStack>
              </Box>
            ) : (
              <Accordion allowToggle>
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} border="1px solid" borderColor="gray.200" borderRadius="lg" mb={3}>
                    <AccordionButton p={4} _hover={{ bg: 'gray.50' }}>
                      <Box flex="1" textAlign="left">
                        <HStack gap={3} align="center">
                          <Badge
                            bg="primary.50"
                            color="primary.700"
                            px={2}
                            py={1}
                            borderRadius="md"
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            {item.category}
                          </Badge>
                          <Text fontWeight="medium" color="gray.900">
                            {item.question}
                          </Text>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} px={4}>
                      <Text color="gray.700" lineHeight="1.6">
                        {item.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </VStack>

          {/* Contact Section */}
          <Box
            bg="primary.50"
            borderRadius="lg"
            p={6}
            textAlign="center"
          >
            <VStack gap={3}>
              <Heading size="md" color="gray.900">
                解決しない場合は
              </Heading>
              <Text color="gray.600">
                お気軽にお問い合わせください
              </Text>
              <Link href="/contact">
                <Button variant="primary">
                  お問い合わせ
                </Button>
              </Link>
            </VStack>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}