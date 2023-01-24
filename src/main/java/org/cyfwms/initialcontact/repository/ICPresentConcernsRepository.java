package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.ICPresentConcerns;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICPresentConcernsRepository extends JpaRepository<ICPresentConcerns, Long> {
    ICPresentConcerns findByFileDetailsId(Long fileDetailsId);
}
