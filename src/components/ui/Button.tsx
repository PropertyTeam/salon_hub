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
            bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            shadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
            _hover: {
              ...baseProps._hover,
              bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              shadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
              transform: 'translateY(-2px) scale(1.02)'
            },
            _active: {
              transform: 'translateY(0px) scale(0.98)',
              shadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }
          };

        case 'secondary':
          return {
            ...baseProps,
            bg: 'rgba(255, 255, 255, 0.9)',
            color: 'gray.700',
            border: '2px solid',
            borderColor: 'gray.200',
            shadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            _hover: {
              ...baseProps._hover,
              bg: 'white',
              borderColor: 'primary.300',
              shadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-2px)'
            }
          };

        case 'danger':
          return {
            ...baseProps,
            bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            border: 'none',
            shadow: '0 8px 25px rgba(239, 68, 68, 0.4)',
            _hover: {
              ...baseProps._hover,
              bg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              shadow: '0 12px 35px rgba(239, 68, 68, 0.6)',
              transform: 'translateY(-2px) scale(1.02)'
            }
          };

        case 'ghost':
          return {
            ...baseProps,
            bg: 'transparent',
            color: 'gray.600',
            border: 'none',
            _hover: {
              ...baseProps._hover,
              bg: 'rgba(0, 0, 0, 0.05)',
              color: 'gray.800',
              transform: 'translateY(-1px)'
            }
          };

        case 'outline':
          return {
            ...baseProps,
            bg: 'transparent',
            border: '2px solid',
            borderColor: 'gray.300',
            color: 'gray.700',
            _hover: {
              ...baseProps._hover,
              borderColor: 'primary.400',
              color: 'primary.600',
              bg: 'rgba(102, 126, 234, 0.05)',
              shadow: '0 4px 15px rgba(102, 126, 234, 0.2)',
              transform: 'translateY(-2px)'
            }
          };

        case 'gradient':
          return {
            ...baseProps,
            bg: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
            color: 'white',
            border: 'none',
            shadow: '0 8px 25px rgba(6, 182, 212, 0.4)',
            position: 'relative',
            overflow: 'hidden',
            _before: {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transition: 'left 0.6s',
            },
            _hover: {
              ...baseProps._hover,
              shadow: '0 12px 35px rgba(6, 182, 212, 0.6)',
              transform: 'translateY(-2px) scale(1.02)',
              _before: {
                left: '100%'
              }
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