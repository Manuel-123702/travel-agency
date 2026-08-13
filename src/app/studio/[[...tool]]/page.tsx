"use client";

import { NextStudio } from 'next-sanity/studio';
import { ClerkProvider } from '@clerk/nextjs';
import config from '../../../../sanity.config';
import StudioAuthGuard from '../StudioAuthGuard';

export default function StudioPage() {
  return (
    <ClerkProvider>
      <StudioAuthGuard>
        <NextStudio config={config} />
      </StudioAuthGuard>
    </ClerkProvider>
  );
}
