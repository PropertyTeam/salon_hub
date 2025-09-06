'use client'

import { Spinner, VStack, Text, Center, Box } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  thickness?: string;
  speed?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'bounce';
}

const bounceKeyframes = `
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`;

const pulseKeyframes = `
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary.500',
  thickness = '4px',
  speed = '0.65s',
  variant = 'default'
}: LoadingSpinnerProps) => {
  
  if (variant === 'dots') {
    return (
      <Box display="flex" gap={1}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            w={size === 'xs' ? 2 : size === 'sm' ? 3 : size === 'md' ? 4 : size === 'lg' ? 5 : 6}
            h={size === 'xs' ? 2 : size === 'sm' ? 3 : size === 'md' ? 4 : size === 'lg' ? 5 : 6}
            bg={color}
            borderRadius="full"
            style={{
              animation: `bounce 1.4s infinite ease-in-out both`,
              animationDelay: `${-1.32 + i * 0.16}s`
            }}
          />
        ))}
      </Box>
    );
  }

  if (variant === 'pulse') {
    return (
      <Box
        w={size === 'xs' ? 4 : size === 'sm' ? 6 : size === 'md' ? 8 : size === 'lg' ? 12 : 16}
        h={size === 'xs' ? 4 : size === 'sm' ? 6 : size === 'md' ? 8 : size === 'lg' ? 12 : 16}
        bg={color}
        borderRadius="full"
        style={{ animation: 'pulse 2s infinite' }}
        opacity={0.7}
      />
    );
  }

  if (variant === 'bounce') {
    return (
      <Box
        w={size === 'xs' ? 4 : size === 'sm' ? 6 : size === 'md' ? 8 : size === 'lg' ? 12 : 16}
        h={size === 'xs' ? 4 : size === 'sm' ? 6 : size === 'md' ? 8 : size === 'lg' ? 12 : 16}
        bg={color}
        borderRadius="full"
        style={{ animation: 'bounce 1s infinite' }}
      />
    );
  }

  return (
    <Spinner
      size={size}
      color={color}
    />
  );
};

interface LoadingPageProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'bounce';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const LoadingPage = ({ 
  title = '読み込み中...', 
  subtitle,
  variant = 'default',
  size = 'xl'
}: LoadingPageProps) => {
  return (
    <Center minH="100vh" bg="bg.default">
      <VStack gap={6}>
        <LoadingSpinner size={size} variant={variant} />
        <VStack gap={2} textAlign="center">
          <Text 
            fontSize="lg" 
            fontWeight="medium" 
            color="text.default"
          >
            {title}
          </Text>
          {subtitle && (
            <Text 
              fontSize="sm" 
              color="text.muted"
            >
              {subtitle}
            </Text>
          )}
        </VStack>
      </VStack>
    </Center>
  );
};

export const LoadingOverlay = ({ 
  isLoading,
  children,
  variant = 'default'
}: {
  isLoading: boolean;
  children: React.ReactNode;
  variant?: 'default' | 'dots' | 'pulse' | 'bounce';
}) => {
  if (!isLoading) return <>{children}</>;
  
  return (
    <Box position="relative">
      <Box opacity={0.3} pointerEvents="none">
        {children}
      </Box>
      <Center
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(2px)"
        zIndex={10}
      >
        <LoadingSpinner size="lg" variant={variant} />
      </Center>
    </Box>
  );
};