import styles from './AddToCalendar.module.css';

const eventDetails = {
    title: 'WU+DD Mingel 2026',
    start: '20260422T130000Z',
    end: '20260422T143000Z',
    location: 'Visual Arena, Göteborg',
    description: 'Networking event för studenter och företag'
}

const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`

const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${eventDetails.start}\nDTEND:${eventDetails.end}\nSUMMARY:${eventDetails.title}\nLOCATION:${eventDetails.location}\nDESCRIPTION:${eventDetails.description}\nEND:VEVENT\nEND:VCALENDAR`

const icsUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`

export default function AddToCalendar() {
    const handleClick = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        const isAndroid = /Android/.test(navigator.userAgent)

        if (isAndroid) {
            window.open(googleCalendarUrl, '_blank')
        } else {
            // iOS och desktop använder .ics
            window.location.href = icsUrl
        }
    }

    return (
        <button className={styles.calendarBtn} onClick={handleClick}>
            Add to calendar +
        </button>
    )
}