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

kronos(() => {
  let FullWeek = [getRangeWeek()],
    StartWeek = FullWeek[0][0];
  FullWeek.push(getRangeWeek(new Date(new Date(FullWeek[0][1]).setDate(FullWeek[0][1].getDate() + 1))), getRangeWeek(new Date(new Date(FullWeek[0][1]).setDate(FullWeek[0][1].getDate() + 8))))

  FullWeek.forEach((elem, index) => {
    kronos(HREF.SelectTimeWeekOption(index)).html(`Semaine du ${elem[0].FormatDM()} au ${elem[1].FormatDM()}`);
  })

  localStorage.removeItem("employee");

  let EmployeTableLine = {},
    DataPreSortTable = {},
    Employeid_id = {},
    SameWeek = null,
    EmployeNameId = {};

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

  if (Number(localStorage.getItem("currentWeek")) === FullWeek[0][2]) SameWeek = true
  else SameWeek = false;

  kronos(HREF.SelectTimeWeek).on('change', (event) => {
    TitleWeek(Number(event.target.value))
    document.location.reload();
  });

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

  if (JSON.parse(localStorage.getItem("account")).permission === "Administration" || JSON.parse(localStorage.getItem("account")).permission === "Manager") {
    kronos(HREF.DivFormCardFooter).html(HTML.DivFormCardFooterHtmlForm)
  } else {
    kronos(HREF.DivFormCardFooter).remove();
  }

  DATA.DayWeekDate.forEach((elem, index) => {
    var day = new Date().getDay();

    if (SameWeek) {
      if (day === 0) {
        if (elem === DATA.DayWeekDate[day]) {
          kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-warning")
        } else {
          kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-success")
        }
      } else {
        if (elem === DATA.DayWeekDate[day]) {
          kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-warning")
        } else {
          if (index < day) kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-success")
          else kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-danger")
          kronos(HREF.SpecificDropDownCard(DATA.DayWeekDate[0])).class("add", "text-danger")
        }
      }
    }

  })
  
  // Admin Section
  if (JSON.parse(localStorage.getItem("account")).permission === "Administration" || JSON.parse(localStorage.getItem("account")).permission === "Manager") {
    kronos().request("POST", "/Employe", {
        type: "get",
        pays: JSON.parse(localStorage.getItem("account")).pays,
        restaurant: Number(JSON.parse(localStorage.getItem("account")).Restaurant),
      }, 
      (data) => {
        data.forEach((elem) => {
          kronos(HREF.InputSelectEmployee).append(HTML.SelectOptionEmployee(elem));
        });

        kronos(HREF.InputSelectEmployee).on("change", (event) => {
          kronos(HREF.DivNextAdminForm).html("");
          kronos(HREF.DivAdminSubOption).html("");
          console.log(event.target.value, event.target.value !== "Select Employee")
          if (event.target.value !== "new" && event.target.value !== "Select Employee") {
            kronos().request(
              "POST",
              "/Employe", {
                type: "getOne",
                _id: event.target.value
              },
              (data) => {
                kronos(HREF.DivAdminOption).html(HTML.AdminFormOption(JSON.parse(localStorage.getItem("account"))));
                kronos(HREF.InputSelectOption).on("change", (event) => {
                  kronos(HREF.DivNextAdminForm).html("");

                  if (event.target.value === "EditEmp") {
                    kronos(HREF.DivAdminSubOption).html("");
                    kronos(HREF.DivNextAdminForm).html(
                      HTML.TemplateFormEmployee({
                        type: "edit",
                        id: Number(JSON.parse(localStorage.getItem("employee")).id),
                        value: JSON.parse(localStorage.getItem("employee")),
                      })
                    );
                  
                    kronos(HREF.ButtonDeleteForm).on("click", (event) => {
                      kronos().request(
                        "POST",
                        "/Employe", {
                          type: "remove",
                          _id: JSON.parse(localStorage.getItem("employee"))._id,
                          id: JSON.parse(localStorage.getItem("employee")).id,
                        },
                        (data) => {}
                      );
                      window.location.reload();
                    });
                  }

                  if (event.target.value === "NewWor") {
                    kronos(HREF.DivAdminSubOption).html("");
                    kronos(HREF.DivNextAdminForm).html(
                      HTML.TemplateFormTimeWork({
                        type: "new",
                        id: JSON.parse(localStorage.getItem("employee")).id,
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
                        id: JSON.parse(localStorage.getItem("employee")).id,
                      },
                      (data) => {
                        data.forEach((elem) => {
                          kronos(HREF.InputSelectSubOption).append(
                            HTML.SelectOptionTimeWork(elem)
                          );
                        });

                        kronos(HREF.InputSelectSubOption).on("change", (event) => {
                          kronos().request(
                            "POST",
                            "/Horaire", {
                              type: "getOne",
                              _id: event.target.value
                            },
                            (data) => {
                              var extra = ""
                              if (JSON.parse(localStorage.getItem("account")).permission === "Manager") extra = "Manager"
                              else extra = "Administration"
                              kronos(HREF.DivNextAdminForm).html(
                                HTML.TemplateFormTimeWork({
                                  type: "edit",
                                  id: JSON.parse(localStorage.getItem("employee")).id,
                                  value: data,
                                  StartWeek: new Date(Number(localStorage.getItem("currentWeek"))),
                                  permission: extra,
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

                              kronos(HREF.InputSelectRole).on('change', (event) => {
                                var re = /K[^D](.|)/gm;
                                if (event.target.value.match(re) !== null) {
                                  kronos(HREF.InputLineWork).attr("remove", "disabled");
                                } else {
                                 kronos(HREF.InputLineWork).attr("add", "disabled", "true");
                                }
                              })

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

                              kronos(HREF.ButtonDeleteForm).on("click", (event) => {
                                kronos().request(
                                  "POST",
                                  "/Horaire", {
                                    type: "remove",
                                    _id: data._id,
                                  },
                                  (data) => {}
                                );
                                window.location.reload();
                              });
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
            kronos(HREF.DivAdminOption).html("")
            kronos(HREF.DivNextAdminForm).html(
              HTML.TemplateFormEmployee({
                type: "new"
              })
            );
          }
        });
    })
  };

  // Create Line in Table (Name, ID, MaxHour, Time Hour, Abs)
  kronos().request("POST", "/Employe", {
    type: "get",
    pays: JSON.parse(localStorage.getItem("account")).pays,
    restaurant: Number(JSON.parse(localStorage.getItem("account")).Restaurant),
  }, (data) => {
    data.forEach((elem, index) => {
      kronos(HREF.BodyTable).append(HTML.TemplateLineTable(elem));
      EmployeTableLine[elem.id] = index;
      EmployeNameId[elem.name] = elem.id;
      DataPreSortTable[elem.id] = {};
      Employeid_id[elem.id] = elem._id;
    });

    kronos().request(
      "POST",
      "/Horaire", {
        type: "get",
        week: Number(localStorage.getItem("currentWeek")),
        Employe: Object.keys(DataPreSortTable),
      },
      (data, index) => {
        data.forEach((elem, index) => {
          if (Object.keys(DataPreSortTable[elem.EmployePlanning]).indexOf(elem.DayDate) !== -1) {
            DataPreSortTable[elem.EmployePlanning][elem.DayDate].push(elem);
          } else {
            DataPreSortTable[elem.EmployePlanning][elem.DayDate] = [elem];
          }
        });

        Object.keys(DataPreSortTable).forEach((elem, index) => {
          if (Object.keys(DataPreSortTable[elem]).length !== 0) {
            var TotalHour = 0, countAbsent = 0;
            Object.keys(DataPreSortTable[elem]).forEach(
              (elemDate, indexDate) => {
                DataPreSortTable[elem][elemDate].forEach((elemTotal, index) => {
                  if (!elemTotal.Absent) {
                    TotalHour += Number(TimeBetweenTwoTime(elemTotal.StartHour.replace(".", ":"), elemTotal.EndHour.replace(".", ":")));
                  } else countAbsent++;
                })

                if (DataPreSortTable[elem][elemDate].length === 1) {
                  if (!DataPreSortTable[elem][elemDate][0].Absent) {
                    kronos(HREF.TableSpecificLine({row: EmployeTableLine[elem] + 2, column: DATA.DayWeekDataTable[new Date(Number(elemDate)).getDay()]})).append(
                      FUNCTION.ConvertTimeTable(
                        DataPreSortTable[elem][elemDate][0].StartHour.replace(".", ":") + " - " + DataPreSortTable[elem][elemDate][0].EndHour.replace(".", ":"), DataPreSortTable[elem][elemDate][0], SameWeek
                      )
                    );
                  } else {
                    kronos(
                      HREF.TableSpecificLine({
                        row: EmployeTableLine[elem] + 2,
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
                            row: EmployeTableLine[elem] + 2,
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
                        row: EmployeTableLine[elem] + 2,
                        column: DATA.DayWeekDataTable[
                          new Date(Number(elemDate)).getDay()
                        ],
                      })
                    ).html(FUNCTION.ConvertTimeTable(AllHourDay, AllHourId, SameWeek));
                }
              }
            );

            var MaxHour = Number(kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].innerHTML.replace(" / ", ""));

            if (countAbsent == 7) TotalHour = "Abs";

            if (TotalHour == MaxHour) {
              kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].classList.add("text-warning");
            } else if (TotalHour < MaxHour) {
              kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].classList.add("text-success");
            } else if (TotalHour != "Abs") {
              kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].classList.add("text-danger");
            }

            kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].innerHTML = `${TotalHour} ${kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].innerHTML}`
          }
        });

        kronos(HREF.PTotalEmpWork).html(`${kronos(HREF.AllPTextWarning).length} employée sur ${Object.keys(DataPreSortTable).length} actif(s)`);
        var ListWorkEmp = [];

        (kronos(HREF.AllPTextWarning)).forEach((elem, index) => {
          elem = elem.parentElement.parentElement.children[1].innerHTML;
          if (ListWorkEmp.indexOf(elem) == -1) ListWorkEmp.push(elem)
        });

        kronos(HREF.PTotalEmpWork).attr("add", "title", ListWorkEmp.join(", "));
        ReloadTooltips();

        kronos(HREF.RowTableCard).forEach((elem) => {
          elem.addEventListener("click", (event) => {
            kronos("." + HREF.AnimationArrow).class("remove", HREF.AnimationArrow);
            kronos(HREF.BtnOptionEmploye).attr("remove", "disabled");
            kronos(HREF.DivOptionEmploye).html("");

            var FullName = "",
              id = "";            

            var HourMonday = "",
              HourTuesday = "",
              HourWednesday = "",
              HourThursday = "",
              HourFriday = "",
              HourSaturday = "",
              HourSunday = "",
              TotalHour = "";

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
                HourSunday,
                TotalHour
              } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, event.path[1]));
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
                HourSunday,
                TotalHour
              } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, event.path[2]));
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
                HourSunday,
                TotalHour
              } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, event.target));
            }
            
            kronos().request(
              "POST",
              "/Employe", {
                type: "getOne",
                _id: Employeid_id[Number(id)],
              },
              (data) => {
                data = data[0]
                data.TotalHour = TotalHour;
                localStorage.setItem("employee", JSON.stringify(data))
              }
            )

            console.log(event)

            if (JSON.parse(localStorage.getItem("account")).permission === "Administration") {
              kronos(HREF.InputSelectEmployeeOption).attr("remove", "selected");
              kronos(HREF.SelectSpecificEmployee(Employeid_id[id])).attr("add", "selected", "true");
              SimulateEvent(kronos(HREF.InputSelectEmployee)[0]);

              if (event.target.tagName == "TD") {
                setTimeout(() => {
                  kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
                  kronos(HREF.SelectSpecificOption("NewWor")).attr("add", "selected", "true");
                  SimulateEvent(kronos(HREF.InputSelectOption)[0]);
                  kronos(HREF.InputSelectOption)[0].scrollIntoView(true);
                  setTimeout(() => {
                    kronos(HREF.InputFormDate).value(`${new Date(new Date(Number(localStorage.getItem("currentWeek"))).setDate(new Date(Number(localStorage.getItem("currentWeek"))).getDate()+(Number(event.target.cellIndex)-2))).FormatYMD()}`)
                  }, 100);
                }, 100);
              } else if (!(event.target.tagName == "P")) {
                setTimeout(() => {
                  kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
                  kronos(HREF.SelectSpecificOption("EditEmp")).attr("add", "selected", "true");
                  SimulateEvent(kronos(HREF.InputSelectOption)[0]);
                  kronos(HREF.InputSelectOption)[0].scrollIntoView(true);
                }, 100);
              } else {
                setTimeout(() => {
                  kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
                  kronos(HREF.SelectSpecificOption("EditWor")).attr("add", "selected", "true");
                  SimulateEvent(kronos(HREF.InputSelectOption)[0]);
                  setTimeout(() => {
                    kronos(HREF.InputSelectSubOptionOption).attr("remove", "selected");
                    kronos(HREF.SelectSpecificSubOption(event.target.classList[0].replaceAll("Time-", ""))).attr("add", "selected", "true");
                    SimulateEvent(kronos(HREF.InputSelectSubOption)[0]);
                    kronos(HREF.InputSelectSubOption)[0].scrollIntoView(true);
                  }, 100);
                }, 100);
              }
            //VERSION: V 2.0.1 Rework Entire System for Manager
            } else if (JSON.parse(localStorage.getItem("account")).permission === "Manager" && !event.target.classList.contains("text-success") && (event.path[2].cellIndex+1) === DATA.DayWeekDataTable[new Date().getDay()]) {
              kronos(HREF.InputSelectEmployeeOption).attr("remove", "selected");
              kronos(HREF.SelectSpecificEmployee(Employeid_id[id])).attr("add", "selected", "true");
              SimulateEvent(kronos(HREF.InputSelectEmployee)[0]);

              setTimeout(() => {
                kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
                kronos(HREF.SelectSpecificOption("EditWor")).attr("add", "selected", "true");
                SimulateEvent(kronos(HREF.InputSelectOption)[0]);
                setTimeout(() => {
                  kronos(HREF.InputSelectSubOptionOption).attr("remove", "selected");
                  console.log(event)
                  kronos(HREF.SelectSpecificSubOption(event.target.classList[0].replaceAll("Time-", ""))).attr("add", "selected", "true");
                  SimulateEvent(kronos(HREF.InputSelectSubOption)[0]);
                  kronos(HREF.InputSelectSubOption)[0].scrollIntoView(true);
                }, 100);
              }, 100);
            } else if (JSON.parse(localStorage.getItem("account")).permission === "Manager") {
              kronos(HREF.InputSelectEmployeeOption).attr("remove", "selected");
              kronos(HREF.SelectSpecificOptionEmploye(1)).attr("add", "selected", "true");
              SimulateEvent(kronos(HREF.InputSelectEmployee)[0]);
              kronos(HREF.DivAdminOption).html("");
            };

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

  //VERSION: V 2.0.1 Rework Entire System for Manager
  kronos(HREF.BtnOptionEmploye).on('click', (event) => {
    kronos(HREF.DivOptionEmploye).html(HTML.OptionEmploye);
    var dataEmp = JSON.parse(localStorage.getItem("employee"));

    console.log(event)
    if (dataEmp.TotalHour == "Abs") dataEmp.TotalHour = Number(dataEmp.MaxHour) - 1;
    kronos(HREF.BtnSalaireEmploye).attr("add", "title", `≈ ${String((dataEmp.TotalHour * 10.15).round()).replace(".", ",")} €<br/><em>Base de 10.15 €/Heure<br/>Pas de Majoration</em>`);
    kronos(HREF.BtnRoleEmploye).attr("add", "title", `Poste Undefined`);
    ReloadTooltips();
  });

  var InputSearchChange = false;

  function Search() {
    var value = kronos(HREF.InputSearchBar).value();
    if (value !== "") {
      if (!isNaN(Number(value))) {
        console.log(EmployeTableLine, EmployeTableLine[Number(value)], HREF.TableSpecificLine({row: EmployeTableLine[Number(value)], column: 1}), kronos(HREF.TableSpecificLine({row: EmployeTableLine[Number(value)]+2})));
        kronos(HREF.TableSpecificLine({row: EmployeTableLine[Number(value)]++}))[0].scrollIntoView(true);
      } else {
        console.log(EmployeNameId[value], value)
        if (Object.keys(EmployeNameId).indexOf(value) !== 1) kronos(HREF.TableSpecificLine({row: EmployeTableLine[EmployeNameId[value]]++}))[0].scrollIntoView(true);
      }
    }
  }

  kronos(HREF.InputSearchBar).on('click', (event) => {
    InputSearchChange = true;
  });

  document.addEventListener('keypress', (event) => {
    if (event.key === "Enter" && InputSearchChange) Search();
  })

  kronos(HREF.BtnSearchBar).on('click', (event) => {
    Search();
  })
});

