## hearty-datetime-helper [![NPM version](https://img.shields.io/npm/v/hearty-datetime-helper.svg)](https://www.npmjs.com/package/hearty-datetime-helper)
Hearty datetime helper is a small library that can provide small helper functions useful for date and time.getMonthNameWithOrdinal, strToDate, isToday, daysdiff, etc,.


# Installation

npm i hearty-datetime-helper


# Usage

var heartyDateTimeHelper = require('heartyDateTimehelper')


## getMonthNameWithOrdinal

Return the Month name for given ordinal
```javascript

    var input = 6
    
    heartyDateTimeHelper.getMonthNameWithOrdinal(input)
    Output: "June"

```



## strToDate

Returns the date in the given valid format (Please provide valid input date) & if no output format is provided, output will return in default date format
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
```javascript

    var input = ('21/10/2018','yyyy-mm-dd')

    heartyDateTimeHelper.strToDate(input)
    Output: "2018-10-21"

```



## isToday

If we provided valid date in supported format, it will return true or false if the input is today
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
```javascript

    var input = '21-10-2018'

    heartyDateTimeHelper.isToday(input)
    Output: false

```



## daysdiffFromToday

Takes the input of valid date, it return days difference from input date & today's date
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
```javascript

    var input = '28/10/2018'

    heartyDateTimeHelper.daysdiffFromToday(input)
    Output: 5        

```



## daysdiff

Returns difference between dates you provided, If we provide today date also like 'new Date()', It will convert to same format will return the result 
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
```javascript

    var input = (new Date(), '2018-11-22')
 
    heartyDateTimeHelper.daysdiff(input)
    Output: 21      

```



## formatMinutes

Returns the number of minutes in HH:MM format from the given input
```javascript

    var input = 1760
 
    heartyDateTimeHelper.formatMinutes(input)
    Output: "29:20 hrs"     

```



## handleDisplayDigit

If the given input is less than 10, it will append 0 before the number
```javascript

    var input = 4
 
    heartyDateTimeHelper.handleDisplayDigit(input)
    Output: 04    

```



## getDuration

It will return the duration in the form of object. It will return years, months, days, hours, minutes and   seconds. 
```javascript

    var input = ('22/10/2018', '28/11/2018')
 
    heartyDateTimeHelper.getDuration(input)
    Output: { day: "06", displayDiff: "01mo 06d", duration: 3196800, hour: "00", minute: "00", month: "01", second: "00", year: "00"}   

```



## displayDate

It will return the date in string format, such as "Mon, 22 Oct". If we mention year parameter true, It will add year also output.
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
```javascript

    var input = '22/10/2018'
 
    heartyDateTimeHelper.displayDate(input)
    Output: "Mon, 22 Oct 2018"  

```



## getDayFromDate

It will return the day name from given date.
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
```javascript

    var input = '22/10/2016'
 
    heartyDateTimeHelper.getDayFromDate(input)
    Output: "Sat"

```



## getMonthFromDate

It will return the day name from given date.
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
```javascript

    var input = '22/10/2016'
 
    heartyDateTimeHelper.getDayFromDate(input)
    Output: "Sat"

```



## isPastDate

It will return true if provided date is past date or will return false if it's not
support input formats : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
```javascript

    var input = '22-10-2020'
 
    heartyDateTimeHelper.isPastDate(input)
    Output: false

```



## formatDate

It will return formated date to provided format from the input date
support patterns : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd
```javascript

    var input = ('22/10/2016', 'yyyy/mm/dd')
 
    heartyDateTimeHelper.formatDate(input)
    Output: "2016/10/22"

```



## getDaysAhead

It will return the date days ahead of given date with the provided format.
support patterns : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
```javascript

    var input = ('22/10/2016', 20, 'yyyy/mm/dd')
 
    heartyDateTimeHelper.getDaysAhead(input)
    Output: "2016/11/11"

```



## numberOfDays

It will return the number of days present in given month of given year
```javascript

    var input = (2, 2012)
 
    heartyDateTimeHelper.numberOfDays(input)
    Output: 29

```



## getDaysBehind

It will return the date days behind of given date with the provided format.
```javascript

    var input = ('22/10/2016', 20, 'yyyy/mm/dd')
 
    heartyDateTimeHelper.getDaysBehind(input)
    Output: "02-10-2016"

```



## isDateInBetween

It will return if the given date is between provided date limits
support patterns : dd/mm/yyyy || dd-mm-yyyy || yyyy/mm/dd || yyyy-mm-dd || new Date()
```javascript

    var input = ('20/03/2018', new Date(), '21/06/2018')
 
    heartyDateTimeHelper.isDateInBetween(input)
    Output: true

```



## getDateWithOrdinal

It will return date value with ordinal if we provide number as input
```javascript

    var input = 23
 
    heartyDateTimeHelper.getDateWithOrdinal(input)
    Output: '23rd'

```



## getDateFromTimeStamp 

It will return the converted date from given Unix epoch time input
```javascript

    var input = 1541658537
 
    heartyDateTimeHelper.getDateFromTimeStamp(input)
    Output: "8th Nov, 2018"

```



## getConvertedEpochdate

It will return the converted Unix epoch time date from given Unix epoch time input
```javascript

    var input = 1541658537
 
    heartyDateTimeHelper.getConvertedEpochdate(input)
    Output: 1541658537000

```



## getTodaydate

It will return today's date in dd/mm/yyyy format
```javascript

    no input
 
    heartyDateTimeHelper.getTodaydate(input)
    Output: "08/11/2018"
 
```