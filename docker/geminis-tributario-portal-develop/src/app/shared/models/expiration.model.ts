export interface ExpirationDetailItem {
    title: string,
    date: number
}
export interface ExpirationDetail {
    name: string,
    icon: string,
    items: Array<ExpirationDetailItem>
}

export interface Expiration {
    id: number,
    date: number,
    taxes: Array<string>,
    detail: Array<ExpirationDetail>
}

// export class Expiration {
//     id: number;
//     date: number;
//     taxes: Array<string>;
//     detail: Array<ExpirationDetail>

//     constructor(data: any) {
//         this.id = data.id || 0;
//         this.date = data.date || 0;
//         this.taxes = data.taxes || [];
//         this.detail = 
//     }
// }