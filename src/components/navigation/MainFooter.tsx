'use client'

import {
  Box,
  Container,
  Link,
  Text,
  VStack,
  HStack,
  Separator,
  chakra,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'

type SocialButtonProps = {
  children: ReactNode
  label: string
  href: string
}

function SocialButton({ children, label, href }: SocialButtonProps) {
  return (
    <chakra.a
      color="gray.400"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="color 0.2s"
      _hover={{ color: "white" }}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      fontSize="xl"
    >
      {children}
    </chakra.a>
  )
}


export function MainFooter() {
  return (
    <Box
      as="footer"
      bg="gray.900"
      py={12}
    >
      <Container maxW="6xl">
        <VStack gap={8}>
          {/* Brand and Description */}
          <VStack gap={4} textAlign="center">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              letterSpacing="-0.02em"
            >
              SalonHub
            </Text>
            <Text
              color="gray.400"
              fontSize="md"
              maxW="md"
            >
              美容サロンと顧客をつなぐ予約プラットフォーム
            </Text>
          </VStack>

          {/* Navigation Links */}
          <HStack gap={8} wrap="wrap" justify="center">
            <Link
              as={NextLink}
              href="/stores"
              color="gray.400"
              _hover={{ color: "white" }}
              transition="color 0.2s"
            >
              サロン検索
            </Link>
            <Link
              as={NextLink}
              href="/help"
              color="gray.400"
              _hover={{ color: "white" }}
              transition="color 0.2s"
            >
              ヘルプ
            </Link>
            <Link
              as={NextLink}
              href="/contact"
              color="gray.400"
              _hover={{ color: "white" }}
              transition="color 0.2s"
            >
              お問い合わせ
            </Link>
            <Link
              as={NextLink}
              href="/terms"
              color="gray.400"
              _hover={{ color: "white" }}
              transition="color 0.2s"
            >
              利用規約
            </Link>
            <Link
              as={NextLink}
              href="/privacy"
              color="gray.400"
              _hover={{ color: "white" }}
              transition="color 0.2s"
            >
              プライバシーポリシー
            </Link>
          </HStack>

          {/* Social Links */}
          <HStack gap={6} justify="center">
            <SocialButton label="Twitter" href="#">
              <FaTwitter />
            </SocialButton>
            <SocialButton label="Instagram" href="#">
              <FaInstagram />
            </SocialButton>
            <SocialButton label="YouTube" href="#">
              <FaYoutube />
            </SocialButton>
          </HStack>

          <Separator borderColor="gray.700" />

          {/* Copyright */}
          <Text
            color="gray.500"
            fontSize="sm"
            textAlign="center"
          >
            &copy; 2024 SalonHub. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
