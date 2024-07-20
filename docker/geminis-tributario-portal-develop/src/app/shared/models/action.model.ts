import { Observable } from "rxjs";
import { AuthService } from "src/app/core/auth.service";

export interface ActionDataExtras {
    title: string,
    icon: string,
    description: string
}

export interface ActionData {
    name: string;
    path: string;
    section: string;
    params?: Object;
    permissions: Array<string>;
    featured?: boolean;
    featuredExtras?: ActionDataExtras;
    order: number;
    readonly enabled: boolean;
}

export class Action {
    name: string;
    data: Array<ActionData>;
    allDisabled: boolean;

    constructor(data: any, private _authService: AuthService) {
        this.name = data.name || "";
        this.data = (data.data || []).map((item: any) => ({
            name: item.name || "",
            path: item.path || "",
            section: item.section || "",
            params: item.params || {},
            permissions: item.permissions || [],
            featured: item.featured || false,
            featuredExtras: item.featuredExtras || {},
            order: item.order || 0,
            enabled: this.checkPermissions(item.permissions || [])
        }));
        // Verificar si todos los objetos tienen enabled en false
        this.allDisabled = this.data.every(item => !item.enabled);
    }

    private checkPermissions(permissions: Array<string>): boolean {
        const isLoggedIn: boolean = this._authService.isLoggedIn;    
        // Devuelve true si 'public' está presente en el array de permisos o el usuario está autenticado
        return permissions.includes('public') || isLoggedIn;
    }
}
