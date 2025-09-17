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

  const categories = [
    {
      title: '予約について',
      icon: '📅',
      color: 'blue',
      count: 8,
      description: '予約の取り方、変更、キャンセルなど'
    },
    {
      title: '支払いについて',
      icon: '💳',
      color: 'green',
      count: 6,
      description: '料金、決済方法、返金について'
    },
    {
      title: 'アカウント',
      icon: '👤',
      color: 'purple',
      count: 5,
      description: '登録、ログイン、設定変更など'
    },
    {
      title: 'サービス利用',
      icon: '✂️',
      color: 'orange',
      count: 7,
      description: 'サロンの探し方、メニューについて'
    },
    {
      title: 'トラブル',
      icon: '🔧',
      color: 'red',
      count: 4,
      description: 'エラー、不具合の対処方法'
    },
    {
      title: 'その他',
      icon: '❓',
      color: 'gray',
      count: 3,
      description: 'その他のご質問'
    }
  ]

  const faqData = [
    {
      category: '予約について',
      question: '予約をキャンセルしたいのですが、どうすればいいですか？',
      answer: 'マイページの「予約管理」から該当する予約を選択し、「キャンセル」ボタンをクリックしてください。ただし、キャンセルポリシーにより、前日20時以降のキャンセルは手数料が発生する場合があります。'
    },
    {
      category: '予約について',
      question: '予約の変更はできますか？',
      answer: '予約日時の24時間前まで変更可能です。マイページの予約詳細から「変更」ボタンをクリックして、新しい日時を選択してください。'
    },
    {
      category: '予約について',
      question: '遅刻しそうな場合はどうすればいいですか？',
      answer: '必ず店舗に直接お電話でご連絡ください。大幅な遅刻の場合、予約をキャンセルさせていただく場合があります。'
    },
    {
      category: '支払いについて',
      question: '利用可能な支払い方法を教えてください',
      answer: 'クレジットカード（Visa、Mastercard、JCB、American Express）、デビットカード、電子マネー（一部店舗）をご利用いただけます。'
    },
    {
      category: '支払いについて',
      question: '返金はいつ頃されますか？',
      answer: 'キャンセル処理後、クレジットカードの場合は1-2週間、デビットカードの場合は3-5営業日でご返金いたします。'
    },
    {
      category: 'アカウント',
      question: 'パスワードを忘れてしまいました',
      answer: 'ログイン画面の「パスワードを忘れた方」をクリックし、登録されているメールアドレスを入力してください。パスワードリセット用のメールが送信されます。'
    },
    {
      category: 'アカウント',
      question: 'アカウントを削除したいのですが',
      answer: 'マイページの「アカウント情報」から「アカウント削除」を選択してください。削除すると全ての情報が失われますのでご注意ください。'
    },
    {
      category: 'サービス利用',
      question: 'サロンの口コミは信頼できますか？',
      answer: '口コミは実際にサービスを利用されたお客様のみが投稿できる仕組みになっています。不適切な内容は運営側で確認・削除しています。'
    },
    {
      category: 'トラブル',
      question: 'アプリが正常に動作しません',
      answer: 'まずはアプリを再起動してください。それでも解決しない場合は、最新版にアップデートするか、端末を再起動してお試しください。'
    }
  ]

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <MainLayout>
      <Container maxW="6xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={6} align="center" textAlign="center">
            <Heading size="xl" color="gray.800">
              ヘルプ・よくある質問
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="2xl">
              サービスの使い方や疑問について、よくある質問をまとめました。
              解決しない場合はお気軽にお問い合わせください。
            </Text>

            {/* Search */}
            <InputGroup maxW="500px">
              <InputLeftElement>
                <Text>🔍</Text>
              </InputLeftElement>
              <Input
                placeholder="質問を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="lg"
              />
            </InputGroup>
          </VStack>

          {/* Quick Actions */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            <Card>
              <CardContent p={6} textAlign="center">
                <VStack gap={4}>
                  <Box
                    w={16}
                    h={16}
                    bg="blue.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="3xl">📞</Text>
                  </Box>
                  <VStack gap={2}>
                    <Heading size="md" color="gray.800">
                      電話サポート
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      0120-123-456<br />
                      9:00-18:00（年中無休）
                    </Text>
                  </VStack>
                  <Button variant="outline" size="sm">
                    電話をかける
                  </Button>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={6} textAlign="center">
                <VStack gap={4}>
                  <Box
                    w={16}
                    h={16}
                    bg="green.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="3xl">💬</Text>
                  </Box>
                  <VStack gap={2}>
                    <Heading size="md" color="gray.800">
                      チャットサポート
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      平日 10:00-17:00<br />
                      リアルタイムでご相談
                    </Text>
                  </VStack>
                  <Button variant="outline" size="sm">
                    チャットを開始
                  </Button>
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardContent p={6} textAlign="center">
                <VStack gap={4}>
                  <Box
                    w={16}
                    h={16}
                    bg="purple.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="3xl">📧</Text>
                  </Box>
                  <VStack gap={2}>
                    <Heading size="md" color="gray.800">
                      お問い合わせフォーム
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      24時間受付<br />
                      詳細なご質問はこちら
                    </Text>
                  </VStack>
                  <Link href="/contact">
                    <Button variant="outline" size="sm">
                      フォームへ
                    </Button>
                  </Link>
                </VStack>
              </CardContent>
            </Card>
          </SimpleGrid>

          {/* FAQ Categories */}
          {!searchTerm && (
            <VStack gap={6} align="stretch">
              <Heading size="lg" color="gray.800">
                カテゴリから探す
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {categories.map((category) => (
                  <Card
                    key={category.title}
                    _hover={{
                      transform: 'translateY(-2px)',
                      shadow: 'lg'
                    }}
                    transition="all 0.2s ease"
                    cursor="pointer"
                  >
                    <CardContent p={6}>
                      <HStack gap={4}>
                        <Box
                          w={12}
                          h={12}
                          bg={`${category.color}.100`}
                          borderRadius="12px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xl"
                        >
                          {category.icon}
                        </Box>
                        <VStack align="start" gap={1} flex="1">
                          <HStack gap={2}>
                            <Text fontWeight="600" color="gray.800">
                              {category.title}
                            </Text>
                            <Badge bg={`${category.color}.500`} color="white" borderRadius="full">
                              {category.count}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {category.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </CardContent>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          )}

          {/* FAQ Section */}
          <VStack gap={6} align="stretch">
            <HStack justify="space-between" align="center">
              <Heading size="lg" color="gray.800">
                {searchTerm ? `検索結果 (${filteredFAQ.length}件)` : 'よくある質問'}
              </Heading>
              {searchTerm && (
                <Button variant="ghost" onClick={() => setSearchTerm('')}>
                  検索をクリア
                </Button>
              )}
            </HStack>

            {filteredFAQ.length === 0 ? (
              <Card>
                <CardContent p={12} textAlign="center">
                  <VStack gap={4}>
                    <Text fontSize="5xl">🔍</Text>
                    <Heading size="md" color="gray.600">
                      該当する質問が見つかりません
                    </Heading>
                    <Text color="gray.500">
                      検索条件を変更するか、お問い合わせフォームからご連絡ください
                    </Text>
                    <HStack gap={3}>
                      <Button variant="outline" onClick={() => setSearchTerm('')}>
                        検索をクリア
                      </Button>
                      <Link href="/contact">
                        <Button variant="primary">
                          お問い合わせ
                        </Button>
                      </Link>
                    </HStack>
                  </VStack>
                </CardContent>
              </Card>
            ) : (
              <Accordion allowToggle>
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} border="1px solid" borderColor="gray.200" borderRadius="12px" mb={4}>
                    <AccordionButton p={6} _hover={{ bg: 'gray.50' }}>
                      <Box flex="1" textAlign="left">
                        <VStack align="start" gap={2}>
                          <HStack gap={2}>
                            <Badge bg="blue.500" color="white" px={2} py={1} borderRadius="full" fontSize="xs">
                              {item.category}
                            </Badge>
                          </HStack>
                          <Text fontWeight="600" color="gray.800">
                            {item.question}
                          </Text>
                        </VStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={6} px={6}>
                      <Text color="gray.700" lineHeight="tall">
                        {item.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </VStack>

          {/* Additional Help */}
          <Box
            bg="gradient.primary"
            borderRadius="16px"
            p={8}
            color="white"
            textAlign="center"
          >
            <VStack gap={4}>
              <Heading size="lg">
                まだ解決しませんか？
              </Heading>
              <Text opacity={0.9}>
                カスタマーサポートチームが24時間以内にお答えします
              </Text>
              <HStack gap={4}>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    お問い合わせ
                  </Button>
                </Link>
                <Button variant="outline" size="lg" bg="transparent" borderColor="white" color="white">
                  電話サポート
                </Button>
              </HStack>
            </VStack>
          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}