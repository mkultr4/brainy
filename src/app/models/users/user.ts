import { Language } from '../languaje/language';
import { Account } from '../account/account';

export class User {
    public id: any;
    public email: string;
    public password = '';
    public passwordConfirm: string;
    public status: string;
    // Information
    public acronym: string;
    public name: string;
    public lastName: string;
    public profilePicture: any;
    // Language
    public language: Language;
    // Account
    public originAccount;
    public account: Account;

    public sessionID: string;
}
