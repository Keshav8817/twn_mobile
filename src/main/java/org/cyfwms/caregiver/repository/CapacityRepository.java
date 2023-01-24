package org.cyfwms.caregiver.repository;
import org.cyfwms.caregiver.entity.Capacity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CapacityRepository extends JpaRepository<Capacity,Long> {
    @Query(value = "select * from caregivercapacity where cgProviderId=? AND status='ACTIVE'",nativeQuery = true)
    Capacity findByCgProviderId(Long cgProviderId);
}
