package org.cyfwms.caregiver.repository;

import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.CareGiverSearchAppointmentDto;
import org.cyfwms.caregiver.dto.CaregGiverSearchAppointmentResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Slf4j
@Repository
public class CareGiverSearchAppointmentRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<CaregGiverSearchAppointmentResultDto> searchCGAppointment(CareGiverSearchAppointmentDto cgAppointmentSearchDto) {
        log.info("Inside SearchCGAppointment");
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(cgAppointmentSearchDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new CaregGiverSearchAppointmentResultDto(
                                rs.getLong("appointmentid"),
                                rs.getLong("id"),
                                rs.getString("subject"),
                                rs.getString("status"),
                                rs.getDate("date")!=null?rs.getDate("date").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getLong("cgappointmentId"),
                                rs.getTime("time")!=null?rs.getTime("time").toLocalTime(): LocalTime.of(1,1,1),

                                rs.getString("location"),
                                rs.getString("duration"),
                                rs.getString("fullName"),
                                rs.getString("caseworker"),
                                rs.getString("recurring_appointment"),
                                rs.getString("frequency"),
                                rs.getDate("end_date")!=null?rs.getDate("end_date").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getString("notes"),
                                rs.getLong("participantId")
                        )
        );
    }

    private StringBuffer createSearchQuery(CareGiverSearchAppointmentDto cgAppointmentSearchDto, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=cgAppointmentSearchDto.getData();
        Long id = cgAppointmentSearchDto.getId();

        querySBuff.append("select p.appointmentid ,p2.id,p2.cgappointmentid,p.subject ,p.status ,p.date,p.time,p.location,p.duration,CONCAT(firstname,' ', surname) AS fullName,p.caseworker,p.recurring_appointment,p.frequency,p.end_date,p.notes,p3.participantid ");
        querySBuff.append("from appointments p left join cg_appointment p2 on p.appointmentid = p2.appointmentid left join participant p3 on  p3.participantid=p.client where  p2.status='ACTIVE' ");

        if (id != null) {
            querySBuff.append(" AND p2.id = ?");
            argsObjectList.add(id);
        }

        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");

            querySBuff.append(" AND (p2.id=? OR p.subject LIKE ?  OR p.status LIKE ?  OR p.date LIKE ?  OR p.time LIKE ?  OR p.location LIKE ?  OR p.duration LIKE ?  OR p.client LIKE ?  OR p.caseworker LIKE ?  OR p.recurring_appointment LIKE ?  OR p.frequency LIKE ? OR p.end_date LIKE ? OR p.notes LIKE ? ) ");
            argsObjectList.add(data);
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");

        }
        else {
            querySBuff.append(" AND p2.id = ? ");
            argsObjectList.add(id);}
        log.info("Exit SearchCGAppointment");
        return querySBuff;

    }
}


