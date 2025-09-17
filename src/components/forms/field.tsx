import React from 'react'
import { VStack, Text, Box } from '@chakra-ui/react'

interface FieldProps {
  label?: string
  invalid?: boolean
  errorText?: string
  children: React.ReactNode
}

export function Field({ label, invalid, errorText, children }: FieldProps) {
  return (
    <VStack align="stretch" gap={2}>
      {label && (
        <Text
          fontSize="sm"
          fontWeight="500"
          color={invalid ? "red.500" : "gray.700"}
        >
          {label}
        </Text>
      )}
      <Box>
        {children}
      </Box>
      {invalid && errorText && (
        <Text fontSize="sm" color="red.500">
          {errorText}
        </Text>
      )}
    </VStack>
  )
}