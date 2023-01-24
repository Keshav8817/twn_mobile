package org.cyfwms.caregiver.repository;
import org.cyfwms.caregiver.dto.CareGiverContactNotesSearchCriteriaDto;
import org.cyfwms.caregiver.dto.CareGiverContactNotesSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Repository
public class CareGiverContactNotesSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<CareGiverContactNotesSearchResultsDto> searchCareGiverContactNotes(CareGiverContactNotesSearchCriteriaDto cgContactNotesSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(cgContactNotesSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new CareGiverContactNotesSearchResultsDto(
                                rs.getLong("cgcontactnotesid"),
                                rs.getLong("cgproviderid"),
                                rs.getString("name"),
                                rs.getString("worker"),
                                rs.getDate("date")!=null?rs.getDate("date").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getTime("time")!=null?rs.getTime("time").toLocalTime(): LocalTime.of(1,1,1),
                                rs.getString("contactMethod"),
                                rs.getString("needAddress"),
                                rs.getString("summary"),
                                rs.getString("result"),
                                rs.getString("nextstep"),
                                rs.getString("casePlanProgress"),
                                rs.getString("additionalInformation")
                        )
        );
    }
    private StringBuffer createSearchQuery(CareGiverContactNotesSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=searchCriteria.getData();
        Long cgProviderId=searchCriteria.getCgProviderId();

        querySBuff.append("select c.cgcontactnotesid ,c.cgproviderid, c.name ,c.worker ,c.date , c.time,c.contactmethod ,c.needaddress ,c.summary ,c.result ,c.nextstep ,c.caseplanprogress ,c.additionalinformation ");
        querySBuff.append("from caregivercontactnotes c left join cg_care_provider c2 on c.cgproviderid = c2.id where  c.status='ACTIVE' ");

        if (cgProviderId != null) {
            querySBuff.append(" AND c.cgproviderid = ?");
            argsObjectList.add(cgProviderId);
        }

        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");

            querySBuff.append(" AND (c.cgproviderid=? OR c.name LIKE ?  OR c.worker LIKE ?  OR c.date LIKE ?  OR c.time LIKE ?  OR c.contactmethod LIKE ?  OR c.needaddress LIKE ?  OR c.summary LIKE ?  OR c.result LIKE ?  OR c.nextstep LIKE ?  OR c.caseplanprogress LIKE ? OR c.additionalinformation LIKE ?)  ORDER BY c.creationdatetime desc ");
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
        }
        else {
            querySBuff.append(" AND c.cgproviderid = ?  ORDER BY c.creationdatetime desc ");
            argsObjectList.add(cgProviderId);}

        return querySBuff;
    }
}
