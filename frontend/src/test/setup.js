import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('../hooks/i18n', () => ({
    useTranslation: () => ({
        translate: (key) => key,
    }),
}));

afterEach(() => {
    cleanup();
});