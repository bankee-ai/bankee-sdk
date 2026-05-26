import type { DeviceConfig } from '../types';

/**
 * Manages device capabilities, secure element access, NFC/BLE sessions,
 * and APDU command/response handling.
 */
export class DeviceManager {
  private config: DeviceConfig;

  constructor(config: DeviceConfig) {
    this.config = config;
  }

  async initNFC(): Promise<void> {
    // Initialise NFC reader and register APDU handlers
  }

  async initBLE(): Promise<void> {
    // Initialise BLE advertising and GATT server
  }

  async sendAPDU(command: Uint8Array): Promise<Uint8Array> {
    // Send APDU command to secure element, return response
    throw new Error('APDU: implemented in platform-specific Bankee SDK layer');
  }

  async provisionKey(keyId: string, algorithm: 'EC_P256' | 'RSA_2048'): Promise<void> {
    // Generate and store key in secure element via Bankee Cloud KMS
  }

  getCapabilities() {
    return {
      nfc: this.config.nfc ?? false,
      ble: this.config.ble ?? false,
      secureElement: this.config.secureElement ?? false,
      deviceType: this.config.type,
    };
  }
}
