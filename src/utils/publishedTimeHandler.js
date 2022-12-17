const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const publishedTimeHandler = (createdAt) => {
    const dateNowInMs = Date.now();
    const timeDifference = dateNowInMs - createdAt;

    const dateNow = new Date(dateNowInMs);
    const currentDay = dateNow.getDate();
    const currentMonth = dateNow.getMonth();
    const currentYear = dateNow.getFullYear();

    const dateOfCreation = new Date(createdAt);
    const minuteOfCreation = dateOfCreation.getMinutes();
    const hourOfCreation = dateOfCreation.getHours();

    const minuteOfCreationString = minuteOfCreation >= 10 ? minuteOfCreation : "0" + minuteOfCreation;
    const hourOfCreationString = hourOfCreation >= 10 ? hourOfCreation : "0" + hourOfCreation;

    const dayOfCreation = dateOfCreation.getDate();
    const monthOfCreation = dateOfCreation.getMonth();
    const monthNameOfCreation = monthNames[dateOfCreation.getMonth()];
    const yearOfCreation = dateOfCreation.getFullYear();

    if (timeDifference <= 60 * 1000) return "1 минуту назад";
    if (timeDifference <= 5 * 60 * 1000) return "5 минут назад";
    if (timeDifference <= 10 * 60 * 1000) return "10 минут назад";
    if (timeDifference <= 30 * 60 * 1000) return "30 минут назад";
    if (
        dayOfCreation === currentDay &&
        monthOfCreation === currentMonth &&
        yearOfCreation === currentYear
    ) return `${hourOfCreationString}:${minuteOfCreationString}`;
    if (dayOfCreation !== currentDay && monthOfCreation === currentMonth && yearOfCreation === currentYear) return `${dayOfCreation} ${monthNameOfCreation}`;
    if (monthOfCreation !== currentMonth && yearOfCreation === currentYear) return `${dayOfCreation} ${monthNameOfCreation}`;
    if (yearOfCreation !== currentYear) return `${dayOfCreation} ${monthNameOfCreation}  ${yearOfCreation}`;
};

export default publishedTimeHandler;
