package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.ICPatientCareInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICPatientCareInfoRepository extends JpaRepository<ICPatientCareInfo,Long> {
    ICPatientCareInfo findByFileDetailsId(Long fileDetailsId);
}
