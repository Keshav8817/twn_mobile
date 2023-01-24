package org.cyfwms.caregiver.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.cyfwms.common.entity.Appointments;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
@Entity
@Table(name="cg_appointment")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class CaregiverAppointment implements Serializable {
    @Id
    @Column(name="cgappointmentid", nullable = false )
    @Getter
    @Setter
    @SequenceGenerator(
            name = "cgappointmentIdGenerator",
            sequenceName = "cgappointmentIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cgappointmentIdGenerator"
    )
    private Long cgappointmentId;

    @Getter @Setter @Column(name = "id")
    private Long id;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "appointmentid", referencedColumnName = "appointmentid")
    @Getter @Setter
    private Appointments appointments;


    @Getter @Setter @Column(name = "status")
    private String status;

    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;

    @CreationTimestamp
    @Getter @Setter @Column(name= "creationdate",updatable = false)
    private LocalDateTime creationDate;

}
