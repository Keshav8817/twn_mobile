package org.cyfwms.caregiver.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "caregivercontactnotes")
public class ContactNotes implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(name = "cgcontactnotesid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "cgContactNotesIdGenerator",
            sequenceName = "cgContactNotesIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cgContactNotesIdGenerator"
    )
    private Long cgContactNotesId;

    @Getter @Setter @Column(name = "name")
    private String name;

    @Getter @Setter @Column(name = "worker")
    private String worker;

    @Getter @Setter @Column(name = "date")
    private LocalDate date;
    @Getter @Setter @Column(name = "time")
    private LocalTime time;
    @Getter @Setter @Column(name = "contactmethod")
    private String contactMethod;
    @Getter @Setter @Column(length = 1000,name = "needaddress")
    private String needAddress;
    @Getter @Setter @Column(length = 1000,name = "summary")
    private String summary;
    @Getter @Setter @Column(name = "result")
    private String result;
    @Getter @Setter @Column(length = 1000,name = "nextstep")
    private String nextStep;
    @Getter @Setter @Column(length = 1000,name = "caseplanprogress")
    private String casePlanProgress;
    @Getter @Setter @Column(length = 1000,name = "additionalinformation")
    private String additionalInformation;

    @Getter @Setter @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdatetime")
    private LocalDateTime creationDateTime;

    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;

    @Getter @Setter @Column(name = "cgproviderid")
    private Long cgProviderId;
}
