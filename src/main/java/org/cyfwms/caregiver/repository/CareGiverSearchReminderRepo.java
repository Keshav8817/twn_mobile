package org.cyfwms.caregiver.repository;

import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.CareGiverSearchReminderDto;
import org.cyfwms.caregiver.dto.CareGiverSearchReminderResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Slf4j
@Repository
public class CareGiverSearchReminderRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<CareGiverSearchReminderResultDto> searchCGReminder(CareGiverSearchReminderDto cgSearchReminderDto) {
        log.info("Inside SearchCGReminder");
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(cgSearchReminderDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(), argsObjectList.toArray(),
                (rs, rowNum) ->
                        new CareGiverSearchReminderResultDto(
                                rs.getLong("reminderId"),
                                rs.getLong("id"),
                                rs.getString("assignedTo"),
                                rs.getString("regarding"),
                                rs.getString("subject"),
                                rs.getString("frequency"),
                                rs.getString("status"),
                                rs.getString("description"),

                                rs.getDate("reminderDate") != null ? rs.getDate("reminderDate").toLocalDate() : LocalDate.of(1, 1, 1),
                                rs.getDate("endDate") != null ? rs.getDate("endDate").toLocalDate() : LocalDate.of(1, 1, 1),
                                rs.getLong("cgReminderId"),
                                rs.getLong("participantId")

                        )
        );
    }

    private StringBuffer createSearchQuery(CareGiverSearchReminderDto cgSearchReminderDto, List<Object> argsObjectList) {
        StringBuffer querySBuff = new StringBuffer();
        String data = cgSearchReminderDto.getData();
        Long cgProviderId = cgSearchReminderDto.getCgProviderId();

        querySBuff.append("select p.reminderid ,p2.id,p.assignedto,CONCAT(firstname,' ', surname) AS regarding,p.subject ,p.frequency,p.status,p.description ,p.reminderdate,p.enddate,p2.cgreminderid,p3.participantid  ");
        querySBuff.append("from reminder p left join caregiverreminder p2 on p.reminderid = p2.reminderid left join participant p3 on p3.participantid=p.regarding where  p2.statusofdeletion='ACTIVE' ");

        if (cgProviderId != null) {
            querySBuff.append(" AND p2.id = ?");
            argsObjectList.add(cgProviderId);
        }


        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");

            querySBuff.append(" AND (p2.id=? OR p.assignedto LIKE ? OR p.regarding LIKE ? OR p.subject LIKE ? OR p.frequency LIKE ?  OR p.status LIKE ? OR p.description LIKE ? OR p.reminderdate LIKE ? OR p.enddate LIKE ? ) ORDER BY p2.creationdatetime desc ");
            argsObjectList.add(data);
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");


        } else {
            querySBuff.append(" AND p2.id = ? ORDER BY p2.creationdatetime desc ");
            argsObjectList.add(cgProviderId);
        }
        log.info("Exit SearchCGReminder");
        return querySBuff;
    }
}
