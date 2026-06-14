import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  // 🎨 Appearance
  theme: string = 'light';
  fontSize: string = 'medium';

  // 🔔 Notifications
  emailNotif = true;
  taskNotif = true;

  // ⚙️ Preferences
  defaultPage = 'dashboard';

  // 🔄 Load saved settings
  ngOnInit() {
    const savedFont = localStorage.getItem('fontSize');
    const savedTheme = localStorage.getItem('theme');

    if (savedFont) {
      this.fontSize = savedFont;
      this.applyFontSize(savedFont);
    }

    if (savedTheme === 'dark') {
      this.theme = 'dark';
      document.body.classList.add('dark-theme');
    }
  }
  /* 🔥 APPLY FONT */
  changeFont() {
    localStorage.setItem('fontSize', this.fontSize);
    this.applyFontSize(this.fontSize);
  }

  applyFontSize(size: string) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
  }

  // 🎨 Theme change (radio buttons)
  changeTheme() {
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme() {
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  changeDefaultPage() {
    localStorage.setItem('defaultPage', this.defaultPage);
  }
  // 🔤 Font change
 
}
