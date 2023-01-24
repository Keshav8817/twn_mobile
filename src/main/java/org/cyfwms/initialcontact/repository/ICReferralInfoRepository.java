package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.ICReferralInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICReferralInfoRepository extends JpaRepository<ICReferralInfo, Long> {
    ICReferralInfo findByFileDetailsId(Long fileDetailsId);
}
