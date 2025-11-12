# 📅 CalendoX – Google Calendar Clone (No Frameworks)

![Built With](https://img.shields.io/badge/built%20with-PHP%20%7C%20MySQL%20%7C%20JS%20%7C%20HTML%20%7C%20CSS-2b2b2b)
![Responsive](https://img.shields.io/badge/responsive-yes-brightgreen)
![Project Type](https://img.shields.io/badge/project-portfolio%20ready-yellow)

> **A full-stack calendar application built entirely from scratch.**  
> No frameworks. No dependencies. Just clean, understandable, real-world code.

---

## 💼 My first portfolio project

**CalendoX** is a feature-rich calendar and appointment manager built with **PHP**, **MySQL** (XAMPP), **JavaScript**, **HTML**, and **CSS** — all from scratch.

This project was for me to have a "real-world" tutorial to help me learn how to build a full-stack application using foundational web technologies, while producing a powerful, "professional-grade" result.

---

## 🛠️ Key Features

- ✅ Add, edit, and delete appointments
- ✅ Support for **multi-day** events
- ✅ Handle **overlapping** bookings
- ✅ Set **start/end time slots**
- ✅ Live clock display
- ✅ Navigate between months
- ✅ Dropdown controls for managing multiple bookings per day
- ✅ Fully responsive and modern UI
- ✅ Built with pure PHP + MySQL + JS — no external libraries

## ✨Personal (extra) added features
  - ☑ User can now change the month/year by a dropdown selection in addition to using the arrow buttons (up to 5 years in the past and 25 years in the future)
    * This also handles the case "If a user clicked on next after Dec, 2050"
  - ☑ Modified various styles such as the modal buttons
  - ☑ Selector properly selects a dropdown selection automatically when editing on a multi-conflict day (since this is already done originally, I thought it made sense to have the dropdown immediately reflect it, while still having the placeholder text in the dropdown)

---

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (no libraries)
- **Backend**: PHP (Procedural)
- **Database**: MySQL (XAMPP)
- **Architecture**: MVC-inspired folder structure
- **No frameworks**: 100% raw code

---

## 📁 Folder Structure (Simplified)

```bash
calendox/
│
├── index.php              # Main entry
├── style.css              # Layout and design
├── calendar.js            # Rendering & interactivity
├── calendar.php           # Handler between DB and FE
├── connection.php         # Connection to the MySQL database
├── appointments.sql       # MySQL schema
├── README.md
```
---

Based on this tutorial from freecodecamp.org:

🎥 **Video Tutorial (3h Full Build)**  
Watch the complete step-by-step build from scratch:  
[📺 CalendoX – Google Calendar Clone (Video Tutorial)](https://www.youtube.com/watch?v=pHMtbdGoP_g)
