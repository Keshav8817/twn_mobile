package org.cyfwms.caregiver.entity;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "caregiversbackgroundcheck")
public class CareGiversBackGroundCheck {
    @Id
    @Getter
    @Setter
    @Column(name = "cgbackgroundcheckid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "cgBackGroundCheckIdGenerator",
            sequenceName = "cgBackGroundCheckIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cgBackGroundCheckIdGenerator"
    )
    private Long cgBackGroundCheckId;

    @Getter @Setter @Column(name = "status")
    private String status;

    @Getter @Setter @Column(name = "primarybgcheckstatus")
    private String priBGCheckStatus;

    @Getter @Setter @Column(name = "primarydate")
    private LocalDate priDate;
    @Getter @Setter @Column(length = 1000,name = "primarydetails")
    private String priDetails;
    @Getter @Setter @Column(length = 1000,name = "primarytrainingcompleted")
    private String priTrainingCompleted;
    @Getter @Setter @Column(name = "secondarybgcheckstatus")
    private String secBGCheckStatus;
    @Getter @Setter @Column(name = "secondarydate")
    private LocalDate secDate;
    @Getter @Setter @Column(length = 1000,name = "secondarydetails")
    private String secDetails;
    @Getter @Setter @Column(length = 1000,name = "secondarytrainingcompleted")
    private String secTrainingCompleted;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;

    @UpdateTimestamp
    @Getter @Setter
    @Column(name = "lastwritten")
    private LocalDateTime lastwritten;

    @Getter @Setter @Column(name = "cgproviderid")
    private Long cgProviderId;

}
