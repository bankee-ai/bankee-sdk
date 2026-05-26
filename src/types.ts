export type SupportedRail =
  | 'wero'
  | 'open_banking'
  | 'card'
  | 'ap2'
  | 'x402'
  | 'mpp'
  | 'acp'
  | 'a2a'
  | 'cbdc'
  | 'stablecoin';

export type AgenticProtocol = 'ap2' | 'x402' | 'mpp' | 'acp' | 'a2a';

export interface DeviceConfig {
  type: 'phone' | 'watch' | 'wearable' | 'ring' | 'iot';
  nfc?: boolean;
  ble?: boolean;
  secureElement?: boolean;
  os?: 'android' | 'ios' | 'rtos' | 'linux';
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  rails?: SupportedRail[];
  device?: DeviceConfig;
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  id: string;
  status: 'pending' | 'authorised' | 'settled' | 'failed';
  rail: SupportedRail;
  amount: number;
  currency: string;
  timestamp: string;
  receipt?: string;
}

export interface AgentPaymentRequest {
  protocol: AgenticProtocol;
  amount: number;
  currency: string;
  approval: 'auto' | 'human-in-loop';
  agent: {
    id: string;
    capabilities: string[];
  };
  metadata?: Record<string, string>;
}

export interface BankeeConfig {
  apiKey: string;
  environment: 'production' | 'sandbox';
  device?: DeviceConfig;
  defaultRails?: SupportedRail[];
}
