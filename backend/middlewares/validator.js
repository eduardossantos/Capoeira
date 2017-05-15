exports.Date = function(date)
{
var bits = s.split('-');
var y = bits[2],
m = bits[1],
d = bits[0];
// Assume not leap year by default (note zero index for Jan)
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// If evenly divisible by 4 and not evenly divisible by 100,
// or is evenly divisible by 400, then a leap year
if ((!(y % 4) && y % 100) || !(y % 400)) {
daysInMonth[1] = 29;
}
return !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[--m]
}