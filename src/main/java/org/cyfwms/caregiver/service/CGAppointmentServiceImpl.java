package org.cyfwms.caregiver.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.CaregiverAppointmentDto;
import org.cyfwms.caregiver.entity.CaregiverAppointment;
import org.cyfwms.caregiver.repository.CareGiversAppointmentRepository;
import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.entity.Appointments;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.repository.AppointmentRepository;
import org.cyfwms.initialcontact.dto.ICAppointmentDto;
import org.cyfwms.initialcontact.entity.ICAppointment;
import org.cyfwms.participant.dto.ParticipantAppointmentDto;
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.entity.ParticipantAppointment;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CGAppointmentServiceImpl implements CGAppointmentService {
    @Autowired
    CareGiversAppointmentRepository careGiversAppointmentRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private MessageUtil messageUtil;
    @Autowired
    private ParticipantRepository participantRepository;


    @Override
    public List<CaregiverAppointmentDto> saveCgAppointment(CaregiverAppointmentDto caregiverAppointmentDto) {
        log.info("Inside SaveCareGiverAppointment");
        Appointments appointments = null;
        List<CaregiverAppointmentDto> caregiverAppointmentDtoList = new ArrayList<>();
        CaregiverAppointment caregiverAppointment = new CaregiverAppointment();
        AppointmentDto appointmentDto = new AppointmentDto();
        CaregiverAppointmentDto caregiverAppointmentDto1 = new CaregiverAppointmentDto();
        if (caregiverAppointmentDto.getCgappointmentId() == 0) {
            if(caregiverAppointmentDto.getAppointmentDto().getRecurringAppointment().equalsIgnoreCase("Yes")){
                caregiverAppointmentDtoList = checkFrequency(caregiverAppointmentDto);
                return caregiverAppointmentDtoList;
            }
            appointments = new Appointments();
            BeanUtils.copyProperties(caregiverAppointmentDto.getAppointmentDto(), appointments);
            BeanUtils.copyProperties(caregiverAppointmentDto, caregiverAppointment);
            caregiverAppointment.setStatus("Active");
            appointments.setAppointmentStatus("Active");
        } else {
            caregiverAppointment = careGiversAppointmentRepository.findById(caregiverAppointmentDto.getCgappointmentId()).get();
            appointments = appointmentRepository.findById(caregiverAppointmentDto.getAppointmentDto().getAppointmentId()).get();
            BeanUtils.copyProperties(caregiverAppointmentDto.getAppointmentDto(), appointments);
            BeanUtils.copyProperties(caregiverAppointmentDto, caregiverAppointment);
        }
        caregiverAppointment.setAppointments(appointments);
        caregiverAppointment = careGiversAppointmentRepository.save(caregiverAppointment);
        //copy save data into list
        BeanUtils.copyProperties(caregiverAppointment,caregiverAppointmentDto1);
        BeanUtils.copyProperties(appointments,appointmentDto);
        caregiverAppointmentDto1.setAppointmentDto(appointmentDto);
        caregiverAppointmentDtoList.add(caregiverAppointmentDto1);
        log.info("Exit SaveCareGiverAppointment");
        return caregiverAppointmentDtoList;
    }
    public List<CaregiverAppointmentDto> checkFrequency(CaregiverAppointmentDto caregiverAppointmentDto){
        Period pd = Period.between(caregiverAppointmentDto.getAppointmentDto().getDate(), caregiverAppointmentDto.getAppointmentDto().getEndDate());
        int difference = pd.getDays();
        int monthDiff=  pd.getMonths();
        int n = 0,counter=0,remainder=0;
        if(caregiverAppointmentDto.getAppointmentDto().getFrequency().equalsIgnoreCase("Daily")){
            n = difference+1;
            remainder = n+1;
            counter=1;
        } else if (caregiverAppointmentDto.getAppointmentDto().getFrequency().equalsIgnoreCase("Weekly")) {
            n = (difference+1)/7;
            remainder = n%7;
                n=n+1;
            counter=7;
        } else if (caregiverAppointmentDto.getAppointmentDto().getFrequency().equalsIgnoreCase("Monthly")) {
            n=monthDiff+1;
            counter=30;
        }
        else {
            n = difference/14;
            remainder = n%14;
            n=n+1;
            counter=14;
        }
        List<CaregiverAppointmentDto>listicgappointment = new ArrayList<>();
        listicgappointment = saveFrequency(n,counter,remainder,caregiverAppointmentDto);
        return listicgappointment;
    }
    public List<CaregiverAppointmentDto> saveFrequency(int n,int counter,int remainder, CaregiverAppointmentDto caregiverAppointmentDto) {

        List<CaregiverAppointmentDto>listCGAppointment = new ArrayList<>();
        int cnt=0;
        for(int i=0;i<n;i++){
            //save data into table
            CaregiverAppointment cgAppointment = new CaregiverAppointment();
            Appointments appointments = new Appointments();
            BeanUtils.copyProperties(caregiverAppointmentDto,cgAppointment);
            BeanUtils.copyProperties(caregiverAppointmentDto.getAppointmentDto(),appointments);
            cgAppointment.setStatus("ACTIVE");
            appointments.setAppointmentStatus("ACTIVE");
            LocalDate l = caregiverAppointmentDto.getAppointmentDto().getDate().plusDays(cnt);
            appointments.setDate(l);
            cgAppointment.setAppointments(appointments);
            cgAppointment = careGiversAppointmentRepository.save(cgAppointment);
            //copy save data into list caregiverAppointment
            AppointmentDto appointmentDto = new AppointmentDto();

            CaregiverAppointmentDto cgAppintmentDto = new CaregiverAppointmentDto();
            BeanUtils.copyProperties(cgAppointment,cgAppintmentDto);
            BeanUtils.copyProperties(appointments,appointmentDto);
            cgAppintmentDto.setAppointmentDto(appointmentDto);
            listCGAppointment.add(cgAppintmentDto);
            if(i==n-1 && remainder>0){
                cnt =cnt+1;

            }
            cnt=cnt+counter;
        }

        return listCGAppointment;
    }
  

    @Override
    public CaregiverAppointmentDto readOneAppointment(Long cgAppointmentId) {
        log.info("Inside ReadOneCareGiverAppointment");
        CaregiverAppointmentDto caregiverAppointmentDto = new CaregiverAppointmentDto();
        AppointmentDto appointmentDto = new AppointmentDto();
        if (cgAppointmentId != 0) {
            Optional<CaregiverAppointment> caregiverAppointment = careGiversAppointmentRepository.findById(cgAppointmentId);

            if (caregiverAppointment.isPresent()) {
                if (caregiverAppointment.get().getStatus().equalsIgnoreCase("Active")){

                    BeanUtils.copyProperties(caregiverAppointment.get(), caregiverAppointmentDto);
                    BeanUtils.copyProperties(caregiverAppointment.get().getAppointments(),appointmentDto);
                    if(appointmentDto.getClient()!=null){
                        Long p= Long.parseLong(appointmentDto.getClient());
                        if (p!=0) {
                            Participant participant=participantRepository.findByParticipantId(p);
                            appointmentDto.setClient(participant.getFirstname()+" "+participant.getSurname());
                            appointmentDto.setParticipantId(participant.getParticipantId());
                        }
                    }
                 
                    caregiverAppointmentDto.setAppointmentDto(appointmentDto);
                  
                }
            }
        }
        log.info("Exit ReadOneCareGiverAppointment");
        return caregiverAppointmentDto;
    }


    @Override
    public void removeICAppointment(Long cgAppointmentId) {
        log.info("Inside RemoveCareGiverAppointment");
        CaregiverAppointment caregiverAppointment = careGiversAppointmentRepository.findById(cgAppointmentId).orElseThrow(()->new NoSuchElementFoundException(
                messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                        String.valueOf(cgAppointmentId))));
        if (caregiverAppointment.getStatus().equalsIgnoreCase("INACTIVE")) {
            throw new NoSuchElementFoundException(
                    messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                            String.valueOf(caregiverAppointment)));
        }
            caregiverAppointment.setStatus("INACTIVE");
            caregiverAppointment.getAppointments().setAppointmentStatus("INACTIVE");
            careGiversAppointmentRepository.save(caregiverAppointment);
        log.info("Exit RemoveCareGiverAppointment");
    }

    }

