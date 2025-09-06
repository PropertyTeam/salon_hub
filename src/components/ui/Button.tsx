'use client'

import { forwardRef } from 'react';
import { Button as ChakraButton, Spinner, HStack } from '@chakra-ui/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  colorScheme?: string;
  width?: string | number;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    disabled = false,
    leftIcon,
    rightIcon,
    colorScheme,
    width,
    fullWidth,
    ...props 
  }, ref) => {
    
    const getButtonProps = () => {
      const baseProps = {
        size,
        disabled: disabled || isLoading,
        loading: isLoading,
        loadingText: isLoading ? '読み込み中...' : undefined,
        width: fullWidth ? 'full' : width,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        _hover: { transform: 'translateY(-2px)', shadow: 'lg' },
        _active: { transform: 'translateY(0px)' },
        fontWeight: 'medium',
        ...props
      };

      switch (variant) {
        case 'primary':
          return {
            ...baseProps,
            bg: 'linear-gradient(135deg, primary.500, primary.700)',
            color: 'white',
            _hover: {
              ...baseProps._hover,
              bg: 'linear-gradient(135deg, primary.600, primary.800)',
              shadow: 'primary.500/25'
            },
            shadow: 'md'
          };
        
        case 'secondary':
          return {
            ...baseProps,
            bg: 'neutral.100',
            color: 'neutral.700',
            _hover: {
              ...baseProps._hover,
              bg: 'neutral.200',
            },
            border: '1px solid',
            borderColor: 'border.default'
          };
          
        case 'danger':
          return {
            ...baseProps,
            bg: 'linear-gradient(135deg, red.500, red.600)',
            color: 'white',
            _hover: {
              ...baseProps._hover,
              bg: 'linear-gradient(135deg, red.600, red.700)',
            }
          };
          
        case 'ghost':
          return {
            ...baseProps,
            bg: 'transparent',
            color: 'text.default',
            _hover: {
              ...baseProps._hover,
              bg: 'bg.subtle',
            }
          };
          
        case 'outline':
          return {
            ...baseProps,
            bg: 'transparent',
            border: '1px solid',
            borderColor: 'border.default',
            color: 'text.default',
            _hover: {
              ...baseProps._hover,
              borderColor: 'primary.500',
              color: 'primary.600',
              bg: 'primary.50'
            }
          };
          
        case 'gradient':
          return {
            ...baseProps,
            bg: 'linear-gradient(135deg, primary.400, secondary.500)',
            color: 'white',
            _hover: {
              ...baseProps._hover,
              bg: 'linear-gradient(135deg, primary.500, secondary.600)',
            }
          };
          
        default:
          return baseProps;
      }
    };

    const buttonProps = getButtonProps();

    return (
      <ChakraButton ref={ref} {...buttonProps}>
        <HStack gap={2}>
          {leftIcon && !isLoading && leftIcon}
          {isLoading && <Spinner size="sm" />}
          <span>{children}</span>
          {rightIcon && !isLoading && rightIcon}
        </HStack>
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';