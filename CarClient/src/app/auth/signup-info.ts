export class SignUpInfo {
    userName: string;
    role: string;
    password: string;
    email: string;
    permis: string;
    fullName: string

    constructor(fullName: string, email: string, userName: string, password: string, permis: string) {
        this.userName = userName;
        this.password = password;
        this.role = 'user';
        this.email = email;
        this.fullName = fullName;
        this.permis = permis;
    }
}
