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
        borderRadius: 'xl',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(hover && {
          _hover: {
            transform: 'translateY(-4px)',
            shadow: '2xl',
          },
        }),
      };

      switch (variant) {
        case 'elevated':
          return {
            ...baseStyles,
            bg: 'bg.default',
            shadow: 'lg',
            border: '1px solid',
            borderColor: 'transparent',
          };
        case 'outline':
          return {
            ...baseStyles,
            bg: 'bg.default',
            border: '1px solid',
            borderColor: 'border.default',
            _hover: {
              ...baseStyles._hover,
              borderColor: 'primary.200',
            },
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