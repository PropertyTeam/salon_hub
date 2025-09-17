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

export default function TermsPage() {
  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        <VStack gap={8} align="stretch">

          {/* Header */}
          <VStack gap={4} align="center" textAlign="center">
            <Heading size="xl" color="gray.800">
              利用規約
            </Heading>
            <Text color="gray.600" fontSize="lg">
              最終更新日: 2024年1月15日
            </Text>
          </VStack>

          <Box maxW="none" color="gray.700" lineHeight="tall">

            <VStack gap={6} align="stretch">

              <Box>
                <Text>
                  この利用規約（以下「本規約」）は、SalonHub株式会社（以下「当社」）が提供するサービス「SalonHub」（以下「本サービス」）の
                  利用条件を定めるものです。本サービスをご利用いただくお客様（以下「ユーザー」）には、本規約に同意いただく必要があります。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第1条（適用）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. 本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                  </Text>
                  <Text>
                    2. 当社は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下「個別規定」）をすることがあります。
                    これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                  </Text>
                  <Text>
                    3. 本規約の規定が前項の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り個別規定の規定が優先されるものとします。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第2条（利用登録）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. 本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
                    当社がこれを承認することによって、利用登録が完了するものとします。
                  </Text>
                  <Text>
                    2. 当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、
                    その理由については一切の開示義務を負わないものとします。
                  </Text>
                  <VStack align="start" gap={1} pl={6}>
                    <Text>• 利用登録の申請に際して虚偽の事項を届け出た場合</Text>
                    <Text>• 本規約に違反したことがある者からの申請である場合</Text>
                    <Text>• 未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていない場合</Text>
                    <Text>• その他、当社が利用登録を相当でないと判断した場合</Text>
                  </VStack>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第3条（ユーザーIDおよびパスワードの管理）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                  </Text>
                  <Text>
                    2. ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、
                    もしくは第三者と共用することはできません。
                  </Text>
                  <Text>
                    3. 当社は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、
                    そのユーザーIDを登録しているユーザー自身による利用とみなします。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第4条（料金および支払方法）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. ユーザーは、本サービスの利用に際して、当社または加盟店舗が別途定める利用料金を支払うものとします。
                  </Text>
                  <Text>
                    2. 利用料金の支払方法は、当社が指定する方法によるものとします。
                  </Text>
                  <Text>
                    3. ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14.6％の割合による遅延損害金を支払うものとします。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第5条（禁止事項）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                  </Text>
                  <VStack align="start" gap={1} pl={6}>
                    <Text>• 法令または公序良俗に違反する行為</Text>
                    <Text>• 犯罪行為に関連する行為</Text>
                    <Text>• 本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</Text>
                    <Text>• 当社、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</Text>
                    <Text>• 本サービスによって得られた情報を商業的に利用する行為</Text>
                    <Text>• 当社のサービスの運営を妨害するおそれのある行為</Text>
                    <Text>• 不正アクセスをし、またはこれを試みる行為</Text>
                    <Text>• 他のユーザーに関する個人情報等を収集または蓄積する行為</Text>
                    <Text>• 不正な目的を持って本サービスを利用する行為</Text>
                    <Text>• 本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</Text>
                    <Text>• その他当社が不適切と判断する行為</Text>
                  </VStack>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第6条（本サービスの提供の停止等）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. 当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                  </Text>
                  <VStack align="start" gap={1} pl={6}>
                    <Text>• 本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</Text>
                    <Text>• 地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</Text>
                    <Text>• コンピュータまたは通信回線等が事故により停止した場合</Text>
                    <Text>• その他、当社が本サービスの提供が困難と判断した場合</Text>
                  </VStack>
                  <Text>
                    2. 当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、
                    一切の責任を負わないものとします。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第7条（著作権）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報に関してのみ、
                    本サービスを利用し、投稿ないしアップロードすることができるものとします。
                  </Text>
                  <Text>
                    2. ユーザーが本サービスを利用して投稿ないしアップロードした文章、画像、映像等の著作権については、
                    当該ユーザーその他既存の権利者に留保されるものとします。
                  </Text>
                  <Text>
                    3. 前項の定めに関わらず、当社は、本サービスを利用してユーザーが投稿ないしアップロードした文章、画像、映像等について、
                    本サービスの改良、品質の向上、または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で利用できるものとし、
                    ユーザーは、この利用に関して、著作者人格権を行使しないものとします。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第8条（利用制限および登録抹消）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. 当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿データを削除し、
                    ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
                  </Text>
                  <VStack align="start" gap={1} pl={6}>
                    <Text>• 本規約のいずれかの条項に違反した場合</Text>
                    <Text>• 登録事項に虚偽の事実があることが判明した場合</Text>
                    <Text>• 料金等の支払債務の不履行があった場合</Text>
                    <Text>• 当社からの連絡に対し、一定期間返答がない場合</Text>
                    <Text>• 本サービスについて、最後の利用から一定期間利用がない場合</Text>
                    <Text>• その他、当社が本サービスの利用を適当でないと判断した場合</Text>
                  </VStack>
                  <Text>
                    2. 当社は、本条に基づき当社が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第9条（退会）
                </Heading>
                <Text>
                  ユーザーは、当社の定める退会手続により、本サービスから退会できるものとします。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第10条（保証の否認および免責事項）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. 当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、
                    特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）が
                    ないことを明示的にも黙示的にも保証しておりません。
                  </Text>
                  <Text>
                    2. 当社は、本サービスに起因してユーザーに生じたあらゆる損害について、
                    当社の故意又は重過失による場合を除き、一切の責任を負いません。
                  </Text>
                  <Text>
                    3. 前項ただし書に定める場合であっても、当社は、過失（重過失を除きます。）による場合には、
                    損害の種類を問わず、ユーザーに生じた損害の全部について責任を負うものではありません。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第11条（サービス内容の変更等）
                </Heading>
                <Text>
                  当社は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、
                  ユーザーはこれに同意するものとします。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第12条（利用規約の変更）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. 当社は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
                  </Text>
                  <VStack align="start" gap={1} pl={6}>
                    <Text>• 本規約の変更がユーザーの一般の利益に適合するとき。</Text>
                    <Text>• 本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。</Text>
                  </VStack>
                  <Text>
                    2. 当社はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知いたします。
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第13条（個人情報の取扱い）
                </Heading>
                <Text>
                  当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第14条（通知または連絡）
                </Heading>
                <Text>
                  ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。
                  当社は、ユーザーから、当社が別途定める方式に従った変更届け出がない限り、
                  現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、
                  これらは、発信時にユーザーへ到達したものとみなします。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第15条（権利義務の譲渡の禁止）
                </Heading>
                <Text>
                  ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、
                  または担保に供することはできません。
                </Text>
              </Box>

              <Box>
                <Heading size="md" color="gray.800" mb={4}>
                  第16条（準拠法・裁判管轄）
                </Heading>
                <VStack align="start" gap={3}>
                  <Text>
                    1. 本規約の解釈にあたっては、日本法を準拠法とします。
                  </Text>
                  <Text>
                    2. 本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
                  </Text>
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