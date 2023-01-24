package org.cyfwms.participant.repository;

import org.cyfwms.participant.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    Education findByParticipantId(Long participantId);
}
