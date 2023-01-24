package org.cyfwms.participant.repository;

import org.cyfwms.participant.entity.ParticipantContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantContactRepository extends JpaRepository<ParticipantContact, Long> {

    ParticipantContact findByParticipantId(long participantId);
}
