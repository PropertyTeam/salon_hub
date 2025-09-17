'use client'

import {
  Box,
  Container,
  VStack,
  Text,
  Heading
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/layout'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function PrivacyPage() {
  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={4} align="center" textAlign="center">
            <Heading size="xl" color="gray.800">
              プライバシーポリシー
            </Heading>
            <Text color="gray.600" fontSize="lg">
              最終更新日: 2024年1月15日
            </Text>
          </VStack>

          <Box maxW="none" color="gray.700" lineHeight="tall">

            <VStack gap={6} align="stretch">

              <Box>
                <Text>
                  SalonHub（以下「当社」）は、ユーザーの皆様（以下「ユーザー」）の個人情報の保護を重要視し、
                  個人情報の保護に関する法律、その他の関係法令等を遵守し、適切に取り扱うことをお約束いたします。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  1. 個人情報の定義
                </Heading>
                <Text>
                  本プライバシーポリシーにおいて「個人情報」とは、個人情報の保護に関する法律第2条第1項に規定される個人情報、
                  すなわち生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
                  特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含む）をいいます。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  2. 収集する個人情報
                </Heading>
                <Text mb={3}>
                  当社は、以下の個人情報を収集いたします：
                </Text>
                <VStack align="start" gap={2} pl={6}>
                  <Text>• 氏名、メールアドレス、電話番号、住所等の基本情報</Text>
                  <Text>• 予約履歴、利用履歴、決済情報</Text>
                  <Text>• サービス利用時のアクセスログ、Cookie情報</Text>
                  <Text>• お問い合わせ内容、カスタマーサポートとの通信記録</Text>
                  <Text>• その他サービス提供に必要な情報</Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  3. 個人情報の利用目的
                </Heading>
                <Text mb={3}>
                  当社は、収集した個人情報を以下の目的で利用いたします：
                </Text>
                <VStack align="start" gap={2} pl={6}>
                  <Text>• サービスの提供、運営、保守、サポート</Text>
                  <Text>• ユーザー認証、本人確認</Text>
                  <Text>• 予約管理、決済処理</Text>
                  <Text>• カスタマーサポート、お問い合わせ対応</Text>
                  <Text>• サービス改善のための分析、統計データの作成</Text>
                  <Text>• キャンペーン、特典、新サービスのご案内</Text>
                  <Text>• 法令に基づく対応</Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  4. 個人情報の第三者提供
                </Heading>
                <Text mb={3}>
                  当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供いたしません：
                </Text>
                <VStack align="start" gap={2} pl={6}>
                  <Text>• ユーザーの同意がある場合</Text>
                  <Text>• 法令に基づく場合</Text>
                  <Text>• 人の生命、身体または財産の保護のために必要がある場合</Text>
                  <Text>• サービス提供に必要な範囲で業務委託先に提供する場合</Text>
                  <Text>• 事業承継等により個人情報が移転される場合</Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  5. 個人情報の安全管理
                </Heading>
                <Text>
                  当社は、個人情報の漏洩、滅失、毀損等を防止するため、必要かつ適切な安全管理措置を講じます。
                  また、個人情報を取り扱う従業員に対して、必要かつ適切な監督を行います。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  6. 個人情報の開示・訂正・削除
                </Heading>
                <Text>
                  ユーザーは、当社が保有する自己の個人情報について、開示、訂正、利用停止、削除等を求めることができます。
                  これらの請求については、当社所定の方法により受け付けます。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  7. Cookie等の取り扱い
                </Heading>
                <Text>
                  当社のサービスでは、ユーザーの利便性向上およびサービス改善のため、Cookie等の技術を使用しています。
                  ユーザーはブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  8. アクセス解析ツール
                </Heading>
                <Text>
                  当社では、サービス改善のためGoogle Analytics等のアクセス解析ツールを使用しています。
                  これらのツールは匿名化された情報を収集しており、個人を特定するものではありません。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  9. 未成年者の個人情報
                </Heading>
                <Text>
                  当社は、保護者の同意なく未成年者から個人情報を収集することはありません。
                  未成年者がサービスを利用する場合は、事前に保護者の同意を得てください。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  10. 個人情報の保存期間
                </Heading>
                <Text>
                  当社は、個人情報を利用目的の達成に必要な期間に限り保存し、目的達成後は遅滞なく削除いたします。
                  ただし、法令により保存が義務付けられている場合は、その期間に従います。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  11. プライバシーポリシーの変更
                </Heading>
                <Text>
                  当社は、本プライバシーポリシーを変更する場合があります。
                  重要な変更については、サービス内での通知やメールでお知らせいたします。
                  変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じます。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  12. お問い合わせ
                </Heading>
                <Text mb={3}>
                  個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：
                </Text>
                <VStack align="start" gap={2} pl={6}>
                  <Text>SalonHub カスタマーサポート</Text>
                  <Text>メール: privacy@salonhub.jp</Text>
                  <Text>電話: 0120-123-456</Text>
                  <Text>受付時間: 平日 9:00-18:00</Text>
                </VStack>
              </Box>

              <Divider />

              <Box textAlign="center" py={4}>
                <Text fontSize="sm" color="gray.600">
                  制定日: 2023年4月1日<br />
                  最終改訂日: 2024年1月15日<br />
                  SalonHub株式会社
                </Text>
              </Box>

            </VStack>

          </Box>

        </VStack>
      </Container>
    </MainLayout>
  )
}