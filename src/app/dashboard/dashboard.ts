import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, interval, takeUntil } from 'rxjs';

interface MetricCard {
  label: string;
  value: number;
  color: 'critical' | 'warning' | 'stable';
}

interface ActivityLog {
  timestamp: string;
  message: string;
}

interface UnitStatus {
  unit: string;
  staffed: number;
  status: 'critical' | 'warning' | 'stable';
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
 strikeTitle = 'ACTIVE STRIKE: Memorial Hospital';
  strikeStartTime = 'Started 2 hours ago - 147 nurses needed';
  countdownTime = '01:58:32';

  metrics: MetricCard[] = [
    { label: 'Nurses Needed', value: 147, color: 'critical' },
    { label: 'Deployed', value: 23, color: 'warning' },
    { label: 'In Process', value: 89, color: 'warning' },
    { label: 'Available', value: 35, color: 'stable' }
  ];

  unitStatusData: UnitStatus[] = [
    { unit: 'ICU', staffed: 40, status: 'critical', color: '#d32f2f' },
    { unit: 'Emergency', staffed: 65, status: 'warning', color: '#f57c00' },
    { unit: 'Med-Surg', staffed: 80, status: 'stable', color: '#388e3c' }
  ];

  activityFeed: ActivityLog[] = [
    { timestamp: '2:34 PM', message: '5 ICU nurses deployed' },
    { timestamp: '2:28 PM', message: 'Emergency credentialing completed for 12 nurses' },
    { timestamp: '2:15 PM', message: 'Strike alert activated' }
  ];

  displayedColumns: string[] = ['unit', 'staffed', 'status'];
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.startCountdownTimer();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startCountdownTimer(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateCountdown();
      });
  }

  private updateCountdown(): void {
    const parts = this.countdownTime.split(':');
    let hours = Number.parseInt(parts[0], 10);
    let minutes = Number.parseInt(parts[1], 10);
    let seconds = Number.parseInt(parts[2], 10);

    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    }

    this.countdownTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  onFindNurses(): void {
    this.snackBar.open('Opening nurse search interface...', 'Close', { duration: 3000 });
  }

  onViewDeploymentMap(): void {
    this.snackBar.open('Loading deployment map...', 'Close', { duration: 3000 });
  }

  onGenerateReport(): void {
    this.snackBar.open('Generating crisis report...', 'Close', { duration: 3000 });
  }

  getMetricClass(color: string): string {
    return `metric-${color}`;
  }

  trackByUnit(index: number, item: UnitStatus): string {
    return item.unit;
  }

  trackByActivity(index: number, item: ActivityLog): string {
    return item.timestamp + item.message;
  }
}
