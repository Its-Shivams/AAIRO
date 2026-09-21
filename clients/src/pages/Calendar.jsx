import React, { useState, useEffect } from 'react';
import EVENTS_DATA from '../api/calendar.json'
import {
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt
} from 'react-icons/fa';

const Calendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsForDate, setEventsForDate] = useState([]);

  const getColorStyle = (colorName) => {
    const colorMap = {
      'dark green': '#1B5E20',
      'light blue': '#03A9F4',
      'red': '#F44336',
      'blue': '#2196F3',
      'green': '#4CAF50',
      'yellow': '#FFEB3B',
      'orange': '#FF9800',
      'Black': '#000000',
    };

    const lowerColor = colorName.toLowerCase();
    return colorMap[lowerColor] || '#607D8B'; // default color if not found
  };

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    showEventsForDate(today);
  }, []);

 const renderCalendar = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  const parseEventDate = (dateStr) => {
    //  YEAR_MONTH_DATE
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d); // safe, no timezone shift
  };

  // Fill in leading empty days
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-12 md:h-16 p-1 md:p-2"></div>);
  }

  // Fill in days of the month
  for (let day = 1; day <= lastDayOfMonth; day++) {
    const today = new Date();
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    // ✅ Filter events for this day
    const dayEvents = EVENTS_DATA.filter((event) => {
      const eventDate = parseEventDate(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });

    const hasEvent = dayEvents.length > 0;
    const primaryEvent = dayEvents[0];

    const isSelected =
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    days.push(
      <div
        key={`day-${day}`}
        className={`h-12 md:h-16 p-1 md:p-2 rounded-md flex flex-col items-center justify-center cursor-pointer text-xs md:text-sm transition-all duration-200 relative group ${
          isToday
            ? "bg-blue-600 text-white font-bold shadow-lg"
            : hasEvent
            ? "text-white hover:brightness-110"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
        } ${isSelected ? "ring-2 ring-blue-400" : ""}`}
        style={
          hasEvent
            ? {
                backgroundColor: getColorStyle(primaryEvent.color),
                border: isSelected ? "2px solid #60A5FA" : "none",
              }
            : {}
        }
        onClick={() => {
          const newDate = new Date(year, month, day);
          setSelectedDate(newDate);
          showEventsForDate(newDate);
        }}
      >
        <span>{day}</span>
        {hasEvent && (
          <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-yellow-400 mt-1"></div>
        )}

        {hasEvent && (
          <div className="absolute hidden group-hover:block z-10 w-56 p-3 bg-gray-800 rounded-md shadow-lg text-white text-xs bottom-full mb-2 left-1/2 transform -translate-x-1/2 border border-gray-700">
            <div className="font-semibold mb-1 truncate">{primaryEvent.title}</div>
            <div className="flex items-center mb-1 text-gray-300">
              <FaClock className="mr-2" size={10} />
              <span>{primaryEvent.time}</span>
            </div>
            <div className="flex items-center mb-1 text-gray-300">
              <FaMapMarkerAlt className="mr-2" size={10} />
              <span className="truncate">{primaryEvent.location}</span>
            </div>
            <div className="text-gray-400 text-xxs mt-1 line-clamp-2">
              {primaryEvent.description}
            </div>
          </div>
        )}
      </div>
    );
  }

  return days;
};


  const showEventsForDate = (date) => {
    const eventsForDate = EVENTS_DATA.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
    setEventsForDate(eventsForDate);
  };

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);

    const firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    setSelectedDate(firstDay);
    showEventsForDate(firstDay);
  };

  const formatDateDisplay = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'conference': return 'bg-purple-600 text-purple-100';
      case 'workshop': return 'bg-blue-600 text-blue-100';
      case 'competition': return 'bg-red-600 text-red-100';
      case 'lecture': return 'bg-green-600 text-green-100';
      case 'presentation': return 'bg-yellow-600 text-yellow-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 mt-14 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            Event Calendar
          </h1>
          <p className="text-gray-400 text-lg">
            Stay updated with our upcoming events and activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => changeMonth(-1)}
                  className="text-blue-400 hover:text-blue-300 text-xl p-2 hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <FaChevronLeft />
                </button>
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {formatMonthYear(currentDate)}
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  className="text-blue-400 hover:text-blue-300 text-xl p-2 hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 md:gap-2 text-center font-semibold text-gray-400 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-2">{day}</div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {renderCalendar()}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span className="text-gray-400">Today</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: getColorStyle('dark green') }}
                  ></div>
                  <span className="text-gray-400">Event Day</span>
                </div> */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-400">Event Indicator</span>
                </div>
              </div>
            </div>
          </div>

          {/* Events Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl sticky top-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-400" />
                Events
              </h3>
              <p className="text-blue-400 text-sm mb-4">
                {formatDateDisplay(selectedDate)}
              </p>

              {eventsForDate.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {eventsForDate.map((event) => (
                    <div key={event.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{event.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs mb-3">{event.description}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaClock />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaMapMarkerAlt />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 text-4xl mb-3">
                    <FaCalendarAlt />
                  </div>
                  <p className="text-gray-400 text-sm">No events scheduled for this date</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS_DATA.slice(0, 6).map((event) => (
              <div key={event.id} className="bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-blue-400 text-lg font-semibold">{event.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;