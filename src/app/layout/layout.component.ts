import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet,RouterLink,RouterLinkActive,Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isSidebarCollapsed = false;
  isSidebarOpen = false;
  isOpen = false;
  employeeName: string = '';

  profileImage: string = '';
  constructor(private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit(): void {

    this.employeeName =
      localStorage.getItem('employeeName') || '';

    this.profileImage =
      localStorage.getItem('profileImage') || '';

  }
  // Sidebar Toggle
  toggleSidebar() {

    // 📱 Mobile
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }

    // 💻 Desktop
    else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  // Close Sidebar
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  // Profile
  goToProfile() {
    this.router.navigate(['/app/profile']);
  }
  logout() {

    if (confirm('Are you sure you want to logout?')) {

      localStorage.clear();

      this.router.navigate(
        ['/login'],
        { replaceUrl: true }
      );

    }

  }

  // Outside Click Close
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {

    const target = event.target as HTMLElement;

    if (
      window.innerWidth <= 768 &&
      this.isSidebarOpen &&
      !target.closest('.sidebar') &&
      !target.closest('.toggle-btn')
    ) {
      this.isSidebarOpen = false;
    }
  }
}
