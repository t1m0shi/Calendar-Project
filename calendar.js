const calendarEle = document.getElementById("calendar");
/* const monthYearEle = document.getElementById("monthYear"); */
const monthEle = document.getElementById("monthSelect");
const yearEle = document.getElementById("yearSelect");
const modalEle = document.getElementById("eventModal");
let currentDate = new Date();
const today = new Date();
let populated = false;
const yearsInFuture = 25;
const forwardEle = document.getElementById("forward-nav");
const backwardEle = document.getElementById("backward-nav");


function populateMonthYearSelectors(month, year){
    if (populated) return;
    populated = true;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach((name, index) => {
        const option = document.createElement("option");
        option.value = index + 1;
        option.textContent = name;
        if (index === month) option.selected = true;
        monthEle.appendChild(option);
    });

    /* const currYear = today.getFullYear(); 
    for (let y = currYear - 5; y <= currYear + 25; y++){
    */
    for (let y = year - 5; y <= year + yearsInFuture; y++){
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        if (y === year) option.selected = true;
        yearEle.appendChild(option);
    }
}

function renderCalendar(date = new Date()) {
    calendarEle.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
   /*  const today = new Date(); */
    const totalDays = new Date(year, month +1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    //display month/year
    /* monthYearEle.textContent = date.toLocaleDateString("en-us", {
        month: 'long',
        year: 'numeric'
    }); */
    populateMonthYearSelectors(month, year)

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
        const dayEle = document.createElement("div");
        dayEle.className = "day-name";
        dayEle.textContent = day;
        calendarEle.appendChild(dayEle);
    });

    for (let i=0; i < firstDayOfMonth; i++){
        calendarEle.appendChild(document.createElement("div"));
    }

    for (let day=1; day <= totalDays; day++){
        const dateStr = `${year}-${String(month+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const cell = document.createElement("div");
        cell.className = "day";

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
            cell.classList.add("today");
        }

        const dateEle = document.createElement("div");
        dateEle.className = "date-number";
        dateEle.textContent = day;
        cell.appendChild(dateEle);

        const eventToday = events.filter(e => e.date === dateStr);
        const eventBox = document.createElement("div");
        eventBox.className = "events";

        //render events
        eventToday.forEach(event => {
            const ev = document.createElement("div");
            ev.className = "event";

            const courseEle = document.createElement("div");
            courseEle.className = "course";
            courseEle.textContent = event.title.split(" - ")[0];

            const instructorEle = document.createElement("div");
            instructorEle.className = "instructor";
            instructorEle.textContent = "Instructor: " + event.title.split(" - ")[1];

            const timeEle = document.createElement("div");
            timeEle.className = "time";
            timeEle.textContent = "Time " + event.start_time + " - " + event.end_time;

            ev.appendChild(courseEle);
            ev.appendChild(instructorEle);
            ev.appendChild(timeEle);
            eventBox.appendChild(ev);
        });

        //overlay buttons
        const overlay = document.createElement("div");
        overlay.className = "day-overlay";

        const addBtn = document.createElement("button");
        addBtn.className = "overlay-button";
        addBtn.textContent = "+ Add";
        addBtn.onclick = e => {
            e.stopPropagation();
            openModalForAdd(dateStr);
        };

        overlay.appendChild(addBtn);

        if (eventToday.length > 0) {
            const editBtn = document.createElement("button");
            editBtn.className = "overlay-button";
            editBtn.textContent = "Edit";
            editBtn.onclick = e => {
                e.stopPropagation();
                openModalForEdit(eventToday);
            };

            overlay.appendChild(editBtn);
        }

        cell.appendChild(overlay);
        cell.appendChild(eventBox);
        calendarEle.appendChild(cell);
    }
}


function openModalForAdd(dateStr) {
    document.getElementById("formAction").value = "add";
    document.getElementById("eventId").value = "";
    document.getElementById("deleteEventId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("instructorName").value = "";
    document.getElementById("startDate").value = dateStr;
    document.getElementById("endDate").value = dateStr;
    document.getElementById("startTime").value = "09:00";
    document.getElementById("endTime").value = "10:00";

    const selector = document.getElementById("eventSelector");
    const wrapper = document.getElementById("eventSelectorWrapper");
    if (selector && wrapper) {
        selector.innerHTML = "";
        wrapper.style.display = "none";
    }

    modalEle.style.display = "flex";
}

function openModalForEdit(eventsOnDate) {
    document.getElementById("formAction").value = "edit";
    modalEle.style.display = "flex";

    const selector = document.getElementById("eventSelector");
    const wrapper = document.getElementById("eventSelectorWrapper");

    eventsOnDate.forEach(e => {
        const option = document.createElement("option");
        option.value = JSON.stringify(e);
        option.textContent = `${e.title} (${e.start} ➡ ${e.end})`;
        selector.appendChild(option);
    });
    //makes the default option the first one that's automatically selected
    selector.selectedIndex = 1;

    if (eventsOnDate.length > 1) {
        wrapper.style.display = "block";
    } else {
        wrapper.style.display = "none";
    }

    handleEventSelection(JSON.stringify(eventsOnDate[0]));
}

//autofill the form
function handleEventSelection(eventJSON){
    const event = JSON.parse(eventJSON);
    document.getElementById("eventId").value = event.id;
    document.getElementById("deleteEventId").value = event.id;

    const [course, instructor] = event.title.split(" - ").map(e => e.trim());
    document.getElementById("courseName").value = course || "";
    document.getElementById("instructorName").value = instructor || "";
    document.getElementById("startDate").value = event.start || "";
    document.getElementById("endDate").value = event.end || "";
    document.getElementById("startTime").value = event.start_time || "";
    document.getElementById("endTime").value = event.end_time || "";
}


function closeModal() {
    modalEle.style.display = "none";
}

//month navigation
function changeMonth(offset){
    //click next and it's the last month/year option
    if (monthEle.selectedIndex + offset >= 12 && yearEle.value >= today.getFullYear() + yearsInFuture){
        forwardEle.hidden = true;
        return;
    }
    
    if (forwardEle.hidden == true) forwardEle.hidden = false;

    currentDate.setMonth(currentDate.getMonth() + offset);
    if (monthEle.selectedIndex + offset >= 12) {
            yearEle.selectedIndex += 1;
            monthEle.selectedIndex = 0;
    }
    else if (monthEle.selectedIndex + offset < 0 ) {
        monthEle.selectedIndex = 11
    }
    else {
        monthEle.selectedIndex += offset;
    }

    renderCalendar(currentDate);
}

//live digital clock
function updateClock() {
    const now = new Date();
    const clock = document.getElementById("clock");
    clock.textContent = [
        now.getHours().toString().padStart(2, '0'),
        now.getMinutes().toString().padStart(2, '0'),
        now.getSeconds().toString().padStart(2, '0')
    ].join(":");
}


//initialization
renderCalendar(currentDate);
updateClock();
setInterval(updateClock, 1000);