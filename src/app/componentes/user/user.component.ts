import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Debt {
  id: number;
  numberDocument: string;
  company: string;
  amount: number;
  dateExpiration: string;
  color: string;
  isPaid: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  debts: Debt[] = [];
  filteredDebts: Debt[] = [];
  alertDebts: Debt[] = [];
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  alertMessage: string | null = null;
  currentFilter: string = 'all';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadDebts();
    this.loadAlert();
  }

  loadDebts(): void {
    this.authService.obtenerDeudas(this.currentMonth, this.currentYear).subscribe(response => {
      this.debts = response;
      this.filteredDebts = response;
      console.log('Debts loaded:', this.debts);
    }, error => {
      console.error('Error loading debts', error);
    });
  }

  loadAlert(): void {
    this.authService.getAlertDueToday().subscribe(response => {
      console.log('Alert response:', response);
      if (response && response.debtsDueToday) {
        this.alertMessage = response.message;
        this.alertDebts = response.debtsDueToday.filter((debt: Debt) => !debt.isPaid);
      } else {
        console.error('Invalid response format:', response);
        this.alertMessage = 'Error loading alerts';
        this.alertDebts = [];
      }
    }, error => {
      console.error('Error loading alert', error);
    });
  }

  nextMonth(): void {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.loadDebts();
  }

  previousMonth(): void {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.loadDebts();
  }

  payDebt(debt: Debt): void {
    console.log('Debt to be paid:', debt);
    if (debt && debt.id) {
      this.authService.marcarDeudaComoPagada(debt.id).subscribe(response => {
        debt.isPaid = true;
        debt.color = 'green';
        this.filterDebts(this.currentFilter);
        this.loadAlert();
      }, error => {
        console.error('Error marking debt as paid', error);
      });
    } else {
      console.error('Debt object is invalid or missing id');
    }
  }

  goToCurrentMonth(): void {
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
    this.loadDebts();
  }

  getCardColorClass(debt: Debt): string {
    if (debt.isPaid) {
      return 'green-header';
    } else if (new Date(debt.dateExpiration) < new Date()) {
      return 'red-header';
    } else if (new Date(debt.dateExpiration) < new Date(new Date().setDate(new Date().getDate() + 7))) {
      return 'yellow-header';
    } else {
      return 'black-header';
    }
  }

  getMonthName(month: number): string {
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return monthNames[month - 1];
  }

  filterDebts(filter: string): void {
    this.currentFilter = filter;
    if (filter === 'all') {
      this.filteredDebts = this.debts;
    } else if (filter === 'paid') {
      this.filteredDebts = this.debts.filter(debt => debt.isPaid);
    } else if (filter === 'red') {
      this.filteredDebts = this.debts.filter(debt => !debt.isPaid && new Date(debt.dateExpiration) < new Date());
    } else if (filter === 'yellow') {
      this.filteredDebts = this.debts.filter(debt => !debt.isPaid && new Date(debt.dateExpiration) < new Date(new Date().setDate(new Date().getDate() + 7)));
    } else if (filter === 'black') {
      this.filteredDebts = this.debts.filter(debt => !debt.isPaid && new Date(debt.dateExpiration) >= new Date(new Date().setDate(new Date().getDate() + 7)));
    }
  }

  registrarDeuda(type: string): void {
    if (type === 'invoice') {
      this.router.navigate(['registrar-deuda']);
    } else if (type === 'loan') {
      this.router.navigate(['registrar2']);
    } else if (type === 'utility') {
      this.router.navigate(['registrar3']);
    } else if (type === 'tax') {
      this.router.navigate(['registrar4']);
    }
  }
}
