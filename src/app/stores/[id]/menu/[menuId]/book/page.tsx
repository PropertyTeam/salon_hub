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
  SimpleGrid,
  Textarea,
  Badge,
  Image
} from '@chakra-ui/react'
import { Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepSeparator } from '@chakra-ui/stepper'
import {
  Field
} from '@/components/forms/field'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { MainLayout } from '@/components/layouts/MainLayout'
import { mockStores, mockMenus, mockStaff, mockUsers } from '../../../../../../../data/mockData'

export default function BookMenuPage({ params }: { params: { id: string, menuId: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedStaff, setSelectedStaff] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const store = mockStores.find(s => s.id === params.id)
  const menu = mockMenus.find(m => m.id === params.menuId)
  const staffMembers = mockStaff.filter(s => s.storeId === params.id)
  const currentUser = mockUsers[0]

  if (!store || !menu) {
    return <div>Store or menu not found</div>
  }

  const steps = [
    { title: '日時選択' },
    { title: 'スタッフ選択' },
    { title: '確認' }
  ]

  // Generate available dates (next 30 days)
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date
  })

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ]

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    }).format(date)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 0) {
      if (!selectedDate) newErrors.date = '日付を選択してください'
      if (!selectedTime) newErrors.time = '時間を選択してください'
    }

    if (currentStep === 1) {
      if (!selectedStaff) newErrors.staff = 'スタッフを選択してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleBooking()
      }
    }
  }

  const handleBooking = () => {
    // Simulate booking creation
    router.push(`/booking/confirmation?storeId=${params.id}&menuId=${params.menuId}`)
  }

  const renderDateTimeSelection = () => (
    <VStack gap={6} align="stretch">
      <VStack gap={4} align="stretch">
        <Heading size="md" color="gray.800">
          希望日時を選択してください
        </Heading>

        {/* Date Selection */}
        <VStack align="stretch" gap={3}>
          <Text fontWeight="500" color="gray.700">希望日</Text>
          <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} gap={3}>
            {availableDates.slice(0, 12).map((date) => {
              const dateStr = date.toISOString().split('T')[0]
              const isSelected = selectedDate === dateStr

              return (
                <Button
                  key={dateStr}
                  variant={isSelected ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <VStack gap={1}>
                    <Text fontSize="xs">
                      {date.getMonth() + 1}/{date.getDate()}
                    </Text>
                    <Text fontSize="xs">
                      ({formatDate(date).split(' ')[1]})
                    </Text>
                  </VStack>
                </Button>
              )
            })}
          </SimpleGrid>
          {errors.date && (
            <Text fontSize="sm" color="red.500">{errors.date}</Text>
          )}
        </VStack>

        {/* Time Selection */}
        <VStack align="stretch" gap={3}>
          <Text fontWeight="500" color="gray.700">希望時間</Text>
          <SimpleGrid columns={{ base: 3, md: 6, lg: 8 }} gap={2}>
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time
              const isAvailable = Math.random() > 0.3 // Simulate availability

              return (
                <Button
                  key={time}
                  variant={isSelected ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  disabled={!isAvailable}
                >
                  {time}
                </Button>
              )
            })}
          </SimpleGrid>
          {errors.time && (
            <Text fontSize="sm" color="red.500">{errors.time}</Text>
          )}
        </VStack>
      </VStack>
    </VStack>
  )

  const renderStaffSelection = () => (
    <VStack gap={6} align="stretch">
      <VStack gap={4} align="stretch">
        <Heading size="md" color="gray.800">
          担当スタッフを選択してください
        </Heading>

        <VStack align="stretch" gap={3}>
          <VStack gap={4} align="stretch">
            <Button
              variant={selectedStaff === 'any' ? "primary" : "outline"}
              size="lg"
              onClick={() => setSelectedStaff('any')}
            >
              <HStack gap={4}>
                <Box
                  w={12}
                  h={12}
                  bg="gray.200"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="xl">👤</Text>
                </Box>
                <VStack align="start" gap={1}>
                  <Text fontWeight="600">おまかせ</Text>
                  <Text fontSize="sm" color="gray.600">
                    空いているスタッフが担当します
                  </Text>
                </VStack>
              </HStack>
            </Button>

            {staffMembers.map((staff) => (
              <Button
                key={staff.id}
                variant={selectedStaff === staff.id ? "primary" : "outline"}
                size="lg"
                onClick={() => setSelectedStaff(staff.id)}
              >
                <HStack gap={4}>
                  <Box
                    w={12}
                    h={12}
                    borderRadius="full"
                    bg="blue.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="lg"
                    fontWeight="600"
                    color="white"
                  >
                    {staff.name?.[0] || '👤'}
                  </Box>
                  <VStack align="start" gap={1}>
                    <HStack gap={2}>
                      <Text fontWeight="600">{staff.name}</Text>
                      <Badge bg="blue.500" color="white" px={2} py={1} borderRadius="full">
                        {staff.experience || 0}年目
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      {staff.specialties?.join(', ') || '専門分野なし'}
                    </Text>
                  </VStack>
                </HStack>
              </Button>
            ))}
          </VStack>
          {errors.staff && (
            <Text fontSize="sm" color="red.500">{errors.staff}</Text>
          )}
        </VStack>
      </VStack>
    </VStack>
  )

  const renderConfirmation = () => {
    const selectedStaffMember = staffMembers.find(s => s.id === selectedStaff)
    const bookingDate = selectedDate ? new Date(selectedDate) : null

    return (
      <VStack gap={6} align="stretch">
        <Heading size="md" color="gray.800">
          予約内容を確認してください
        </Heading>

        <Card>
          <CardContent p={6}>
            <VStack gap={4} align="stretch">
              <HStack gap={4}>
                <Image
                  src={store.images?.[0] || '/placeholder-store.jpg'}
                  alt={store.name}
                  w={16}
                  h={16}
                  objectFit="cover"
                  borderRadius="12px"
                />
                <VStack align="start" gap={2}>
                  <Text fontWeight="600" color="gray.800" fontSize="lg">
                    {store.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {store.address}
                  </Text>
                </VStack>
              </HStack>

              <Box h="1px" bg="gray.200" />

              <VStack gap={3} align="stretch">
                <HStack justify="space-between">
                  <Text color="gray.600">メニュー</Text>
                  <Text fontWeight="600">{menu.name}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.600">料金</Text>
                  <Text fontWeight="600" color="blue.600">
                    {formatPrice(menu.price)}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.600">所要時間</Text>
                  <Text fontWeight="600">{menu.duration}分</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.600">日時</Text>
                  <Text fontWeight="600">
                    {bookingDate && formatDate(bookingDate)} {selectedTime}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.600">担当スタッフ</Text>
                  <Text fontWeight="600">
                    {selectedStaff === 'any' ? 'おまかせ' : selectedStaffMember?.name}
                  </Text>
                </HStack>
              </VStack>

              {notes && (
                <>
                  <Box h="1px" bg="gray.200" />
                  <VStack align="start" gap={2}>
                    <Text color="gray.600">備考</Text>
                    <Text fontSize="sm">{notes}</Text>
                  </VStack>
                </>
              )}
            </VStack>
          </CardContent>
        </Card>

        <Field label="備考・要望（任意）">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="特別な要望やアレルギーなどがございましたらご記入ください"
            rows={3}
          />
        </Field>
      </VStack>
    )
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
              予約手続き
            </Heading>
            <Text color="gray.600">
              {menu.name} の予約を進めます
            </Text>
          </VStack>

          {/* Progress Stepper */}
          <Stepper index={currentStep} colorScheme="blue">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink={0}>
                  <StepTitle>{step.title}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Card>
            <CardContent p={8}>
              {currentStep === 0 && renderDateTimeSelection()}
              {currentStep === 1 && renderStaffSelection()}
              {currentStep === 2 && renderConfirmation()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <HStack justify="space-between">
            <Button
              variant="ghost"
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1)
                } else {
                  router.back()
                }
              }}
            >
              {currentStep === 0 ? 'キャンセル' : '戻る'}
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              size="lg"
            >
              {currentStep === steps.length - 1 ? '予約を確定' : '次へ'}
            </Button>
          </HStack>

        </VStack>
      </Container>
    </MainLayout>
  )
}