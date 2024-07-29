import React, { useEffect, useState, useMemo } from "react";
import useAxios from "../../utils/useAxios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Table, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import Alerts from "../components/Alerts";
import { MainSpinner } from "../components/Spinner";

const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [status, setStatus] = useState({});
  const [reasons, setReasons] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addAlert = (type, message) => {
    setAlerts((prevAlerts) => [...prevAlerts, { type, message }]);
  };

  const fetchTeacherSession = async () => {
    setLoading(true);
    try {
      const response = await useAxios().get("user/teacher/session/get");
      console.log(response.data.session);
      setSessions(response.data.session);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async (sessionID) => {
    const formdata = new FormData();
    formdata.append("session_id", sessionID);
    formdata.append("report_time", new Date().toLocaleTimeString());

    try {
      const response = await useAxios().post(
        "user/teacher/session/report",
        formdata
      );
      if (response.status === 201) {
        fetchTeacherSession();
        addAlert("success", "Session reported successfully");
        setShowModal(false);
      } else {
        addAlert("danger", `Error: ${response.statusText}`);
      }
    } catch (error) {
      addAlert("danger", error.message);
    }
  };

  const handleFinish = async (sessionID) => {
    let statusValue = status[sessionID] || "";
    const reasonValue = reasons[sessionID] || "";

    if (!statusValue) {
      addAlert("danger", "Status is required");
      return;
    }

    if (statusValue === "Pending" && !reasonValue) {
      addAlert("danger", "Reason is required for Pending status");
      return;

    } 
     
    if (statusValue === "Others" && !reasonValue) {
      addAlert("danger", "Reason is required for Others status");
      return;

    }

    if (statusValue === 'Others'){
      statusValue='Pending';
    }

    const formdata = new FormData();
    formdata.append("session_id", sessionID);
    formdata.append("status", statusValue);
    formdata.append("reason", reasonValue);
    formdata.append("finishTime", new Date().toLocaleTimeString());

    try {
      const response = await useAxios().post(
        "user/teacher/session/finish",
        formdata
      );
      if (response.status === 200) {
        fetchTeacherSession();
        setShowModal(false); 
        if(statusValue === "Completed"){ 
          addAlert("success", "Session finished successfully");
        }else{ 
          addAlert("info", "Session Status Updated");
        }
      } else {
        addAlert("danger", `Error: ${response.statusText}`);
      }
    } catch (error) {
      addAlert("danger", error.message);
    }
  };

  useEffect(() => {
    fetchTeacherSession();
  }, []);

  const uniqueDates = useMemo(
    () => [...new Set(sessions.map((session) => session.date))],
    [sessions]
  );
  const events = useMemo(
    () =>
      uniqueDates.map((date) => ({
        title: "Session",
        date: date,
      })),
    [uniqueDates]
  );

  const handleEventClick = (clickInfo) => {
    const eventDate = clickInfo.event.startStr;
    const selectedSessions = sessions.filter(
      (session) => session.date === eventDate
    );
    setTimetable(selectedSessions);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleStatusChange = (id, value) => {
    setStatus((prevStatus) => ({ ...prevStatus, [id]: value }));
  };

  const handleReasonChange = (id, value) => {
    setReasons((prevReasons) => ({ ...prevReasons, [id]: value }));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    if (timetable.length > 0) {
      doc.text(`Date: ${timetable[0].date}`, 10, 10);
      doc.text(`Teacher: ${timetable[0].teacher}`, 10, 16);
    }

    doc.text("Session Report", 170, 10);

    timetable.forEach((session, index) => {
      const yPosition = 30 + index * 40;
      doc.text(`Time: ${session.time_duration}`, 10, yPosition);
      doc.text(`Subject: ${session.subject}`, 10, yPosition + 5);
      doc.text(`Chapter: ${session.chapter}`, 10, yPosition + 10);
      doc.text(`Units: ${session.chapteritem}`, 10, yPosition + 15);
      doc.text(`Topics to be Covered: ${session.TTBC}`, 10, yPosition + 20);
    });

    doc.text("Sign", 170, 260);

    doc.save(`Session-Report(${new Date().toDateString()}).pdf`);
  };

  return (
    <section className="section px-2 px-lg-5 py-4">
      <div className="container-fluid calendar-container my-4">
        <div>
          {error && <p className="mt-5 text-danger">Error: {error.message}</p>}
          {loading ? (
            <div className="m-5 p-5">
              <MainSpinner />
            </div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
            />
          )}
        </div>
        {alerts.map((alert, index) => (
          <Alerts
            key={index}
            variant={alert.type}
            message={alert.message}
            onClose={() =>
              setAlerts((prevAlerts) =>
                prevAlerts.filter((_, i) => i !== index)
              )
            }
          />
        ))}

        <Modal
          show={showModal}
          onHide={handleClose}
          scrollable
          centered
          size="fullscreen"
          style={{ zIndex: "2000" }}
        >
          <div className="m-2">
            <button
              className="btn btn-sm text-primary float-end"
              onClick={handleClose}
            >
              <i className="bi bi-x-lg fw-bolder fs-5"></i>
            </button>
            <h2 className="fs-5 fw-semibold mt-2 text-center text-primary">
              TIME TABLE
            </h2>
          </div>
          <Modal.Body>
            <div className="card shadow-sm">
              <div className="card-body">
                <div style={{ overflowX: "auto" }}>
                  <Table
                    hover
                    style={{ minWidth: "1200px", minHeight: "400px" }}
                  >
                    <thead>
                      <tr className="border-bottom border-secondary">
                        <th className="pb-3">Time</th>
                        <th className="pb-3">Subject</th>
                        <th className="pb-3">Chapter</th>
                        <th className="pb-3">Units</th>
                        <th className="pb-3" style={{ width: "25%" }}>
                          Status
                        </th>
                        <th className="pb-3">Reported</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timetable.map((session) => (
                        <tr key={session.id}>
                          <td>{session.time_duration}</td>
                          <td>{session.subject}</td>
                          <td>{session.chapter}</td>
                          <td>{session.chapteritem}</td>
                          <td>
                            {session.reported ? (
                              <form style={{ minHeight: "100px" }}>
                                <select
                                  className="form-select form-select-sm"
                                  value={status[session.id] || session.action || ""}
                                  onChange={(e) =>handleStatusChange(session.id, e.target.value)}
                                  aria-label="form-select-sm"
                                  disabled={session.finished ? true : false} >
                                  <option value="Completed">Completed</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Others">Others</option>
                                </select>

                                {(status[session.id] || session.action) ===
                                  "Pending" && (
                                  <div className="mt-2">
                                    <select
                                      className="form-select form-select-sm"
                                      id={`ReasonSelect-${session.id}`}
                                      value={
                                        reasons[session.id] ||
                                        session.pending_reason || ""
                                      }
                                      onChange={(e) =>
                                        handleReasonChange(
                                          session.id,
                                          e.target.value
                                        )
                                      }
                                      aria-label="form-select-sm" 
                                      disabled={session.finished ? true : false}
                                    >
                                      <option value="">Select a Reason</option>
                                      <option value="Illness or personal health issues">Illness or personal health issues</option>
                                      <option value="Unexpected family emergency">Unexpected family emergency</option>
                                      <option value="Scheduled medical appointment">Scheduled medical appointment</option>
                                      <option value="Transportation issues">Transportation issues</option>
                                      <option value="Conflicting professional obligations">Conflicting professional obligations</option>
                                      <option value="Severe weather conditions">Severe weather conditions</option>
                                      <option value="Last-minute scheduling conflict">Last-minute scheduling conflict</option>
                                      <option value="Technical difficulties">Technical difficulties</option>
                                    </select>
                                  </div>
                                )}

                                {(status[session.id] || session.action) ===
                                  "Others" && (
                                  <div className="form-floating mt-2">
                                    <textarea
                                      className="form-control"
                                      placeholder="Leave a comment here"
                                      id={`ReasonTextarea-${session.id}`}
                                      value={
                                        reasons[session.id] ||
                                        session.pending_reason || ""
                                      }
                                      onChange={(e) =>
                                        handleReasonChange(
                                          session.id,
                                          e.target.value
                                        )
                                      } 
                                      disabled={session.finished ? true : false}
                                    ></textarea>
                                    <label
                                      htmlFor={`ReasonTextarea-${session.id}`}
                                    >
                                      Reason
                                    </label>
                                  </div>
                                )}
                              </form>
                            ) : (<p>None</p>)}
                          </td>
                          <td>
                            <p>
                              {session.reported
                                ? session.reporttime
                                : "00:00:00"}{" "}
                              -{" "}
                              {session.finished
                                ? session.finishtime
                                : "00:00:00"}
                            </p>
                          </td>
                          <td>
                            {session.reported ? (
                              session.finished ? (
                                <div className="text-primary">
                                  <i className="bi bi-check2-circle me-2 fs-5"></i>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleFinish(session.id)}
                                >
                                  Finish
                                </button>
                              )
                            ) : (
                              <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                onClick={() => handleReport(session.id)}
                              >
                                Report
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="float-end">
                  <Button
                    type="button"
                    className="btn btn-sm btn-danger px-3"
                    onClick={handleDownload}
                  >
                    Print
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
};

export default Calendar;


// const handleSave = async() =>{
//   setLoading(true);
//   const dataToSave = timetable.map((session, index) => ({
//     id: session.id,
//     date: session.date,
//     status: status[index] || session.action,
//     reason: reasons[index] || session.pending_reason,
//   }));

//   try{
//     const response = await useAxios().post('user/teacher/session/post', { data: dataToSave });
//     if (response.status === 201) {
//       setShowAlert(true);
//       fetchTeacherSession();
//       setShowModal(false);
//     } else {
//       setError('Error:', response);
//     }
//   } catch (error) {
//     setError(error);
//   }finally{
//     setLoading(false)
//   }
// };
{
  /* <Button type="submit" className="btn btn-sm btn-success me-3 px-3" onClick={handleSave}>Save changes</Button>  */
}
