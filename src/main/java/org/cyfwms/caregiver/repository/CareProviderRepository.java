package org.cyfwms.caregiver.repository;

import java.util.Optional;

import org.cyfwms.caregiver.entity.CareProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CareProviderRepository extends JpaRepository<CareProvider, Long> {
    @Query(
        value = "SELECT * FROM cg_care_provider WHERE id=? AND deletion_status='ACTIVE'",
        nativeQuery = true)
    Optional<CareProvider> findByIdWhereActive(long id);

    @Query(
        value = "SELECT * FROM cg_care_provider WHERE reference_id=? AND deletion_status='ACTIVE'",
        nativeQuery = true)
    Optional<CareProvider> findByReferenceIdWhereActive(Long referenceId);

    Optional<CareProvider> findTopByOrderByReferenceIdDesc();
}
