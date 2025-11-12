<?php
include "calendar.php";
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Calendar Project</title>
        <meta name="description" content="Calendar Project from freecodecamp" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=inter:wght@400;600;700&display=swap">
        <link rel="stylesheet" href="style.css" />
    </head>

    <body>
        <header>
            <h1>📆 Course Calendar</h1>
            <h2>My Calendar Project</h2>
        </header>
        
        <!--success/error messages-->
        <?php if ($successMsg): ?>
            <div class="alert success"><?= $successMsg ?></div>
        <?php elseif ($errorMsg): ?>
            <div class="alert error"><?= $errorMsg ?></div>
        <?php endif; ?>

        <!--Clock-->
        <div class="clock-container">
            <div id="clock"></div>
        </div>

        <!--Calendar section-->
        <div class="calendar">
            <div class="nav-button-container">
                <button class="nav-button" onclick="changeMonth(-1)" id="backward-nav">⏮</button>
                <!-- <h2 id="monthYear" style="margin: 0"></h2> -->
                 <select name="month" id="monthSelect" type="monthYear"></select>
                 <select name="year" id="yearSelect" type="monthYear"></select>
                <button class="nav-button" onclick="changeMonth(1)" id="forward-nav">⏭</button>
            </div>

            <div class="calendar-grid" id="calendar"></div>
        </div>

        <!--Modal for Add/Edit/Delete Appointments-->
        <div class="modal" id="eventModal">
            <div class="modal-content">
                <!--Dropdown selector -->
                <div id="eventSelectorWrapper" style="display: none;">
                    <label for="eventSelector">
                        <strong>Select Event:</strong>
                    </label>
                    <select id="eventSelector" onchange="handleEventSelection(this.value)">
                        <option disabled selected>Choose Event...</option>
                    </select>
                </div>

                <!--Main Form-->
                <form method="POST" id="eventForm">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="event_id" id="eventId">

                    <label for="courseName">Course Title:</label>
                    <input type="text" name="course_name" id="courseName" required>

                    <label for="instructorName">Instructor Name:</label>
                    <input type="text" name="instructor_name" id="instructorName" required>

                    <label for="startDate">Start Date:</label>
                    <input type="date" name="start_date" id="startDate" required></label>

                    <label for="endDate">End Date:</label>
                    <input type="date" name="end_date" id="endDate" required>

                    <label for="start_time">Start Time:</label>
                    <input type="time" name="start_time" id="startTime" required>

                    <label for="end_time">End Time:</label>
                    <input type="time" name="end_time" id="endTime" required>

                    <button type="save">Save</button>
                </form>

                <!--Delete form-->
                <form method="POST" onsubmit="return confirm('Are you sure you want to delete this event?')">
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="event_id" id="deleteEventId">
                    <button type="delete">Delete</button>
                </form>

                <!--Cancel form-->
                <button type="cancel" onclick="closeModal()">Cancel</button>
            </div>
        </div>

        <script>
            const events = <?= json_encode($eventsFromDB, JSON_UNESCAPED_UNICODE); ?>;
        </script>

        <script src="calendar.js"></script>
    </body>

</html>