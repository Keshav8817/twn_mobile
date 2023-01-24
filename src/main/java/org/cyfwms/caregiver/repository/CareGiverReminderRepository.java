package org.cyfwms.caregiver.repository;

import org.cyfwms.caregiver.entity.CareGiverReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CareGiverReminderRepository extends JpaRepository<CareGiverReminder, Long> {

    @Query(value = "select * from caregiverreminder where cgreminderid=? AND statusofdeletion='active'", nativeQuery = true)
    CareGiverReminder findByCGReminderId(Long cgReminderId);

    Optional<CareGiverReminder> findTopByOrderByCreationDateTimeDesc();

    @Query(value = "select * from caregiverreminder where  id=? AND statusofdeletion='active'",nativeQuery = true)
    List<CareGiverReminder> findByCGId(long participantId);
}
