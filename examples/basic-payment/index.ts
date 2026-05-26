/**
 * Basic payment example — NFC tap-to-pay on a smartwatch.
 * Routes automatically through Wero → Open Banking → Card fallback.
 */
import { BankeeSDK } from '@bankee/sdk';

const bankee = new BankeeSDK({
  apiKey: process.env.BANKEE_API_KEY!,
  environment: 'sandbox',
  device: {
    type: 'watch',
    nfc: true,
    secureElement: true,
    os: 'rtos',
  },
  defaultRails: ['wero', 'open_banking', 'card'],
});

async function handleTap(amount: number, currency: string) {
  const result = await bankee.payments.create({
    amount,
    currency,
    rails: ['wero', 'open_banking', 'card'],
  });

  console.log(`Payment ${result.status} via ${result.rail}`);
  console.log(`Transaction ID: ${result.id}`);
  return result;
}

// Handle a £12.50 contactless payment
handleTap(1250, 'GBP').catch(console.error);
