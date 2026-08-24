import { useState, useEffect, useMemo } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function DateTimeWidget() {
  const [now, setNow] = useState(new Date())
  const [showCal, setShowCal] = useState(false)
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())
  const [viewYear, setViewYear] = useState(new Date().getFullYear())

  // Live clock — tick every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Reset calendar view when opened
  useEffect(() => {
    if (showCal) {
      setViewMonth(new Date().getMonth())
      setViewYear(new Date().getFullYear())
    }
  }, [showCal])

  const today = now
  const todayDate = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  const hours = String(today.getHours()).padStart(2, '0')
  const minutes = String(today.getMinutes()).padStart(2, '0')
  const seconds = String(today.getSeconds()).padStart(2, '0')

  const dateStr = today.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  // Calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const daysInPrev = new Date(viewYear, viewMonth, 0).getDate()

    const cells = []

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrev - i, current: false })
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        current: true,
        isToday: d === todayDate && viewMonth === todayMonth && viewYear === todayYear
      })
    }

    // Next month leading days
    const remaining = 42 - cells.length
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, current: false })
    }

    return cells
  }, [viewMonth, viewYear, todayDate, todayMonth, todayYear])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  return (
    <div className="relative">
      {/* Clock + Date display */}
      <button
        onClick={() => setShowCal(!showCal)}
        className="flex items-center gap-2 hover:text-db-gold transition-colors cursor-pointer"
        title="Click for calendar"
      >
        <span className="font-mono font-bold text-db-gold tracking-wider text-xs">
          {hours}:{minutes}:{seconds}
        </span>
        <span className="hidden sm:inline text-blue-200">|</span>
        <span className="hidden sm:inline text-xs">{dateStr}</span>
        <CalendarDays size={13} className="text-db-gold" />
      </button>

      {/* Calendar dropdown */}
      {showCal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowCal(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72 text-gray-800">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <div className="font-bold text-db-navy font-display">
                {MONTHS[viewMonth]} {viewYear}
              </div>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarDays.map((cell, i) => (
                <div
                  key={i}
                  className={`
                    text-center py-1.5 text-xs rounded-lg transition-all
                    ${!cell.current ? 'text-gray-300' : 'text-gray-700'}
                    ${cell.isToday
                      ? 'bg-db-blue text-white font-bold shadow-md ring-2 ring-db-blue/30'
                      : cell.current
                        ? 'hover:bg-db-light cursor-pointer'
                        : ''
                    }
                  `}
                >
                  {cell.day}
                </div>
              ))}
            </div>

            {/* Today indicator */}
            <div className="mt-3 pt-3 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">
                Today: <span className="font-bold text-db-blue">{dateStr}</span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
