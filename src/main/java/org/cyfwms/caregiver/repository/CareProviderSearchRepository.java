package org.cyfwms.caregiver.repository;

import org.cyfwms.caregiver.dto.CareProviderSearchCriteriaDto;
import org.cyfwms.caregiver.dto.CareProviderSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CareProviderSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<CareProviderSearchResultsDto> searchCareGiver(CareProviderSearchCriteriaDto careGiverSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(careGiverSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new CareProviderSearchResultsDto(
                                rs.getLong("id"),
                                rs.getLong("reference_id"),
                                rs.getString("name"),
                                rs.getString("type"),
                                rs.getString("primary_caregiver"),
                                rs.getString("secondary_caregiver"),
                                rs.getString("status")

                        )
        );
    }

    private StringBuffer createSearchQuery(CareProviderSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer querySBuff = new StringBuffer();
        querySBuff.append("select c.id ,c.reference_id ,c.name ,c.type ,primary_caregiver, secondary_caregiver ,c.status ");
        querySBuff.append("from cg_care_provider c ");

        String priCaregiver = searchCriteria.getPriCaregiver();
        String secCaregiver = searchCriteria.getSecCaregiver();
        if (priCaregiver==null && secCaregiver==null){
            querySBuff.append(" where c.deletion_status='ACTIVE'");
        }

        if (priCaregiver!=null && !priCaregiver.trim().isEmpty()){
            querySBuff.append(" left join participant p2 on c.primary_caregiver =p2.participantid ");
            priCaregiver = priCaregiver.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" where c.deletion_status='ACTIVE'");
            querySBuff.append(" AND CONCAT(firstname,' ', surname) LIKE ?");
            argsObjectList.add(priCaregiver + "%");
        }



        if (secCaregiver!=null && !secCaregiver.trim().isEmpty()){
            querySBuff.append(" left join participant p2 on c.secondary_caregiver = p2.participantid");
            querySBuff.append(" where c.deletion_status='ACTIVE'");
            secCaregiver = secCaregiver.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND CONCAT(firstname,' ', surname) LIKE ?");
            argsObjectList.add(secCaregiver + "%");
        }




        Long referenceId = searchCriteria.getReferenceId();
        if (referenceId != null) {
            querySBuff.append(" AND c.reference_id = ?");
            argsObjectList.add(referenceId);
        }
        String name = searchCriteria.getName();
        if (name != null && !name.trim().isEmpty()) {
            name = name.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.name LIKE ?");
            argsObjectList.add(name + "%");
        }

        String type = searchCriteria.getType();
        if (type != null && !type.trim().isEmpty()) {
            type = type.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.type LIKE ?");
            argsObjectList.add(type + "%");
        }

        String status = searchCriteria.getStatus();
        if (status != null && !status.trim().isEmpty()) {
            status = status.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.status=?");
            argsObjectList.add(status);
        }
        return querySBuff;
    }
}
