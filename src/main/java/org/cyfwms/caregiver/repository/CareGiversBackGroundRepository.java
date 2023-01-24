package org.cyfwms.caregiver.repository;

import org.cyfwms.caregiver.entity.CareGiversBackGroundCheck;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CareGiversBackGroundRepository extends JpaRepository<CareGiversBackGroundCheck,Long> {
    CareGiversBackGroundCheck findByCgProviderId(Long cgProviderId);
}
