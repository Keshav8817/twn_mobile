package org.cyfwms.participant.repository;

import org.cyfwms.participant.entity.CriminalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriminalHistoryRepository extends JpaRepository<CriminalHistory, Long> {
    CriminalHistory findByParticipantId(Long participantId);
}
