'use client'

import { forwardRef } from 'react';
import { 
  Input as ChakraInput, 
  VStack,
  Text,
  Box
} from '@chakra-ui/react';

interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed' | 'glass';
  focusColor?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon,
    rightIcon,
    size = 'md',
    variant = 'outline',
    focusColor = 'primary.500',
    ...props 
  }, ref) => {
    
    const getInputStyles = () => {
      const baseStyles = {
        borderRadius: 'lg',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        _focus: {
          borderColor: error ? 'red.500' : focusColor,
          boxShadow: `0 0 0 1px ${error ? 'red.500' : focusColor}`,
          transform: 'scale(1.02)',
        },
        _hover: {
          borderColor: error ? 'red.400' : 'border.muted',
        },
        fontSize: size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md',
        ...(error && {
          borderColor: 'red.400',
          _focus: {
            borderColor: 'red.500',
            boxShadow: '0 0 0 1px red.500',
          }
        })
      };

      switch (variant) {
        case 'glass':
          return {
            ...baseStyles,
            bg: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          };
        case 'filled':
          return {
            ...baseStyles,
            bg: 'bg.subtle',
            border: '1px solid transparent',
            _focus: {
              ...baseStyles._focus,
              bg: 'bg.default',
            }
          };
        case 'flushed':
          return {
            ...baseStyles,
            borderRadius: 0,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: '2px solid',
            borderColor: 'border.default',
            _focus: {
              borderColor: error ? 'red.500' : focusColor,
              boxShadow: 'none',
            }
          };
        default:
          return {
            ...baseStyles,
            borderColor: 'border.default',
          };
      }
    };

    const inputElement = (
      <ChakraInput
        ref={ref}
        size={size}
        {...getInputStyles()}
        {...props}
      />
    );

    return (
      <VStack align="stretch" gap={2}>
        {label && (
          <Text 
            fontSize="sm" 
            fontWeight="medium" 
            color="text.default"
            mb={1}
          >
            {label}
          </Text>
        )}
        
        <Box position="relative" display="flex" alignItems="center">
          {leftIcon && (
            <Box
              position="absolute"
              left={3}
              zIndex={2}
              color="text.muted"
              pointerEvents="none"
            >
              {leftIcon}
            </Box>
          )}
          
          <ChakraInput
            ref={ref}
            size={size}
            paddingLeft={leftIcon ? 10 : undefined}
            paddingRight={rightIcon ? 10 : undefined}
            {...getInputStyles()}
            {...props}
          />
          
          {rightIcon && (
            <Box
              position="absolute"
              right={3}
              zIndex={2}
              color="text.muted"
              pointerEvents="none"
            >
              {rightIcon}
            </Box>
          )}
        </Box>
        
        {error && (
          <Text fontSize="sm" color="red.500">
            {error}
          </Text>
        )}
        
        {helperText && !error && (
          <Text fontSize="sm" color="text.muted">
            {helperText}
          </Text>
        )}
      </VStack>
    );
  }
);

Input.displayName = 'Input';