import type { PaymentRequest, PaymentResult, SupportedRail } from '../types';

/**
 * Routes payment requests to the appropriate rail based on device capabilities,
 * user preferences, and real-time network availability.
 */
export class PaymentRouter {
  private readonly rails: SupportedRail[];

  constructor(rails: SupportedRail[]) {
    this.rails = rails;
  }

  async route(request: PaymentRequest): Promise<PaymentResult> {
    const available = await this.getAvailableRails(request);
    const selected = this.selectOptimalRail(available, request);
    return this.executePayment(selected, request);
  }

  private async getAvailableRails(request: PaymentRequest): Promise<SupportedRail[]> {
    return this.rails.filter(rail => this.isRailCompatible(rail, request));
  }

  private selectOptimalRail(rails: SupportedRail[], request: PaymentRequest): SupportedRail {
    if (request.rails?.length) {
      const preferred = request.rails.find(r => rails.includes(r));
      if (preferred) return preferred;
    }
    return rails[0];
  }

  private isRailCompatible(_rail: SupportedRail, _request: PaymentRequest): boolean {
    return true;
  }

  private async executePayment(_rail: SupportedRail, _request: PaymentRequest): Promise<PaymentResult> {
    throw new Error('executePayment: implemented in Bankee Cloud Platform');
  }
}
