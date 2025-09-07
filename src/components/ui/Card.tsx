'use client'

import { Box, VStack, Heading, Separator, BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface CardProps extends BoxProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outline' | 'filled' | 'glass';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'elevated', hover = true, ...props }, ref) => {
    const getCardStyles = () => {
      const baseStyles = {
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative' as const,
        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.05), rgba(59, 130, 246, 0.1))',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
          pointerEvents: 'none'
        },
        ...(hover && {
          _hover: {
            transform: 'translateY(-8px) scale(1.02)',
            shadow: '0 20px 40px rgba(6, 182, 212, 0.15), 0 10px 20px rgba(14, 165, 233, 0.1)',
            _before: {
              opacity: 1
            }
          },
        }),
      };

      switch (variant) {
        case 'elevated':
          return {
            ...baseStyles,
            bg: 'transparent',
            backdropFilter: 'blur(10px)',
            shadow: '0 8px 32px rgba(6, 182, 212, 0.12), 0 2px 16px rgba(14, 165, 233, 0.08)',
            border: '1px solid',
            borderColor: 'rgba(6, 182, 212, 0.1)',
            zIndex: 1,
            '& > *': {
              position: 'relative',
              zIndex: 1
            }
          };
        case 'outline':
          return {
            ...baseStyles,
            bg: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '2px solid',
            borderColor: 'rgba(6, 182, 212, 0.2)',
            zIndex: 1,
            _hover: {
              ...baseStyles._hover,
              borderColor: 'rgba(6, 182, 212, 0.4)',
              bg: 'rgba(255, 255, 255, 0.95)'
            },
            '& > *': {
              position: 'relative',
              zIndex: 1
            }
          };
        case 'filled':
          return {
            ...baseStyles,
            bg: 'bg.subtle',
            border: 'none',
          };
        case 'glass':
          return {
            ...baseStyles,
            bg: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            shadow: 'xl',
          };
        default:
          return baseStyles;
      }
    };

    return (
      <Box ref={ref} {...getCardStyles()} {...props}>
        {children}
      </Box>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  children: React.ReactNode;
  divider?: boolean;
}

export const CardHeader = ({ children, divider = true }: CardHeaderProps) => {
  return (
    <VStack gap={4} align="stretch">
      <Box p={6} pb={divider ? 4 : 6}>
        {children}
      </Box>
      {divider && <Separator borderColor="border.subtle" />}
    </VStack>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: boolean;
}

export const CardTitle = ({ children, size = 'lg', gradient = false }: CardTitleProps) => {
  const gradientStyles = gradient ? {
    bgGradient: 'linear(to-r, primary.500, secondary.500)',
    bgClip: 'text',
    color: 'transparent'
  } : {};

  return (
    <Heading 
      size={size} 
      color={gradient ? undefined : 'text.default'}
      fontWeight="bold"
      {...gradientStyles}
    >
      {children}
    </Heading>
  );
};

interface CardContentProps extends BoxProps {
  children: React.ReactNode;
}

export const CardContent = ({ children, ...props }: CardContentProps) => {
  return (
    <Box p={6} color="text.default" {...props}>
      {children}
    </Box>
  );
};

interface CardFooterProps extends BoxProps {
  children: React.ReactNode;
  divider?: boolean;
}

export const CardFooter = ({ children, divider = true, ...props }: CardFooterProps) => {
  return (
    <VStack gap={0} align="stretch">
      {divider && <Separator borderColor="border.subtle" />}
      <Box p={6} pt={divider ? 4 : 6} {...props}>
        {children}
      </Box>
    </VStack>
  );
};