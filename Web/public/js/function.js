Date.prototype.FormatYMD = function () {
  var date = new Date(this.valueOf()),
    res = `${date.getFullYear()}`;
  return (
    1 == String(date.getMonth() + 1).length ?
    (res += `-0${date.getMonth() + 1}`) :
    (res += `-${date.getMonth() + 1}`),
    1 == String(date.getDate()).length ?
    (res += `-0${date.getDate()}`) :
    (res += `-${date.getDate()}`),
    res
  );
};

Date.prototype.FormatDM = function () {
  var date = new Date(this.valueOf()),
    res = ``;
  return (
    1 == String(date.getDate()).length ?
    (res += `0${date.getDate()}`) :
    (res += `${date.getDate()}`),
    1 == String(date.getMonth() + 1).length ?
    (res += `/0${date.getMonth() + 1}`) :
    (res += `/${date.getMonth() + 1}`),
    res
  );
};

Date.prototype.setFullTime = function (h = 0, m = 0, s = 0, ms = 0) {
  var date = new Date(this.valueOf());
  return date.setHours(h, m, s, ms);
}

Number.prototype.round = function () {
  return Math.round((this + Number.EPSILON) * 100) / 100;
}

function getFormatInputTime(time) {
  var H = time.split(":")[0],
    m = time.split(":")[1],
    res = "";
  return (
    1 == H.length ? (res += `0${H}`) : (res += H),
    (res += ":"),
    1 == m.length ? (res += `0${m}`) : (res += m),
    res
  );
}

function ToFormatInputTime(time) {
  return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
}

function ToFormatCardFromTable(data) {
  return data.replaceAll(/(<p class="Time-.*">|<p>)/gm, "").replaceAll("</p>", "").replaceAll('<hr class="dropdown-divider">', " ; ").replaceAll(/\n/gm, "").replaceAll("                    ", "").replaceAll(/^ /gm, "");
}

function GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, HREF) {
  FullName = HREF.children[1].innerHTML;
  id = HREF.children[0].innerHTML;

  HourMonday = ToFormatCardFromTable(HREF.children[2].innerHTML);
  HourTuesday = ToFormatCardFromTable(HREF.children[3].innerHTML);
  HourWednesday = ToFormatCardFromTable(HREF.children[4].innerHTML);
  HourThursday = ToFormatCardFromTable(HREF.children[5].innerHTML);
  HourFriday = ToFormatCardFromTable(HREF.children[6].innerHTML);
  HourSaturday = ToFormatCardFromTable(HREF.children[7].innerHTML);
  HourSunday = ToFormatCardFromTable(HREF.children[8].innerHTML);
  TotalHour = HREF.children[9].innerHTML.split(" ")[0]
  return {
    FullName,
    id,
    HourMonday,
    HourTuesday,
    HourWednesday,
    HourThursday,
    HourFriday,
    HourSaturday,
    HourSunday,
    TotalHour
  };
}

function getRangeWeek(date) {
  if (null != date) var curr = new Date(date);
  else var curr = new Date(new Date().toDateString());
  if (0 != curr.getDay()) var first = curr.getDate() - curr.getDay() + 1;
  else var first = curr.getDate() - 6;
  if (0 != curr.getDay()) var last = first + 6;
  else var last = curr.getDate();
  return [new Date(curr.setDate(first)), new Date(curr.setDate(last)), new Date(curr.setDate(first)).getTime()];
}

function FormatCompactDate(date, type = "day") {
  if (type == "day")
    return date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  else
    return date.getMonth() > 9 ?
      date.getMonth() + 1 :
      "0" + (date.getMonth() + 1);
}

function SimulateEvent(element, typeEvent = "change") {
  if (!element) {
    return new Error("element n'est pas définie");
  } else if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(typeEvent, false, true);
    element.dispatchEvent(evt);
    return evt;
  }
}

function TimeBetweenTwoTime(hour1, hour2) {
  hour1 = hour1.split(":");
  hour2 = hour2.split(":");
  var Date2 = new Date();
  if (hour2[0] == "00") Date2.setDate(Date2.getDate()+1)
  return Number(Number(new Date((Date2.setHours(hour2[0], hour2[1], 0, 0) - new Date().setHours(hour1[0], hour1[1], 0, 0))))/3.6e6).round();
}

function ReloadTooltips() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {sanitize: false});
  });
}

Array.prototype.last = function () {
  return this[this.length - 1];
};