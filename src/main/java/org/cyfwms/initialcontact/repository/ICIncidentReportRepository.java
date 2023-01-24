package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.ICtIncidentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICIncidentReportRepository extends JpaRepository<ICtIncidentReport, Long> {
    ICtIncidentReport findByFileDetailsId(Long fileDetailsId);
}
