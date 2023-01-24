package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CaregGiverSearchAppointmentResultDto {
    @Getter
    @Setter
    private Long appointmentId;

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String subject;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    private LocalDate date;
    @Getter
    @Setter
    private Long cgappointmentId;
    private LocalTime time;
    private String location;
    private String duration;
    private String client;
    private String caseworker;
    private String recurringAppointment;
    private String frequency;
    @Getter @Setter
    private LocalDate endDate;
    private String notes;
    private Long participantId;

    public CaregGiverSearchAppointmentResultDto(Long appointmentId, Long id, String subject, String status, LocalDate date, Long cgappointmentId, LocalTime time, String location, String duration, String client, String caseworker, String recurringAppointment, String frequency, LocalDate endDate, String notes,Long participantId) {
        this.appointmentId = appointmentId;
        this.id = id;
        this.subject = subject;
        this.status = status;
        this.date = date;
        this.cgappointmentId = cgappointmentId;
        this.time = time;
        this.location = location;
        this.duration = duration;
        this.client = client;
        this.caseworker = caseworker;
        this.recurringAppointment = recurringAppointment;
        this.frequency = frequency;
        this.endDate = endDate;
        this.participantId=participantId;
    }
}
