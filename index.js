'use strict';

/**
 * Hearty datetime helper is a small library that can provide small helper functions useful for date and it's uses
 *
 * @module hearty-datetime-helper
 * @typicalname heartyDateHelper
 * @example
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 */



/**
 * Global variables that we will use in this package
 */
var pattern = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    simpleDateTime: "dd/mm/yyyy"
},
    dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


exports.getMonthNameWithOrdinal = getMonthNameWithOrdinal;
exports.strToDate = strToDate;
exports.isToday = isToday;
exports.daysdiffFromToday = daysdiffFromToday;
exports.daysdiff = daysdiff;
exports.formatMinutes = formatMinutes;
exports.handleDisplayDigit = handleDisplayDigit;
exports.getDuration = getDuration;
exports.displayDate = displayDate;
exports.getDayFromDate = getDayFromDate;
exports.getMonthFromDate = getMonthFromDate;
exports.isPastDate = isPastDate;
exports.formatDate = formatDate;
exports.getDaysAhead = getDaysAhead;
exports.numberOfDays = numberOfDays;
exports.getDaysBehind = getDaysBehind;
exports.isDateInBetween = isDateInBetween;
exports.getDateWithOrdinal = getDateWithOrdinal;
exports.getDateFromTimeStamp = getDateFromTimeStamp;
exports.getConvertedEpochdate = getConvertedEpochdate;
exports.getTodaydate = getTodaydate;


/**
 * @name getMonthNameWithOrdinal
 * @typicalname getMonthNameWithOrdinal
 * @param {Number}
 * @return {String}
 * @example getMonthNameWithOrdinal(5), getMonthNameWithOrdinal(4)
 * @description Return the Month name for given ordinal
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = 6
 *
 * heartyDateTimeHelper.getMonthNameWithOrdinal(input)
 * Output: "June"
 *
 */

function getMonthNameWithOrdinal(ordinal) {
    return (parseInt(ordinal) <= 12) ? monthNames[parseInt(ordinal) + 11] : '';
}



/**
 * @name strToDate
 * @typicalname strToDate
 * @param {String, String}
 * @return {String}
 * @example strToDate('21/10/2018','yyyy-mm-dd'), strToDate('21-10-2018')
 * @description Returns the date in the given valid format (Please provide valid input date) & if no output format is provided, output will return in default date format
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
 * @support ouput formats : dd/mm/yyyy || dd-mm-yyyy || mm/dd/yyyy || mm-dd-yyyy || yyyy/mm/dd || yyyy-mm-dd || yyyy/dd/mm || yyyy-dd-mm
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = ('21/10/2018','yyyy-mm-dd')
 *
 * heartyDateTimeHelper.strToDate(input)
 * Output: "2018-10-21"
 *
 */

function strToDate(dt, format) {
    var isDate = (Object.prototype.toString.call(dt) == "[object Date]") ? true : false;
    format = format || false;
    var date;
    if (isDate == true) {
        date = dt;
    } else {
        dt = String(dt);
        var time = " 00:00:00";
        var date_str;
        if (dt.indexOf(":") == -1) {
            date_str = forumulateDateStr(dt);
        } else {
            if (dt.indexOf("-") == -1 && dt.indexOf("/") == -1 && dt.indexOf("_")) {
                var nd = new Date();
                dt = nd.getDate() + "/" + (nd.getMonth() + 1) + "/" + nd.getFullYear() + " " + dt;
            };
            var dts_arr = dt.split(" ");
            date_str = forumulateDateStr(dts_arr[0]);
            time = " " + dts_arr[1];
        };
        if (isNaN(parseInt(dt)) == false && date_str == null) {
            date = new Date(parseInt(dt) * 1000);
        } else if (date_str == null) {
            date = new Date(dt);
        } else {
            date = new Date(date_str + time);
        }
    };
    if (format != false) {
        date = formatDate(date, format);
    }
    return date;

    function forumulateDateStr(dts) {
        var dt_arr = "";
        if (dts.indexOf("-") > 0) {
            dt_arr = dts.split("-");
        } else if (dts.indexOf("/") > 0) {
            dt_arr = dts.split("/");
        } else if (dts.indexOf("_") > 0) {
            dt_arr = dts.split("_");
        } else {
            dt_arr = {};
        }

        var date_str = null;
        if (dt_arr[2] && dt_arr[2].length == 4) { //date/month/year
            date_str = dt_arr[2] + "/" + dt_arr[1] + "/" + dt_arr[0];
        } else if (dt_arr[0] && dt_arr[0].length == 4) { //year/month/date
            date_str = dt_arr[0] + "/" + dt_arr[1] + "/" + dt_arr[2];
        };
        return date_str;
    }

}



/**
 * @name isToday
 * @typicalname isToday
 * @param {String}
 * @return {Boolean}
 * @example isToday(new Date()), isToday('21-10-2018'), isToday('21/10/2018')
 * @description If we provided valid date in supported format, it will return true or false if the input is today
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = '21-10-2018'
 *
 * heartyDateTimeHelper.isToday(input)
 * Output: false
 *
 */

function isToday(dt) {

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var target = dt;
    if (typeof target.setHours == 'undefined') {
        target = strToDate(target);
    }
    target.setHours(0, 0, 0, 0);
    if (today.getTime() == target.getTime()) {
        return true;
    };
    return false;
}



/**
 * @name daysdiffFromToday
 * @typicalname daysdiffFromToday
 * @param {String}
 * @return {Number}
 * @example daysdiffFromToday('28/10/2018'), daysdiffFromToday('27-10-2018')
 * @description Takes the input of valid date, it return days difference from input date & today's date
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = '28/10/2018'
 *
 * heartyDateTimeHelper.daysdiffFromToday(input)
 * Output: 5
 *
 */

function daysdiffFromToday(dt) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var target = dt;
    if (typeof target.setHours == 'undefined') {
        target = strToDate(target);
    }
    target.setHours(0, 0, 0, 0);
    return (target.getTime() - today.getTime()) / 86400000;
}



/**
 * @name daysdiff
 * @typicalname daysdiff
 * @param {String, String}
 * @return {String}
 * @example daysdiff('21/10/2018','28/10/2018'), daysdiff('21-10-2018', '12-11-2018')
 * @description Returns difference between dates you provided, If we provide today date also like 'new Date()', It will convert to same format will return the result 
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = (new Date(), '2018-11-22')
 *
 * heartyDateTimeHelper.daysdiff(input)
 * Output: 21
 *
 */

function daysdiff(dt1, dt2) {
    var first_date = dt1;
    var second_date = dt2;
    if (typeof first_date.setHours == 'undefined') {
        first_date = strToDate(first_date);
    }
    if (typeof second_date.setHours == 'undefined') {
        second_date = strToDate(second_date);
    }
    first_date.setHours(0, 0, 0, 0);
    second_date.setHours(0, 0, 0, 0);
    return (second_date.getTime() - first_date.getTime()) / 86400000;
}



/**
 * @name formatMinutes
 * @typicalname formatMinutes
 * @param { Number }
 * @return { String }
 * @example formatMinutes(1500), formatMinutes(1430)
 * @description Returns the number of minutes in HH:MM format from the given input
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = 1760
 *
 * heartyDateTimeHelper.formatMinutes(input)
 * Output: "29:20 hrs"
 *
 */

function formatMinutes(time) {
    var hr = parseInt(parseInt(time) / 60);
    var min = parseInt(time) % 60;
    hr = (hr < 10) ? "0" + hr : hr;
    min = (min < 10) ? "0" + min : min;
    return hr + ":" + min + " hrs";
}



/**
 * @name handleDisplayDigit
 * @typicalname handleDisplayDigit
 * @param { Number }
 * @return { Number }
 * @example handleDisplayDigit(4), handleDisplayDigit(12)
 * @description If the given input is less than 10, it will append 0 before the number
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = 4
 *
 * heartyDateTimeHelper.handleDisplayDigit(input)
 * Output: 04
 *
 */

function handleDisplayDigit(value) {
    return value < 10 ? '0' + value : value.toString();
}



/**
 * @name getDuration
 * @typicalname getDuration
 * @param { Params }
 * @return { Object }
 * @example getDuration('22/10/2018', '28/11/2018'), getDuration('12:00', '15:30')
 * @description It will return the duration in the form of object. It will return years, months, days, hours, minutes and   seconds. 
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || HH:MM
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = ('22/10/2018', '28/11/2018')
 *
 * heartyDateTimeHelper.getDuration(input)
 * Output: { day: "06", displayDiff: "01mo 06d", duration: 3196800, hour: "00", minute: "00", month: "01", second: "00", year: "00"}
 *
 */

function getDuration(startTime, endTime) {
    startTime = strToDate(startTime, false);
    endTime = strToDate(endTime, false);

    var startTimeObj = new Date(startTime);
    var endTimeObj = new Date(endTime);

    var timeDiff = endTimeObj.getTime() - startTimeObj.getTime();
    if (timeDiff < 0) {
        // add one day to end time
        timeDiff = (endTimeObj.getTime() + 86400000) - startTimeObj.getTime();
    }

    var diffDate = new Date(timeDiff);

    var inDays = handleDisplayDigit(diffDate.getDate() - 1);
    var inMonths = handleDisplayDigit(diffDate.getMonth());
    var inYears = handleDisplayDigit(diffDate.getFullYear() - 1970);

    var inHours = handleDisplayDigit(diffDate.getUTCHours());
    var inMinutes = handleDisplayDigit(diffDate.getUTCMinutes());
    var inSecs = handleDisplayDigit(diffDate.getUTCSeconds());
    var formatStr = {
        'year': inYears,
        'month': inMonths,
        'day': inDays,
        'hour': inHours,
        'minute': inMinutes,
        'second': inSecs,
        'displayDiff': 'Now'
    };

    if (inYears > 0) {
        formatStr['displayDiff'] = inYears + 'yr ' + inMonths + 'mo ';
    } else if (inMonths > 0) {
        formatStr['displayDiff'] = inMonths + 'mo ' + inDays + 'd';
    } else if (inDays > 0) {
        formatStr['displayDiff'] = inDays + 'd ' + inHours + 'h';
    } else if (inHours > 0) {
        formatStr['displayDiff'] = inHours + 'h ' + inMinutes + 'm';
    } else if (inMinutes > 0) {
        formatStr['displayDiff'] = inMinutes + 'm ';
    }
    formatStr['duration'] = timeDiff / 1000;

    return formatStr;
}


/**
 * @name displayDate
 * @typicalname displayDate
 * @param { Params }
 * @return { String }
 * @example displayDate('22/10/2018') , displayDate('22-10-2018', true)
 * @description It will return the date in string format, such as "Mon, 22 Oct". If we mention year parameter true, It will add year also output.
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = '22/10/2018'
 *
 * heartyDateTimeHelper.displayDate(input)
 * Output: "Mon, 22 Oct 2018"
 *
 */

function displayDate(dt, year) {
    var date = strToDate(dt);
    var dDate = dayNames[date.getDay()] + ", " + date.getDate() + " " + monthNames[date.getMonth()];
    if (year) {
        dDate = dDate + " " + date.getFullYear();
    };
    return dDate;
}



/**
 * @name getDayFromDate
 * @typicalname getDayFromDate
 * @param { Date }
 * @return { String }
 * @example getDayFromDate('22/10/2016') , getDayFromDate('22-10-2018')
 * @description It will return the day name from given date.
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = '22/10/2016'
 *
 * heartyDateTimeHelper.getDayFromDate(input)
 * Output: "Sat"
 *
 */

function getDayFromDate(dt) {
    var date = strToDate(dt);
    return dayNames[date.getDay()];
}



/**
 * @name getMonthFromDate
 * @typicalname getMonthFromDate
 * @param { Date }
 * @return { String }
 * @example getMonthFromDate('22/10/2016') , getMonthFromDate('22-10-2018')
 * @description It will return the day name from given date.
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = '22/10/2016'
 *
 * heartyDateTimeHelper.getMonthFromDate(input)
 * Output: "Oct"
 *
 */

function getMonthFromDate(dt) {
    var date = strToDate(dt);
    return monthNames[date.getMonth()]
}



/**
 * @name isPastDate
 * @typicalname isPastDate
 * @param { Date }
 * @return { Boolean }
 * @example isPastDate('22/10/2016') , isPastDate('22-10-2020')
 * @description It will return true if provided date is past date or will return false if it's not
 * @support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = '22-10-2020'
 *
 * heartyDateTimeHelper.isPastDate(input)
 * Output: false
 *
 */

function isPastDate(dt) {
    var src_date = strToDate(dt);
    src_date = new Date(src_date.getFullYear(), src_date.getMonth(), src_date.getDate(), 0, 0, 0);
    var target_date = new Date();
    target_date.setHours(0, 0, 0);
    if ((src_date.getFullYear() == target_date.getFullYear()) && (src_date.getMonth() == target_date.getMonth()) && (src_date.getDate() == target_date.getDate())) {
        return false;
    };
    if (src_date.getTime() > target_date.getTime()) {
        return false;
    };
    return true;
}



/**
 * @name formatDate
 * @typicalname formatDate
 * @param { Date, String }
 * @return { String }
 * @example formatDate('22/10/2016', 'dd-mm-yyyy') , formatDate('22-10-2020', 'yyyy/mm/dd')
 * @description It will return formated date to provided format from the input date
 * @support patterns : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = ('22/10/2016', 'yyyy/mm/dd')
 *
 * heartyDateTimeHelper.formatDate(input)
 * Output: "2016/10/22"
 *
 */

function formatDate(date, pattern) {
    if (!date) {
        return date;
    }
    date = String(strToDate(date, false));
    var utc = false;
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;

    var pad = function (val, len) {
        var zero = '0000000000';
        val = String(val);
        len = len || 2;
        if (val.length < len) {
            var s = len - val.length;
            val = zero.substr(0, s) + "" + val;
        }
        return val;
    };

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date();
    if (isNaN(date))
        throw new SyntaxError("invalid date");
    pattern = String(pattern[pattern] || pattern || pattern["default"]);

    var _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
            d: d,
            dd: pad(d),
            ddd: dayNames[D],
            dddd: dayNames[D + 7],
            m: m + 1,
            mm: pad(m + 1),
            mmm: monthNames[m],
            mmmm: monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            M: M,
            MM: pad(M),
            s: s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? "a" : "p",
            tt: H < 12 ? "am" : "pm",
            T: H < 12 ? "A" : "P",
            TT: H < 12 ? "AM" : "PM"

        };

    return pattern.replace(token, function ($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
}



/**
 * @name getDaysAhead
 * @typicalname getDaysAhead
 * @param { Date, Number, String }
 * @return { String }
 * @example getDaysAhead('22/10/2016', 20, 'dd-mm-yyyy') , getDaysAhead('22-10-2020', 25, new Date())
 * @description It will return the date days ahead of given date with the provided format.
 * @support patterns : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = ('22/10/2016', 20, 'yyyy/mm/dd')
 *
 * heartyDateTimeHelper.getDaysAhead(input)
 * Output: "2016/11/11"
 *
 */

function getDaysAhead(dt, days, as) {
    var date = strToDate(dt);
    date.setDate((date.getDate()) + days);
    return (typeof as == "string") ? formatDate(date, as) : date;
}



/**
 * @name numberOfDays
 * @typicalname numberOfDays
 * @param { Number, Number }
 * @return { Number }
 * @example numberOfDays(5,2018), numberOfDays(2, 2012)
 * @description It will return the number of days present in given month of given year
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = (2, 2012)
 *
 * heartyDateTimeHelper.numberOfDays(input)
 * Output: 29
 *
 */

function numberOfDays(m, y) {
    return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}



/**
 * @name getDaysBehind
 * @typicalname getDaysBehind
 * @param { Date, Number, String }
 * @return { String }
 * @example getDaysBehind('22/10/2016', 20, 'dd-mm-yyyy') , getDaysBehind('22-10-2020', 25, new Date())
 * @description It will return the date days behind of given date with the provided format.
 * @support patterns : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = ('22/10/2016', 20, 'yyyy/mm/dd')
 *
 * heartyDateTimeHelper.getDaysBehind(input)
 * Output: "02-10-2016"
 *
 */

function getDaysBehind(dt, days, as) {
    var date = strToDate(dt);
    date.setDate(date.getDate() - days);
    return (typeof as == "string") ? formatDate(date, as) : date;
}



/**
 * @name isDateInBetween
 * @typicalname isDateInBetween
 * @param { Date, Date, Date }
 * @return { Boolean }
 * @example isDateInBetween('22/10/2016', '10/10/2018','22/11/2017',) , isDateInBetween('22-10-2020', 25, new Date())
 * @description It will return if the given date is between provided date limits
 * @support patterns : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = ('20/03/2018', new Date(), '21/06/2018')
 *
 * heartyDateTimeHelper.isDateInBetween(input)
 * Output: true
 *
 */

function isDateInBetween(startDate, endDate, dateToCheck) {
    var startDateObj = strToDate(startDate);
    var endDateObj = strToDate(endDate);
    var dateToCheckObj = strToDate(dateToCheck);
    if (dateToCheckObj >= startDateObj && dateToCheckObj <= endDateObj) {
        return true;
    }

    return false;
}




/**
 * @name getDateWithOrdinal
 * @typicalname getDateWithOrdinal
 * @param { Number }
 * @return { string }
 * @example getDateWithOrdinal(30) , getDateWithOrdinal(23)
 * @description It will return date value with ordinal if we provide number as input
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = 23
 *
 * heartyDateTimeHelper.getDateWithOrdinal(input)
 * Output: '23rd'
 *
 */

function getDateWithOrdinal(date) {
    if (date % 10 == 1) {
        return date + 'st';
    } else if (date % 10 == 2) {
        return date + 'nd';
    } else if (date % 10 == 3) {
        return date + 'rd';
    } else {
        return date + 'th';
    }
}



/**
 * @name getDateFromTimeStamp
 * @typicalname getDateFromTimeStamp
 * @param { Number }
 * @return { string }
 * @example getDateFromTimeStamp(1541658512) , getDateFromTimeStamp(1541658537)
 * @description It will return the converted date from given Unix epoch time input
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = 1541658537
 *
 * heartyDateTimeHelper.getDateFromTimeStamp(input)
 * Output: "8th Nov, 2018"
 *
 */

function getDateFromTimeStamp(dateInput, onlyText) {
    var dateValue = getConvertedEpochdate(dateInput);
    if (dateValue != '') {
        var data = new Date(dateValue);
        var dateNumber = data.getDate();
        if (dateNumber < 10) {
            dateNumber = parseInt(dateNumber, 10);
        }
        if (onlyText) {
            var dateInNumber = dateNumber;
        } else {
            var dateInNumber = getDateWithOrdinal(dateNumber);
        }
        var dateYear = data.getFullYear().toString();
        var datemonth = monthNames[data.getMonth()];
        var finaldate = dateInNumber + " " + datemonth + ", " + dateYear;
        return finaldate;
    }
}



/**
 * @name getConvertedEpochdate
 * @typicalname getConvertedEpochdate
 * @param { Number }
 * @return { Number }
 * @example getConvertedEpochdate(1541658512) , getConvertedEpochdate(1541658537)
 * @description It will return the converted Unix epoch time date from given Unix epoch time input
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * var input = 1541658537
 *
 * heartyDateTimeHelper.getConvertedEpochdate(input)
 * Output: 1541658537000
 *
 */

function getConvertedEpochdate(inputtext) {
    var epoch = 0;
    var rest = 0;
    if ((inputtext >= 100000000000000) || (inputtext <= -100000000000000)) {
        epoch = Math.round(inputtext / 1000000);
        inputtext = Math.round(inputtext / 1000);
    } else if ((inputtext >= 100000000000) || (inputtext <= -100000000000)) {
        // Assuming that this timestamp is in milliseconds
        epoch = Math.floor(inputtext / 1000);
        rest = inputtext - (epoch * 1000);
    } else {
        if (inputtext < -6857222400) {
            // Dates before 14 september 1752 (pre-Gregorian calendar) are not accurate;
            return false;
        }
        if (inputtext > 10000000000)
            extraInfo = 1;
        inputtext = (inputtext * 1000);
    }
    return inputtext;
}



/**
 * @name getTodaydate
 * @typicalname getTodaydate
 * @param no inputs
 * @return { string }
 * @description It will return today's date in dd/mm/yyyy format
 *
 * @usage
 * var heartyDateTimeHelper = require('hearty-datetime-helper')
 * no inputs
 *
 * heartyDateTimeHelper.getTodaydate(input)
 * Output: "08/11/2018"
 *
 */

function getTodaydate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;

    return today;
}
