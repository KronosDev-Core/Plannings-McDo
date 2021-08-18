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
  return data.replaceAll(/<p class="Time-[0-9]{2} .*">/gm, "").replaceAll("</p>", "").replaceAll('<hr class="dropdown-divider">', " ; ").replaceAll(/\n/gm, "").replaceAll("                    ", "").replaceAll(/^ /gm, "");
}

function GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, href) {
  FullName = href.children[1].innerHTML;
  id = href.children[0].innerHTML;

  HourMonday = ToFormatCardFromTable(href.children[2].innerHTML);
  HourTuesday = ToFormatCardFromTable(href.children[3].innerHTML);
  HourWednesday = ToFormatCardFromTable(href.children[4].innerHTML);
  HourThursday = ToFormatCardFromTable(href.children[5].innerHTML);
  HourFriday = ToFormatCardFromTable(href.children[6].innerHTML);
  HourSaturday = ToFormatCardFromTable(href.children[7].innerHTML);
  HourSunday = ToFormatCardFromTable(href.children[8].innerHTML);
  return {
    FullName,
    id,
    HourMonday,
    HourTuesday,
    HourWednesday,
    HourThursday,
    HourFriday,
    HourSaturday,
    HourSunday
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
    console.log("[ SimulateEvent ] (element) - ", element)
    return new Error("element n'est pas définie");
  } else if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(typeEvent, false, true);
    console.log("[ SimulateEvent ] (evt, element) - ", evt, element)
    element.dispatchEvent(evt);
    return evt;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

kronos(() => {
  let FullWeek = [getRangeWeek()],
    StartWeek = FullWeek[0][0];
  FullWeek.push(getRangeWeek(new Date(new Date(FullWeek[0][1]).setDate(FullWeek[0][1].getDate() + 1))), getRangeWeek(new Date(new Date(FullWeek[0][1]).setDate(FullWeek[0][1].getDate() + 8))))

  FullWeek.forEach((elem, index) => {
    kronos(HREF.SelectTimeWeekOption(index)).html(`Semaine du ${elem[0].FormatDM()} au ${elem[1].FormatDM()}`);
  })

  localStorage.removeItem("employee");

  let EmployeTableLine = {},
    DataPreSortTable = {};

  function TitleWeek(index = 0) {
    var StartWeek = FullWeek[index][0],
      EndWeek = FullWeek[index][1];

    localStorage.setItem("currentWeek", FullWeek[index][2]);

    kronos(HREF.TitleTableCard).html(
      `Semaine du ${FormatCompactDate(StartWeek)}/${
        StartWeek.getMonth() > 9
          ? EndWeek.getMonth() + 1
          : "0" + (EndWeek.getMonth() + 1)
      } au ${FormatCompactDate(EndWeek)}/${
        EndWeek.getMonth() > 9
          ? EndWeek.getMonth() + 1
          : "0" + (EndWeek.getMonth() + 1)
      }`
    );


  }

  if (!localStorage.getItem("currentWeek")) TitleWeek()
  else {
    var find = false;
    FullWeek.forEach((elem, index) => {
      if (!(index === 0)) {
        if (elem[2] === Number(localStorage.getItem("currentWeek"))) {
          kronos(HREF.SelectTimeWeekAllOption).attr("remove", "selected");
          kronos(HREF.SelectTimeWeekOption(index)).attr("add", "selected");
          TitleWeek(index);
          find = true
        }
      }
    })

    if (!find) TitleWeek()
  }

  kronos(HREF.SelectTimeWeek).on('change', (event) => {
    TitleWeek(Number(event.target.value))
    document.location.reload();
  })

  kronos(HREF.ListUniqueWorkerButton).forEach((elem) =>
    elem.addEventListener("click", (event) => {
      if (
        event.target.ownerSVGElement !== undefined &&
        event.target.ownerSVGElement != null
      )
        event.target.ownerSVGElement.classList.toggle(HREF.AnimationArrow);
      else if (event.target.tagName === "svg")
        event.target.classList.toggle(HREF.AnimationArrow);
      else if (event.target.tagName === "DIV")
        event.target.nextElementSibling.classList.toggle(HREF.AnimationArrow);
      else event.target.children[1].classList.toggle(HREF.AnimationArrow);
    })
  );

  Boolean(localStorage.getItem("ADMIN")) ?
    kronos(HREF.DivFormCardFooter).html(HTML.DivFormCardFooterHtmlForm) :
    kronos(HREF.DivFormCardFooter).remove();
  
  // Admin Section
  kronos().request("POST", "/Employe", {
    type: "get"
  }, (data) => {
    data.forEach((elem) => {
      kronos(HREF.InputSelectEmployee).append(HTML.SelectOptionEmployee(elem));
    });

    kronos(HREF.InputSelectEmployee).on("change", (event) => {
      kronos(HREF.DivNextAdminForm).html("");
      kronos(HREF.DivAdminSubOption).html("");
      if (event.target.value !== "new") {
        kronos().request(
          "POST",
          "/Employe", {
            type: "getOne",
            id: event.target.value
          },
          (data) => {
            localStorage.setItem("employee", JSON.stringify(data));
            kronos(HREF.DivAdminOption).html(HTML.AdminFormOption);

            kronos(HREF.InputSelectOption).on("change", (event) => {
              kronos(HREF.DivNextAdminForm).html("");
              kronos(HREF.DivAdminSubOption).html("");

              if (event.target.value === "EditEmp") {
                kronos(HREF.DivNextAdminForm).html(
                  HTML.TemplateFormEmployee({
                    type: "edit",
                    id: Number(JSON.parse(localStorage.getItem("employee")).id),
                    value: JSON.parse(localStorage.getItem("employee")),
                  })
                );
                kronos(HREF.ButtonDeleteEmployee).on("click", (event) => {
                  kronos().request(
                    "POST",
                    "/Employe", {
                      type: "remove",
                      id: JSON.parse(localStorage.getItem("employee")).id,
                    },
                    (data) => {}
                  );
                  window.location.reload();
                });
              }

              if (event.target.value === "NewWor") {
                kronos(HREF.DivNextAdminForm).html(
                  HTML.TemplateFormTimeWork({
                    type: "new",
                    id: Number(JSON.parse(localStorage.getItem("employee")).id),
                    StartWeek: new Date(Number(localStorage.getItem("currentWeek"))),
                  })
                );
                kronos("div#NextAdmin > form > input:nth-child(2)").on(
                  "change",
                  (event) => {
                    event.target.value = "new";
                  }
                );

                kronos(HREF.InputFormCheckAbsent).on("change", (event) => {
                  kronos(HREF.InputFormTimeStart).attr("toggle", "disabled");
                  kronos(HREF.InputFormTimeEnd).attr("toggle", "disabled");
                });

                kronos(HREF.InputFormDate).on("change", (event) => {
                  kronos(HREF.InputFormStartWeek).value(
                    String(
                      getRangeWeek(new Date(event.target.value))[0].setHours(0)
                    )
                  );
                });
              }

              if (event.target.value === "EditWor") {
                kronos(HREF.DivAdminSubOption).html(HTML.AdminFormSubOption);
                kronos().request(
                  "POST",
                  "/Horaire", {
                    type: "get",
                    subtype: "employe",
                    week: Number(localStorage.getItem('currentWeek')),
                    id: Number(JSON.parse(localStorage.getItem("employee")).id),
                  },
                  (data) => {
                    data.forEach((elem) => {
                      kronos(HREF.InputSelectSubOption).append(
                        HTML.SelectOptionTimeWork(elem)
                      );
                    });

                    kronos(HREF.InputSelectSubOption).on("change", (event) => {
                      console.log("[ debug 1 ] - ", event)
                      kronos().request(
                        "POST",
                        "/Horaire", {
                          type: "getOne",
                          id: Number(event.target.value)
                        },
                        (data) => {
                          kronos(HREF.DivNextAdminForm).html(
                            HTML.TemplateFormTimeWork({
                              type: "edit",
                              id: Number(
                                JSON.parse(localStorage.getItem("employee")).id
                              ),
                              value: data,
                              StartWeek: new Date(Number(localStorage.getItem("currentWeek"))),
                            })
                          );

                          kronos(HREF.InputFormDate).on("change", (event) => {
                            kronos(HREF.InputFormStartWeek).value(
                              String(
                                getRangeWeek(
                                  new Date(event.target.value)
                                )[0].setHours(0)
                              )
                            );
                          });

                          kronos(HREF.InputFormCheckAbsent).on(
                            "change",
                            (event) => {
                              kronos(HREF.InputFormTimeStart).attr(
                                "toggle",
                                "disabled"
                              );
                              kronos(HREF.InputFormTimeEnd).attr(
                                "toggle",
                                "disabled"
                              );
                            }
                          );
                        }
                      );
                    });
                  }
                );
              }
            });
          }
        );
      } else if (event.target.value === "new") {
        localStorage.removeItem("employee");
        kronos(HREF.DivNextAdminForm).html(
          HTML.TemplateFormEmployee({
            type: "new"
          })
        );
      }
    });
  });

  // Create Line in Table (Name, ID, MaxHour, Time Hour, Abs)
  kronos().request("POST", "/Employe", {
    type: "get"
  }, (data) => {
    data.forEach((elem, index) => {
      kronos(HREF.BodyTable).append(HTML.TemplateLineTable(elem));
      EmployeTableLine[elem.id] = index;
      DataPreSortTable[elem.id] = {};
    });

    kronos().request(
      "POST",
      "/Horaire", {
        type: "get",
        week: Number(localStorage.getItem("currentWeek")),
      },
      (data) => {
        data.forEach((elem, index) => {
          if (
            Object.keys(DataPreSortTable[elem.EmployePlanning]).indexOf(
              elem.DayDate
            ) !== -1
          ) {
            DataPreSortTable[elem.EmployePlanning][elem.DayDate].push(elem);
          } else {
            DataPreSortTable[elem.EmployePlanning][elem.DayDate] = [elem];
          }
        });

        console.log("[ DEBUG ] - ", DataPreSortTable)

        Object.keys(DataPreSortTable).forEach((elem, index) => {
          if (Object.keys(DataPreSortTable[elem]).length !== 0) {
            Object.keys(DataPreSortTable[elem]).forEach(
              (elemDate, indexDate) => {
                if (DataPreSortTable[elem][elemDate].length === 1) {
                  if (!DataPreSortTable[elem][elemDate][0].Absent) {
                    kronos(HREF.TableSpecificLine({
                      row: EmployeTableLine[elem] + 1,
                      column: DATA.DayWeekDataTable[new Date(Number(elemDate)).getDay()]
                    })).append(
                      FUNCTION.ConvertTimeTable(
                        DataPreSortTable[elem][elemDate][0].StartHour.replace(".", ":") + " - " + DataPreSortTable[elem][elemDate][0].EndHour.replace(".", ":"), DataPreSortTable[elem][elemDate][0]
                      )
                    );
                  } else {
                    kronos(
                      HREF.TableSpecificLine({
                        row: EmployeTableLine[elem] + 1,
                        column: DATA.DayWeekDataTable[
                          new Date(Number(elemDate)).getDay()
                        ],
                      })
                    ).html("<p>Abs</p>");
                  }
                } else {
                  var AllHourDay = "",
                    AllHourId = [];
                  DataPreSortTable[elem][elemDate].forEach(
                    (elemData, indexData) => {
                      if (!DataPreSortTable[elem][elemDate][0].Absent) {
                        if (AllHourDay !== "") {
                          AllHourDay += `;${DataPreSortTable[elem][elemDate][
                            indexData
                          ].StartHour.replace(".", ":")} - ${DataPreSortTable[
                            elem
                          ][elemDate][indexData].EndHour.replace(".", ":")}`;
                          AllHourId.push(DataPreSortTable[elem][elemDate][indexData]);
                        } else {
                          AllHourDay = `${DataPreSortTable[elem][elemDate][
                            indexData
                          ].StartHour.replace(".", ":")} - ${DataPreSortTable[
                            elem
                          ][elemDate][indexData].EndHour.replace(".", ":")}`;
                          AllHourId.push(DataPreSortTable[elem][elemDate][indexData]);
                        }
                      } else {
                        kronos(
                          HREF.TableSpecificLine({
                            row: EmployeTableLine[elem] + 1,
                            column: DATA.DayWeekDataTable[
                              new Date(Number(elemDate)).getDay()
                            ],
                          })
                        ).html("<p>Abs</p>");
                      }
                    }
                  );
                  if (AllHourDay !== "")
                    kronos(
                      HREF.TableSpecificLine({
                        row: EmployeTableLine[elem] + 1,
                        column: DATA.DayWeekDataTable[
                          new Date(Number(elemDate)).getDay()
                        ],
                      })
                    ).html(FUNCTION.ConvertTimeTable(AllHourDay, AllHourId));
                }
              }
            );
          }
        });

        kronos(HREF.RowTableCard).forEach((elem) => {
          elem.addEventListener("click", (event) => {
            kronos("." + HREF.AnimationArrow).class("remove", HREF.AnimationArrow);

            var FullName = "",
              id = "";

            var HourMonday = "",
              HourTuesday = "",
              HourWednesday = "",
              HourThursday = "",
              HourFriday = "",
              HourSaturday = "",
              HourSunday = "";

            if (event.target.tagName == "TD" || event.target.tagName == "TH") {
              ({
                FullName,
                id,
                HourMonday,
                HourTuesday,
                HourWednesday,
                HourThursday,
                HourFriday,
                HourSaturday,
                HourSunday
              } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, event.path[1]));
            } else if (event.target.tagName == "P" || event.target.tagName == "HR") {
              ({
                FullName,
                id,
                HourMonday,
                HourTuesday,
                HourWednesday,
                HourThursday,
                HourFriday,
                HourSaturday,
                HourSunday
              } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, event.path[2]));
            } else if (event.target.tagName == "TR") {
              ({
                FullName,
                id,
                HourMonday,
                HourTuesday,
                HourWednesday,
                HourThursday,
                HourFriday,
                HourSaturday,
                HourSunday
              } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, event.target));
            }

            if (Boolean(localStorage.getItem("ADMIN"))) {
              kronos(HREF.InputSelectEmployeeOption).attr("remove", "selected");
              kronos(HREF.SelectSpecificEmployee(id)).attr("add", "selected", "true");
              SimulateEvent(kronos(HREF.InputSelectEmployee)[0]);

              if (!(event.target.tagName == "P")) {
                setTimeout(() => {
                  kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
                  kronos(HREF.SelectSpecificOption("EditEmp")).attr("add", "selected", "true");
                  SimulateEvent(kronos(HREF.InputSelectOption)[0]);
                }, 100);
              } else {
                console.log("[ Debug ] - ", event)
                setTimeout(() => {
                  kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
                  kronos(HREF.SelectSpecificOption("EditWor")).attr("add", "selected", "true");
                  SimulateEvent(kronos(HREF.InputSelectOption)[0]);
                  setTimeout(() => {
                    kronos(HREF.InputSelectSubOptionOption).attr("remove", "selected");
                    kronos(HREF.SelectSpecificSubOption(event.target.classList[0].replace("Time-", ""))).attr("add", "selected", "true");
                    SimulateEvent(kronos(HREF.InputSelectSubOption)[0]);
                  }, 100);
                }, 100);
              }
            }

            var ArrayHourDay = [HourSunday, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday]

            kronos(HREF.ListUniqueWorkerHeader).html(`${id} | ${FullName}`);

            ArrayHourDay.forEach((elem, index) => {
              kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).html("");
              if (elem != "" && elem != "Abs") {
                if (elem.indexOf(";") !== -1) {
                  elem.split(";").forEach((elemSplit, indexSplit) => {
                    if (Number(elemSplit.split(":")[0]) < 15) {
                      if (Number(elemSplit.split(":")[0]) < 10 && Number(elemSplit.split("-")[1].split(":")[0]) < 12) kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                        type: "chill",
                        time: elemSplit,
                        open: true
                      }));
                      else kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                        type: "moderate",
                        time: elemSplit
                      }));
                    } else if (Number(elemSplit.split(":")[0]) >= 18) {
                      if ((Number(elemSplit.split("-")[1].split(":")[0]) < 5) || (Number(elemSplit.split("-")[1].split(":")[0]) === 23 && Number(elemSplit.split("-")[1].split(":")[1]) > 0)) {
                        if (index === 0 || index >= 5) kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                          type: "moderate",
                          time: elemSplit,
                          close: true
                        }))
                        else kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                          type: "chill",
                          time: elemSplit,
                          close: true
                        }))
                      } else {
                        kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                          type: "danger",
                          time: elemSplit
                        }));
                      };
                    } else {
                      kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                        type: "chill",
                        time: elemSplit
                      }));
                    }

                    if (elem.split(";").length !== (indexSplit + 1)) {
                      var now = elemSplit,
                        after = elem.split(";")[indexSplit + 1];
                      var [nowH, nowM] = now.split("-")[1].split(":"),
                        [afterH, afterM] = after.split("-")[0].split(":");
                      (Number(afterH)-Number(nowH)==0&&Number(afterM)-Number(nowM)==30||Number(afterH)-Number(nowH)==1&&Number(afterM)-Number(nowM)==-30)&&kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({type:"pause",time:elemSplit}));
                    }
                  })
                  SimulateEvent(kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index]))[0].previousElementSibling, "click");
                } else {
                  if (Number(elem.split(":")[0]) < 15) {
                    if (Number(elem.split(":")[0]) < 10 && Number(elem.split("-")[1].split(":")[0]) < 12) kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                      type: "chill",
                      time: elem,
                      open: true
                    }));
                    else kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                      type: "moderate",
                      time: elem
                    }));
                  } else if (Number(elem.split(":")[0]) >= 18) {
                    if ((Number(elem.split("-")[1].split(":")[0]) < 5) || (Number(elem.split("-")[1].split(":")[0]) === 23 && Number(elem.split("-")[1].split(":")[1]) > 0)) {
                      if (index === 0 || index >= 5) kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                        type: "moderate",
                        time: elem,
                        close: true
                      }))
                      else kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                        type: "chill",
                        time: elem,
                        close: true
                      }))
                    } else {
                      kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                        type: "danger",
                        time: elem
                      }));
                    };
                  } else {
                    kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).append(HTML.TemplateLineCard({
                      type: "chill",
                      time: elem
                    }));
                  }
                  SimulateEvent(kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index]))[0].previousElementSibling, "click");
                }
              } else if (elem === "Abs") {
                kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).html(HTML.TemplateLineCard({
                  type: "neutral"
                }));
                SimulateEvent(kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index]))[0].previousElementSibling, "click");
              } else {
                kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).html("");
              }
            });
          });
        });
      }
    );
  });
});