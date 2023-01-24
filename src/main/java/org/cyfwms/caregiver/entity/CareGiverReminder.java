package org.cyfwms.caregiver.entity;

import lombok.*;
import org.cyfwms.common.entity.Reminder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "caregiverreminder")
public class CareGiverReminder {

    @Id
    @Getter
    @Setter
    @Column(name = "cgreminderid", updatable = false, nullable = false)
    @SequenceGenerator(name = "cgreminderIdGenerator", sequenceName = "cgreminderIdGenerator", allocationSize = 100)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "cgreminderIdGenerator")
    private Long cgReminderId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "reminderid", referencedColumnName = "reminderid")
    private Reminder reminder;


    @CreationTimestamp
    @Getter
    @Setter
    @Column(name = "creationdatetime")
    private LocalDateTime creationDateTime;

    @UpdateTimestamp
    @Getter
    @Setter
    @Column(name = "lastwritten")
    private LocalDateTime lastWritten;

    @Getter
    @Setter
    @Column(name = "statusofdeletion")
    private String statusOfDeletion;

    @Getter
    @Setter
    @Column(name = "id")
    private Long id;

    @Getter
    @Setter
    @Column(name = "reference_id")
    private Long referenceId;


}
