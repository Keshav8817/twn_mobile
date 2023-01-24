package org.cyfwms.participant.repository;

import org.cyfwms.participant.entity.ParticipantReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantReminderRepository extends JpaRepository<ParticipantReminder, Long> {

    @Query(value = "select * from participantreminder where participantReminderId=? AND statusofdeletion='active'", nativeQuery = true)
    ParticipantReminder findByParticipantReminderId(Long participantReminderId);

    Optional<ParticipantReminder> findTopByOrderByCreationDateTimeDesc();


}
