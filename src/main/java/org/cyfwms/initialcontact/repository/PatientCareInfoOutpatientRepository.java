package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.PatientCareInfoOutpatient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientCareInfoOutpatientRepository extends JpaRepository<PatientCareInfoOutpatient,Long> {
    PatientCareInfoOutpatient findByPatientCareInfoId(Long patientCareInfoId);
}
