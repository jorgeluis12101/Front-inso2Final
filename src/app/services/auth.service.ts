import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import baserUrl from './helper';

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserRole = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  public login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${baserUrl}/api/v1/user/login`, loginData).pipe(
      map((response: any) => {
        const token = response.token;
        this.setToken(token);
        const decodedToken = jwtDecode<JwtPayload>(token);
        this.currentUserRole.next(decodedToken.role);
        return response;
      })
    );
  }

  public register(user: any): Observable<any> {
    return this.http.post(`${baserUrl}/api/v1/user/registrar`, user);
  }
  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
    this.checkToken();
  }
  
  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  public logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.currentUserRole.next('');
  }
  

  public getRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        this.currentUserRole.next(decodedToken.role);
        this.loggedIn.next(true);
      } catch (error) {
        console.error('Failed to decode token:', error);
        this.logout();
      }
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUsuarioId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const decoded: any = jwtDecode(token);
    return decoded.id;
  }

  public obtenerDeudas(month: number, year: number): Observable<any> {
    return this.http.get(`${baserUrl}/api/v1/debts/month`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      }),
      params: {
        year: year.toString(),
        month: month.toString()
      }
    });
  }

  public marcarDeudaComoPagada(debtId: number): Observable<any> {
    return this.http.post(`${baserUrl}/api/v1/debts/mark-as-paid/${debtId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }

  public getAlertDueToday(): Observable<any> {
    return this.http.get(`${baserUrl}/api/v1/debts/alert-due-today`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }

  registerInvoiceDebt(debt: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${baserUrl}/api/v1/invoice-debts/register`, debt, { headers, responseType: 'text' });
  }
  
  registerLoanDebt(formData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log('Sending Data:', formData); // Log the data being sent
    return this.http.post(`${baserUrl}/api/v1/loan-debts/register`, formData, { headers });
  }

  public registerTaxDebt(taxDebt: any): Observable<any> {
    return this.http.post(`${baserUrl}/api/v1/tax-debts/register`, taxDebt, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }

  public registerUtilityBill(utilityBill: any): Observable<any> {
    return this.http.post(`${baserUrl}/api/v1/utility-bills/register`, utilityBill, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      }),
      responseType: 'json' // Asegúrate de que la respuesta sea JSON
    });
  }
  
  
  
}
