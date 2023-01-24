package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.PatientCareInfoInpatient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientCareInfoInpatientRepository extends JpaRepository<PatientCareInfoInpatient,Long> {
    PatientCareInfoInpatient findByPatientCareInfoId(Long patientCareInfoId);
}
