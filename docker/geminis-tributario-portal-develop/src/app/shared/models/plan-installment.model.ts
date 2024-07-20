export interface PlanInstallment {
    id: number;
    installment: string;
    nominal: number;
    paid: number;
    recharge: number;
    total: number;
    expiration: number;
    status: string;
  }