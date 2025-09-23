'use client'

import React, { forwardRef } from 'react'
import { Box, chakra } from '@chakra-ui/react'

interface NativeSelectRootProps {
  children: React.ReactNode
  className?: string
}

export function NativeSelectRoot({ children, className }: NativeSelectRootProps) {
  return (
    <Box position="relative" className={className}>
      {children}
    </Box>
  )
}

interface NativeSelectFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  children: React.ReactNode
}

export const NativeSelectField = forwardRef<HTMLSelectElement, NativeSelectFieldProps>(
  ({ children, placeholder, ...props }, ref) => {
    const SelectComponent = chakra('select')

    return (
      <SelectComponent
        ref={ref}
        appearance="none"
        width="100%"
        padding="12px 16px"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.300"
        backgroundColor="white"
        fontSize="md"
        lineHeight="1.5"
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        cursor="pointer"
        _focus={{
          outline: 'none',
          borderColor: 'gray.600',
          boxShadow: '0 0 0 1px gray.600',
          transform: 'scale(1.02)',
        }}
        _hover={{
          borderColor: 'gray.400',
        }}
        _disabled={{
          opacity: 0.6,
          cursor: 'not-allowed',
        }}
        backgroundImage={`url("data:image/svg+xml;charset=utf-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`}
        backgroundPosition="right 12px center"
        backgroundRepeat="no-repeat"
        backgroundSize="16px"
        paddingRight="40px"
        {...props}
      >
        {children}
      </SelectComponent>
    )
  }
)

NativeSelectField.displayName = 'NativeSelectField'