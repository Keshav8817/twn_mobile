package org.cyfwms.caregiver.entity;

import lombok.*;
import org.cyfwms.common.entity.Attachment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="cg_attachments")
public class CGAttachmentEntity {
    @Id
    @Column(name="cgimageid", nullable=false)
    @SequenceGenerator(name="cgImageIdGenerator", sequenceName="cgImageIdGenerator", allocationSize=100)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="cgImageIdGenerator")
    private Long cgImageId;

    @Column(name="name")
    private String name;

    @CreationTimestamp
    @Column(name="creationdatetime")
    private LocalDateTime creationDateTime;


    @Column(name="type")
    private String type;

    @Column(name = "id")
    private Long id;


    @Column(name ="status")
    private  String status;


    @Column(name="lastwritten")
    @UpdateTimestamp
    private LocalDateTime lastWritten;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "attachmentid", referencedColumnName = "attachmentid")
    @Getter
    @Setter
    private Attachment attachment;
}

