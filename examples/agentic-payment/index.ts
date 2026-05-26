/**
 * Agentic payment example — AI agent autonomously reorders inventory
 * using Google AP2 with a human-in-the-loop approval gate.
 */
import { BankeeSDK } from '@bankee/sdk';

const bankee = new BankeeSDK({
  apiKey: process.env.BANKEE_API_KEY!,
  environment: 'sandbox',
});

async function agentReorder(supplierId: string, itemSku: string, quantity: number) {
  // Step 1: Agent negotiates price via A2A
  const negotiation = await bankee.agentic.negotiate({
    protocol: 'a2a',
    counterpartyId: supplierId,
    intent: 'purchase',
    parameters: { sku: itemSku, quantity },
  });

  console.log(`Agreed price: ${negotiation.agreedAmount} ${negotiation.currency}`);

  // Step 2: Trigger payment via AP2 with human approval
  const payment = await bankee.agentic.createPayment({
    protocol: 'ap2',
    amount: negotiation.agreedAmount,
    currency: negotiation.currency,
    approval: 'human-in-loop',
    agent: {
      id: 'inventory-agent-01',
      capabilities: ['initiate_payment', 'negotiate_price'],
    },
    metadata: {
      supplierId,
      sku: itemSku,
      quantity: String(quantity),
      negotiationId: negotiation.id,
    },
  });

  console.log(`Payment ${payment.status} — awaiting human approval`);
  return payment;
}

agentReorder('supplier-abc', 'SKU-XR7', 500).catch(console.error);
