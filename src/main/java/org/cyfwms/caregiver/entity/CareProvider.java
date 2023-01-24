package org.cyfwms.caregiver.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import org.cyfwms.common.entity.Appointments;
import org.cyfwms.initialcontact.entity.ICAppointment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "cg_care_provider")
public class CareProvider {
    @Id
    @Column(updatable = false, nullable = false)
    @SequenceGenerator(
        name = "cGProviderIdGenerator",
        sequenceName = "cGProviderIdGenerator",
        allocationSize = 100)
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "cGProviderIdGenerator")
    private Long id;

    @Column(
        name = "reference_id",
        updatable = false,
        nullable = false,
        unique = true)
    private Long referenceId;

    private String name;

    private String status;

    private String type;

    @Column(name = "other_type")
    private String otherType;

    private String address;

    private String city;

    @Column(name = "postal_code")
    private String postalCode;

    private String province;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String email;

    @Column(name = "primary_caregiver")
    private String primaryCaregiver;

    @Column(name = "secondary_caregiver")
    private String secondaryCaregiver;

    @Column(
        name = "deletion_status",
        columnDefinition = "VARCHAR(255) DEFAULT 'ACTIVE'")
    private String deletionStatus = "ACTIVE";

    @Column(name = "modification_date")
    @UpdateTimestamp
    private LocalDateTime modificationDate;

    @Column(name = "creation_date")
    @CreationTimestamp
    private LocalDateTime creationDate;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "id")
    @Getter @Setter
    private Capacity Capacity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id")
    @Getter @Setter

    private ContactNotes ContactNotesList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "id")
    @Getter @Setter
    private List<CGAttachmentEntity> cgAttachmentEntities;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "id")
    @Getter @Setter
    private List<CaregiverAppointment> caregiverAppointmentList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "id")
    @Getter @Setter
    private List<CareGiverReminder> careGiverReminder;
}
