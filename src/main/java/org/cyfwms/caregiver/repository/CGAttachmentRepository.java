package org.cyfwms.caregiver.repository;
import org.cyfwms.caregiver.entity.CGAttachmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CGAttachmentRepository extends JpaRepository<CGAttachmentEntity, Long> {
    @Query(value = "select * from cg_attachments c1 left join cg_care_provider c on c1.id = c.id where c1.status ='ACTIVE' AND c.id=? ", nativeQuery = true)
    List<CGAttachmentEntity> findByCaregiverProviderId(Long careGiverProviderId);
}
