export interface PlanInfo {
    id: number,
    created_at: number,
    payment_method: string,
    responsible: string,
    document_number: number,
    type: string,
    fund: string,
    debt: number,
    financed: number,
    advance: number,
    installments: number,
    late_installments: number
}